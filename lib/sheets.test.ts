import { generateKeyPairSync, createVerify } from 'crypto';
import { describe, expect, test } from 'vitest';
import { buildJwt } from './sheets';

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
