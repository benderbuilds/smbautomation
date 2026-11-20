import { generateKeyPairSync, createVerify } from 'crypto';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { appendRow, buildJwt } from './sheets';

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

function decodeSegment(seg: string) {
  return JSON.parse(Buffer.from(seg, 'base64url').toString('utf8'));
}

describe('buildJwt', () => {
  const NOW = 1753704000; // seconds

  test('produces RS256 header and Sheets-scoped claims', () => {
    const jwt = buildJwt('svc@project.iam.gserviceaccount.com', privateKey, NOW);
    const [header, payload] = jwt.split('.').slice(0, 2).map(decodeSegment);

    expect(header).toEqual({ alg: 'RS256', typ: 'JWT' });
    expect(payload).toEqual({
      iss: 'svc@project.iam.gserviceaccount.com',
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      iat: NOW,
      exp: NOW + 3600,
    });
  });

  test('signature verifies against the public key', () => {
    const jwt = buildJwt('svc@project.iam.gserviceaccount.com', privateKey, NOW);
    const [h, p, sig] = jwt.split('.');

    const verifier = createVerify('RSA-SHA256');
    verifier.update(`${h}.${p}`);
    expect(verifier.verify(publicKey, Buffer.from(sig, 'base64url'))).toBe(true);
  });

  test('handles escaped newlines in the private key (env var format)', () => {
    const escaped = privateKey.replace(/\n/g, '\\n');
    const jwt = buildJwt('svc@project.iam.gserviceaccount.com', escaped, NOW);
    const [h, p, sig] = jwt.split('.');

    const verifier = createVerify('RSA-SHA256');
    verifier.update(`${h}.${p}`);
    expect(verifier.verify(publicKey, Buffer.from(sig, 'base64url'))).toBe(true);
  });
});

describe('appendRow save result', () => {
  const env = {
    GOOGLE_SHEETS_ID: 'sheet',
    GOOGLE_SERVICE_ACCOUNT_EMAIL: 'svc@project.iam.gserviceaccount.com',
    GOOGLE_PRIVATE_KEY: privateKey,
  };
  const tokenOk = () => new Response(JSON.stringify({ access_token: 't' }), { status: 200 });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  test('skipped when env is missing', async () => {
    vi.stubEnv('GOOGLE_SHEETS_ID', '');
    expect(await appendRow('Contact', ['x'])).toBe('skipped');
  });

  test('failed when the Sheets API rejects the write', async () => {
    for (const [k, v] of Object.entries(env)) vi.stubEnv(k, v);
    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce(tokenOk())
      .mockResolvedValueOnce(new Response('quota', { status: 429 })));
    expect(await appendRow('Contact', ['x'])).toBe('failed');
  });

  test('failed when the request throws', async () => {
    for (const [k, v] of Object.entries(env)) vi.stubEnv(k, v);
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
    expect(await appendRow('Contact', ['x'])).toBe('failed');
  });

  test('saved when the write succeeds', async () => {
    for (const [k, v] of Object.entries(env)) vi.stubEnv(k, v);
    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce(tokenOk())
      .mockResolvedValueOnce(new Response('{}', { status: 200 })));
    expect(await appendRow('Contact', ['x'])).toBe('saved');
  });
});
