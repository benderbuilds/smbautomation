'use client';

/* Event names per spec: application_start, application_submit, application_qualified,
   application_unqualified, fit_call_booked, sample_audit_view, workflow_audit_checkout_start,
   workflow_audit_purchase, contact_submit, blog_cta_click */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  try {
    window.gtag?.('event', event, params ?? {});
    window.fbq?.('trackCustom', event, params ?? {});
  } catch (err) {
    console.warn('[analytics] track failed:', err);
  }
}

/** A unique id shared by the browser pixel and the server CAPI event for one conversion. */
export function newEventId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

/**
 * Fires a Meta standard event (Lead, Schedule) rather than trackCustom, because
 * campaigns can only optimize on standard events. Pass the same eventId to CAPI.
 */
export function trackStandard(
  metaEvent: 'Lead' | 'Schedule',
  gaEvent: string,
  params: Record<string, unknown> = {},
  eventId?: string
): void {
  if (typeof window === 'undefined') return;
  try {
    window.gtag?.('event', gaEvent, params);
    window.fbq?.('track', metaEvent, params, eventId ? { eventID: eventId } : undefined);
  } catch (err) {
    console.warn('[analytics] trackStandard failed:', err);
  }
}
