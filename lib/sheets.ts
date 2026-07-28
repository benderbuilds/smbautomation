import { createSign } from 'crypto';

export type SheetTab = 'Applications' | 'Purchases' | 'SampleAudit' | 'Contact';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

function b64url(input: string | Buffer): string {
  return Buffer.from(input as Buffer).toString('base64url');
}

export function buildJwt(serviceAccountEmail: string, privateKey: string, nowSeconds: number): string {
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = b64url(
    JSON.stringify({
      iss: serviceAccountEmail,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: nowSeconds,
      exp: nowSeconds + 3600,
    })
  );
  const key = privateKey.replace(/\\n/g, '\n');
  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${payload}`);
  const signature = signer.sign(key).toString('base64url');
  return `${header}.${payload}.${signature}`;
}

async function getAccessToken(email: string, key: string): Promise<string> {
  const jwt = buildJwt(email, key, Math.floor(Date.now() / 1000));
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  if (!res.ok) throw new Error(`Sheets token exchange failed: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

/**
 * Appends one row to the CRM spreadsheet. Never throws: CRM failure must not
 * fail a form submission. No-ops with a warning when env vars are missing.
 */
export async function appendRow(tab: SheetTab, values: (string | number)[]): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY;

  if (!sheetId || !email || !key) {
    console.warn(`[sheets] env missing, skipping append to ${tab}`);
    return;
  }

  try {
    const token = await getAccessToken(email, key);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
      `${tab}!A1`
    )}:append?valueInputOption=RAW`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [values] }),
    });
    if (!res.ok) {
      console.error(`[sheets] append to ${tab} failed: ${res.status} ${await res.text()}`);
    }
  } catch (err) {
    console.error(`[sheets] append to ${tab} errored:`, err);
  }
}
