import { createHash } from 'crypto';
import { normalizePhone } from './rooferAudit';

/**
 * Server-side Meta Conversions API. No-ops without META_CAPI_TOKEN and
 * NEXT_PUBLIC_META_PIXEL_ID. Never throws.
 */

export interface CapiData {
  /** Must match the eventID passed to the browser pixel so Meta deduplicates the pair. */
  eventId?: string;
  eventSourceUrl?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  clientIp?: string;
  userAgent?: string;
  /** The _fbp and _fbc cookies set by the browser pixel. */
  fbp?: string;
  fbc?: string;
  value?: number;
  currency?: string;
}

const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

export function buildUserData(data: CapiData): Record<string, unknown> {
  const ud: Record<string, unknown> = {};
  const email = data.email?.trim().toLowerCase();
  const phone = data.phone ? normalizePhone(data.phone) : '';
  const fn = data.firstName?.trim().toLowerCase();
  const ln = data.lastName?.trim().toLowerCase();
  if (email) ud.em = [sha256(email)];
  if (phone) ud.ph = [sha256(phone)];
  if (fn) ud.fn = [sha256(fn)];
  if (ln) ud.ln = [sha256(ln)];
  if (data.clientIp) ud.client_ip_address = data.clientIp;
  if (data.userAgent) ud.client_user_agent = data.userAgent;
  if (data.fbp) ud.fbp = data.fbp;
  if (data.fbc) ud.fbc = data.fbc;
  return ud;
}

export async function sendCapiEvent(name: string, data: CapiData = {}): Promise<void> {
  const token = process.env.META_CAPI_TOKEN;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!token || !pixelId) {
    console.log(`[meta-capi] env missing, skipping event ${name}`);
    return;
  }
  try {
    const body = {
      data: [
        {
          event_name: name,
          event_time: Math.floor(Date.now() / 1000),
          event_id: data.eventId,
          action_source: 'website',
          event_source_url: data.eventSourceUrl,
          user_data: buildUserData(data),
          custom_data:
            data.value != null ? { value: data.value, currency: data.currency ?? 'USD' } : undefined,
        },
      ],
    };
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) console.error(`[meta-capi] event ${name} failed: ${res.status} ${await res.text()}`);
  } catch (err) {
    console.error(`[meta-capi] event ${name} errored:`, err);
  }
}
