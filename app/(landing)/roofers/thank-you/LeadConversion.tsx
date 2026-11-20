'use client';

import { useEffect } from 'react';
import { newEventId, trackStandard } from '@/lib/analytics';

const TRACKED_KEY = 'roofer_lead_tracked';

/* The roofer audit form is a HighLevel form that redirects here on submit, so
   landing on this page is the conversion. Fire the Meta Lead / GA4
   generate_lead once per browser session so a refresh doesn't double count.
   Do not also send a Lead from a HighLevel Conversions API workflow: the two
   would not share an event id, so Meta would count each lead twice. */
export default function LeadConversion() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(TRACKED_KEY)) return;
      sessionStorage.setItem(TRACKED_KEY, '1');
    } catch {
      /* storage blocked: still track once for this page view */
    }
    trackStandard('Lead', 'generate_lead', { content_name: 'roofer_audit' }, newEventId());
  }, []);
  return null;
}
