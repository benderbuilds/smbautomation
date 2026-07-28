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
