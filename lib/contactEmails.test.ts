import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { sendContactEmails } from './emails';
import { buildSmsConsentRecord } from './smsConsent';

// Capture what Resend would be asked to send. fetch is stubbed, so no request leaves the test.
const sent: { to: string | string[]; text: string }[] = [];
function stubResend() {
  vi.stubGlobal('fetch', vi.fn(async (url: string, init: RequestInit) => {
    if (!String(url).startsWith('https://api.resend.com/')) throw new Error(`unexpected fetch ${url}`);
    sent.push(JSON.parse(String(init.body)));
    return new Response(JSON.stringify({ id: 'test' }), { status: 200, headers: { 'content-type': 'application/json' } });
  }));
}
const to = (addr: string) => sent.find((m) => (Array.isArray(m.to) ? m.to : [m.to]).includes(addr))!;

const sms = (() => {
  const r = buildSmsConsentRecord({
    consent: { service: true, marketing: false },
    phone: '3195550142',
    sourceUrl: 'https://smbautomation.io/',
    now: new Date('2026-11-20T00:00:00Z'),
  });
  if (!r.ok) throw new Error('fixture');
  return r.record;
})();

const sub = {
  name: 'Test Lead', business: '', email: 'lead@example.com', phone: '3195550142',
  interests: [], message: 'hi', sms,
};

describe('sendContactEmails SMS confirmation', () => {
  beforeEach(() => {
    sent.length = 0;
    vi.stubEnv('RESEND_API_KEY', 're_test');
    vi.stubEnv('CONTACT_EMAIL', 'internal@example.com');
    stubResend();
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  test('saved consent is confirmed to the visitor', async () => {
    await sendContactEmails({ ...sub, smsSaved: true });
    const ack = to('lead@example.com');
    expect(ack.text).toContain('You also opted in to texts about your demo appointments');
  });

  test('unsaved consent is never confirmed to the visitor, and the internal email warns', async () => {
    await sendContactEmails({ ...sub, smsSaved: false });
    const ack = to('lead@example.com');
    const internal = to('internal@example.com');
    expect(ack.text).not.toContain('opted in');
    expect(internal.text).toContain('NOT saved');
    expect(internal.text).toContain('Do not text this number');
  });
});
