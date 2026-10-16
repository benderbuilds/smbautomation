'use client';

import { useEffect, useState } from 'react';
import { newEventId, trackStandard } from '@/lib/analytics';
import { BOOKING_PREFILL_KEY } from '../RooferAuditForm';
import s from '../roofers.module.css';

export default function CalendlyEmbed({ url }: { url: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams({
      embed_domain: window.location.hostname,
      embed_type: 'Inline',
      hide_gdpr_banner: '1',
      primary_color: '2540d9',
    });
    try {
      const prefill = JSON.parse(sessionStorage.getItem(BOOKING_PREFILL_KEY) || '{}');
      if (prefill.name) params.set('name', prefill.name);
      if (prefill.email) params.set('email', prefill.email);
    } catch {
      /* no prefill */
    }
    setSrc(`${url}?${params}`);

    // Calendly posts this message from the iframe when a time is booked.
    function onMessage(e: MessageEvent) {
      if (e.origin !== 'https://calendly.com') return;
      if (e.data?.event === 'calendly.event_scheduled') {
        trackStandard('Schedule', 'fit_call_booked', { content_name: 'roofer_audit' }, newEventId());
        setBooked(true);
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [url]);

  return (
    <>
      {booked && (
        <p className={s.bookedDone} role="status">
          You’re booked. Check your inbox for the calendar invite. We’ll come with your numbers.
        </p>
      )}
      {src && (
        <iframe
          src={src}
          title="Book your free missed-revenue audit"
          className={s.calendly}
          style={booked ? { marginTop: '1.5rem' } : undefined}
        />
      )}
      <p className={s.bookedFallback}>
        Calendar not loading? <a href={url}>Open the booking page →</a>
      </p>
    </>
  );
}
