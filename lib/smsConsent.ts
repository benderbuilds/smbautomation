/**
 * SMS consent for the homepage contact form (A2P 10DLC, Low Volume Mixed).
 *
 * Two independent programs. Each one is granted only by its own checkbox:
 * - service: demo appointments, onboarding reminders, support questions
 * - marketing: promotional texts about the AI front desk, free trial, offers
 *
 * A phone number on its own grants nothing, and a record with no consent data
 * (every submission before this version) grants nothing.
 *
 * When the copy changes, bump SMS_DISCLOSURE_VERSION so every stored record
 * points at the exact wording the visitor saw.
 */

export const SMS_BUSINESS_NAME = 'SMBAUTOMATION LLC';
export const SMS_DISCLOSURE_VERSION = 'sms-2026-11-20';

export const SMS_SERVICE_DISCLOSURE =
  `I agree to receive text messages from ${SMS_BUSINESS_NAME} about my demo appointments, onboarding reminders, and support questions. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help.`;

export const SMS_MARKETING_DISCLOSURE =
  `I agree to receive promotional text messages from ${SMS_BUSINESS_NAME} about its AI front desk services, free trial, and special offers. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help.`;

export const SMS_PHONE_ERROR = 'Enter a valid 10-digit US mobile number to receive text messages, or uncheck the text message options.';

export interface SmsConsent {
  service: boolean;
  marketing: boolean;
}

/** Only a literal `true` counts. Strings, missing keys, and old payloads all mean no. */
export function parseSmsConsent(body: Record<string, unknown> | null | undefined): SmsConsent {
  return {
    service: body?.smsService === true,
    marketing: body?.smsMarketing === true,
  };
}

/** US numbers only. Returns E.164 (+1XXXXXXXXXX) or null. */
export function toE164(phone: string): string | null {
  const digits = phone.replace(/\D/g, '');
  const national = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  if (national.length !== 10) return null;
  // NANP: area code and exchange cannot start with 0 or 1.
  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(national)) return null;
  return `+1${national}`;
}

/** The form URL the visitor submitted from. Only http(s) URLs, capped in length. */
export function cleanSourceUrl(...candidates: (unknown)[]): string {
  for (const c of candidates) {
    if (typeof c !== 'string' || !c) continue;
    try {
      const url = new URL(c);
      if (url.protocol === 'https:' || url.protocol === 'http:') return url.toString().slice(0, 500);
    } catch {
      /* try the next candidate */
    }
  }
  return '';
}

export interface SmsConsentRecord {
  serviceConsent: boolean;
  marketingConsent: boolean;
  /** E.164 phone the consent applies to. Empty when neither box was checked. */
  phoneE164: string;
  /** Server-side ISO timestamp. */
  timestamp: string;
  sourceUrl: string;
  disclosureVersion: string;
  serviceDisclosure: string;
  marketingDisclosure: string;
}

export type SmsConsentResult =
  | { ok: true; record: SmsConsentRecord }
  | { ok: false; error: string; field: 'phone' };

/**
 * Builds the consent record for one submission. Fails only when a box is
 * checked without a valid phone. With neither box checked the phone stays
 * optional and is not validated, exactly as before.
 */
export function buildSmsConsentRecord(input: {
  consent: SmsConsent;
  phone: string;
  sourceUrl: string;
  now: Date;
}): SmsConsentResult {
  const { consent, phone, sourceUrl, now } = input;
  const any = consent.service || consent.marketing;
  let phoneE164 = '';
  if (any) {
    const e164 = toE164(phone);
    if (!e164) return { ok: false, error: SMS_PHONE_ERROR, field: 'phone' };
    phoneE164 = e164;
  }
  return {
    ok: true,
    record: {
      serviceConsent: consent.service,
      marketingConsent: consent.marketing,
      phoneE164,
      timestamp: now.toISOString(),
      sourceUrl,
      disclosureVersion: SMS_DISCLOSURE_VERSION,
      serviceDisclosure: SMS_SERVICE_DISCLOSURE,
      marketingDisclosure: SMS_MARKETING_DISCLOSURE,
    },
  };
}

/** Sheet columns appended after the existing Contact columns, in order. */
export const SMS_SHEET_COLUMNS = [
  'sms_service_consent',
  'sms_marketing_consent',
  'sms_phone_e164',
  'sms_consent_timestamp',
  'sms_source_url',
  'sms_disclosure_version',
  'sms_service_disclosure',
  'sms_marketing_disclosure',
] as const;

export function smsSheetCells(r: SmsConsentRecord): string[] {
  return [
    r.serviceConsent ? 'yes' : 'no',
    r.marketingConsent ? 'yes' : 'no',
    r.phoneE164,
    r.timestamp,
    r.sourceUrl,
    r.disclosureVersion,
    r.serviceDisclosure,
    r.marketingDisclosure,
  ];
}

/**
 * Whether a stored row allows texting for a program. Anything other than an
 * explicit "yes" (blank cells on older rows, missing columns) is no.
 */
export function rowAllowsSms(cell: string | undefined): boolean {
  return (cell ?? '').trim().toLowerCase() === 'yes';
}
