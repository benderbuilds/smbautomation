import {
  buildSmsConsentRecord,
  cleanSourceUrl,
  parseSmsConsent,
  smsSheetCells,
  type SmsConsentRecord,
} from './smsConsent';
import type { ContactSubmission } from './emails';
import type { Attr } from './attribution';
import type { SaveResult } from './sheets';

const MAX_LEN = 5000;

function isValidEmail(email: unknown): email is string {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim().slice(0, MAX_LEN) : '';
}

export interface ContactDeps {
  appendRow: (tab: 'Contact', values: (string | number)[]) => Promise<SaveResult>;
  sendContactEmails: (
    sub: ContactSubmission & { sms: SmsConsentRecord; smsSaved: boolean }
  ) => Promise<void>;
}

export interface ContactContext {
  attribution: Attr | null;
  referer: string | null;
  now: Date;
}

export type ContactResult =
  /**
   * smsConsentSaved is true only when the visitor checked at least one SMS box
   * AND the consent record was saved. The inquiry itself succeeds either way.
   */
  | { status: 200; body: { ok: true; smsConsentSaved: boolean } }
  | { status: 400; body: { error: string; field?: string } };

export async function handleContact(
  body: Record<string, unknown>,
  ctx: ContactContext,
  deps: ContactDeps
): Promise<ContactResult> {
  const name = str(body.name);
  const business = str(body.business);
  const email = str(body.email);
  const phone = str(body.phone);
  const message = str(body.message);
  const interests = Array.isArray(body.interests)
    ? body.interests.filter((i: unknown) => typeof i === 'string').slice(0, 12).map(str)
    : [];

  if (!name) return { status: 400, body: { error: 'Enter your name.' } };
  if (!isValidEmail(email)) return { status: 400, body: { error: 'Enter a valid email address.' } };
  if (!message) return { status: 400, body: { error: 'Tell us a little about your business.' } };

  const sms = buildSmsConsentRecord({
    consent: parseSmsConsent(body),
    phone,
    sourceUrl: cleanSourceUrl(body.sourceUrl, ctx.referer),
    now: ctx.now,
  });
  if (!sms.ok) return { status: 400, body: { error: sms.error, field: sms.field } };

  const attr = ctx.attribution;
  // Existing columns keep their positions; SMS consent columns are appended.
  const saved = await deps.appendRow('Contact', [
    ctx.now.toISOString(),
    name,
    business,
    email,
    phone,
    interests.join(', '),
    message,
    attr?.utm_source ?? '',
    attr?.utm_medium ?? '',
    attr?.utm_campaign ?? '',
    attr?.landing_page ?? '',
    ...smsSheetCells(sms.record),
  ]);

  const smsRequested = sms.record.serviceConsent || sms.record.marketingConsent;
  if (smsRequested && saved !== 'saved') {
    console.error(`[contact] SMS consent not saved (sheets: ${saved}); not confirming it to the visitor`);
  }
  const smsSaved = smsRequested && saved === 'saved';

  await deps.sendContactEmails({ name, business, email, phone, interests, message, sms: sms.record, smsSaved });

  return { status: 200, body: { ok: true, smsConsentSaved: smsSaved } };
}
