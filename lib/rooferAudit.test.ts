import { describe, expect, test } from 'vitest';
import { validateRooferAudit, normalizePhone } from './rooferAudit';

const valid = {
  name: 'Dale Hughes',
  company: 'Hughes Roofing',
  phone: '(319) 555-0142',
  email: 'dale@hughesroofing.com',
  monthlyLeads: '20-50',
};

describe('validateRooferAudit', () => {
  test('accepts a complete submission and trims values', () => {
    const result = validateRooferAudit({ ...valid, name: '  Dale Hughes ' });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.name).toBe('Dale Hughes');
  });

  test('requires name, company, phone, and email', () => {
    expect(validateRooferAudit({ ...valid, name: '' }).ok).toBe(false);
    expect(validateRooferAudit({ ...valid, company: '' }).ok).toBe(false);
    expect(validateRooferAudit({ ...valid, phone: '' }).ok).toBe(false);
    expect(validateRooferAudit({ ...valid, email: 'nope' }).ok).toBe(false);
  });

  test('rejects phone numbers without 10 digits', () => {
    expect(validateRooferAudit({ ...valid, phone: '555-0142' }).ok).toBe(false);
  });

  test('only accepts the listed lead ranges', () => {
    expect(validateRooferAudit({ ...valid, monthlyLeads: '150+' }).ok).toBe(true);
    expect(validateRooferAudit({ ...valid, monthlyLeads: '9000' }).ok).toBe(false);
  });

  test('flags a filled honeypot as spam', () => {
    const result = validateRooferAudit({ ...valid, website: 'http://spam.example' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.spam).toBe(true);
  });
});

describe('normalizePhone', () => {
  test('adds the US country code to 10-digit numbers', () => {
    expect(normalizePhone('(319) 555-0142')).toBe('13195550142');
  });

  test('keeps an existing leading 1', () => {
    expect(normalizePhone('+1 319 555 0142')).toBe('13195550142');
  });
});
