import { describe, expect, test, vi } from 'vitest';
import { handleContact, type ContactDeps } from './contact';
import {
  SMS_DISCLOSURE_VERSION,
  SMS_MARKETING_DISCLOSURE,
  SMS_PHONE_ERROR,
  SMS_SERVICE_DISCLOSURE,
  SMS_SHEET_COLUMNS,
  parseSmsConsent,
  rowAllowsSms,
  toE164,
} from './smsConsent';
import type { SaveResult } from './sheets';

const NOW = new Date('2026-11-20T18:30:00.000Z');
const FORM_URL = 'https://smbautomation.io/#contact';
const EXISTING_COLUMNS = 11; // timestamp ... landing_page

function deps(saveResult: SaveResult = 'saved') {
  const appendRow = vi.fn<ContactDeps['appendRow']>(async () => saveResult);
  const sendContactEmails = vi.fn<ContactDeps['sendContactEmails']>(async () => {});
  return { appendRow, sendContactEmails };
}

const base = {
  name: 'Test Lead',
  business: 'Test Co',
  email: 'lead@example.com',
  message: 'Testing the contact form.',
  interests: ['Not sure yet'],
  sourceUrl: FORM_URL,
};

const ctx = {
  attribution: {
    utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'test', utm_term: '', utm_content: '',
    landing_page: '/', first_touch_at: '2026-11-01T00:00:00.000Z',
  },
  referer: null,
  now: NOW,
};

function smsCells(row: (string | number)[]) {
  const cells = row.slice(EXISTING_COLUMNS);
  return Object.fromEntries(SMS_SHEET_COLUMNS.map((c, i) => [c, cells[i]]));
}

describe('handleContact: the four consent combinations', () => {
  const cases = [
    { label: 'neither', smsService: false, smsMarketing: false, service: 'no', marketing: 'no' },
    { label: 'service only', smsService: true, smsMarketing: false, service: 'yes', marketing: 'no' },
    { label: 'promotions only', smsService: false, smsMarketing: true, service: 'no', marketing: 'yes' },
    { label: 'both', smsService: true, smsMarketing: true, service: 'yes', marketing: 'yes' },
  ];

  for (const c of cases) {
    test(c.label, async () => {
      const d = deps();
      const res = await handleContact(
        { ...base, phone: '(319) 555-0142', smsService: c.smsService, smsMarketing: c.smsMarketing },
        ctx,
        d
      );
      expect(res).toEqual({
        status: 200,
        body: { ok: true, smsConsentSaved: c.smsService || c.smsMarketing },
      });

      // Sheet row: existing columns untouched, consent appended separately.
      const row = d.appendRow.mock.calls[0][1];
      expect(row.slice(0, EXISTING_COLUMNS)).toEqual([
        NOW.toISOString(), 'Test Lead', 'Test Co', 'lead@example.com', '(319) 555-0142',
        'Not sure yet', 'Testing the contact form.', 'google', 'cpc', 'test', '/',
      ]);
      const sms = smsCells(row);
      expect(sms.sms_service_consent).toBe(c.service);
      expect(sms.sms_marketing_consent).toBe(c.marketing);
      expect(sms.sms_phone_e164).toBe(c.service === 'yes' || c.marketing === 'yes' ? '+13195550142' : '');
      expect(sms.sms_consent_timestamp).toBe(NOW.toISOString());
      expect(sms.sms_source_url).toBe(FORM_URL);
      expect(sms.sms_disclosure_version).toBe(SMS_DISCLOSURE_VERSION);
      expect(sms.sms_service_disclosure).toBe(SMS_SERVICE_DISCLOSURE);
      expect(sms.sms_marketing_disclosure).toBe(SMS_MARKETING_DISCLOSURE);

      // Email notification carries the same record.
      const email = d.sendContactEmails.mock.calls[0][0];
      expect(email.sms.serviceConsent).toBe(c.smsService);
      expect(email.sms.marketingConsent).toBe(c.smsMarketing);
    });
  }

  test('service-only never enrolls in promotions', async () => {
    const d = deps();
    await handleContact({ ...base, phone: '3195550142', smsService: true }, ctx, d);
    expect(smsCells(d.appendRow.mock.calls[0][1]).sms_marketing_consent).toBe('no');
    expect(d.sendContactEmails.mock.calls[0][0].sms.marketingConsent).toBe(false);
  });
});

describe('handleContact: SMS consent is only confirmed once saved', () => {
  for (const result of ['failed', 'skipped'] as const) {
    test(`Sheets write ${result}: inquiry still succeeds, consent is not confirmed`, async () => {
      const d = deps(result);
      const res = await handleContact(
        { ...base, phone: '(319) 555-0142', smsService: true, smsMarketing: true },
        ctx,
        d
      );
      // The ordinary inquiry is preserved...
      expect(res).toEqual({ status: 200, body: { ok: true, smsConsentSaved: false } });
      expect(d.appendRow).toHaveBeenCalledTimes(1);
      expect(d.sendContactEmails).toHaveBeenCalledTimes(1);
      // ...but the emails are told consent was not saved.
      expect(d.sendContactEmails.mock.calls[0][0].smsSaved).toBe(false);
    });
  }

  test('no SMS boxes checked: a failed write never reports consent saved', async () => {
    const d = deps('failed');
    const res = await handleContact({ ...base, phone: '' }, ctx, d);
    expect(res).toEqual({ status: 200, body: { ok: true, smsConsentSaved: false } });
  });

  test('successful save confirms consent', async () => {
    const d = deps('saved');
    const res = await handleContact({ ...base, phone: '3195550142', smsMarketing: true }, ctx, d);
    expect(res.body).toEqual({ ok: true, smsConsentSaved: true });
    expect(d.sendContactEmails.mock.calls[0][0].smsSaved).toBe(true);
  });
});

describe('handleContact: phone rules', () => {
  test('no phone and no consent submits successfully', async () => {
    const d = deps();
    const res = await handleContact({ ...base, phone: '' }, ctx, d);
    expect(res.status).toBe(200);
    const sms = smsCells(d.appendRow.mock.calls[0][1]);
    expect(sms.sms_service_consent).toBe('no');
    expect(sms.sms_marketing_consent).toBe('no');
    expect(sms.sms_phone_e164).toBe('');
  });

  test('a phone number alone grants no SMS permission', async () => {
    const d = deps();
    await handleContact({ ...base, phone: '319-555-0142' }, ctx, d);
    const sms = smsCells(d.appendRow.mock.calls[0][1]);
    expect(sms.sms_service_consent).toBe('no');
    expect(sms.sms_marketing_consent).toBe('no');
    expect(sms.sms_phone_e164).toBe('');
  });

  for (const [label, body] of [
    ['service without phone', { smsService: true, phone: '' }],
    ['promotions without phone', { smsMarketing: true, phone: '' }],
    ['both with invalid phone', { smsService: true, smsMarketing: true, phone: '555-01' }],
  ] as const) {
    test(`${label} is rejected and nothing is saved`, async () => {
      const d = deps();
      const res = await handleContact({ ...base, ...body }, ctx, d);
      expect(res).toEqual({ status: 400, body: { error: SMS_PHONE_ERROR, field: 'phone' } });
      expect(d.appendRow).not.toHaveBeenCalled();
      expect(d.sendContactEmails).not.toHaveBeenCalled();
    });
  }

  test('existing required-field validation still runs first', async () => {
    const d = deps();
    const res = await handleContact({ ...base, email: 'nope' }, ctx, d);
    expect(res.status).toBe(400);
    expect(d.appendRow).not.toHaveBeenCalled();
  });

  test('falls back to the Referer header for the source URL', async () => {
    const d = deps();
    await handleContact(
      { ...base, sourceUrl: undefined, phone: '' },
      { ...ctx, referer: 'https://smbautomation.io/' },
      d
    );
    expect(smsCells(d.appendRow.mock.calls[0][1]).sms_source_url).toBe('https://smbautomation.io/');
  });
});

describe('smsConsent helpers', () => {
  test('only a literal true counts as consent', () => {
    expect(parseSmsConsent({ smsService: 'true', smsMarketing: 1 })).toEqual({ service: false, marketing: false });
    expect(parseSmsConsent({})).toEqual({ service: false, marketing: false });
    expect(parseSmsConsent(null)).toEqual({ service: false, marketing: false });
  });

  test('older rows with no consent data grant no permission', () => {
    expect(rowAllowsSms(undefined)).toBe(false);
    expect(rowAllowsSms('')).toBe(false);
    expect(rowAllowsSms('no')).toBe(false);
    expect(rowAllowsSms('yes')).toBe(true);
  });

  test('toE164 accepts US numbers only', () => {
    expect(toE164('(319) 255-2700')).toBe('+13192552700');
    expect(toE164('+1 319 255 2700')).toBe('+13192552700');
    expect(toE164('255-2700')).toBeNull();
    expect(toE164('(119) 255-2700')).toBeNull();
    expect(toE164('')).toBeNull();
  });

  test('disclosures name the registered business and include required terms', () => {
    for (const text of [SMS_SERVICE_DISCLOSURE, SMS_MARKETING_DISCLOSURE]) {
      expect(text).toContain('SMBAUTOMATION LLC');
      expect(text).toContain('Message frequency varies.');
      expect(text).toContain('Message and data rates may apply.');
      expect(text).toContain('Reply STOP to opt out or HELP for help.');
    }
  });
});
