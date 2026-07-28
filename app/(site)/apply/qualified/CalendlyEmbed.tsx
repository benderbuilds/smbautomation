'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';
import { track } from '@/lib/analytics';
import { ATTR_COOKIE, parseAttribution } from '@/lib/attribution';
import s from './page.module.css';

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;

export default function CalendlyEmbed() {
  const params = useSearchParams();

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data?.event === 'calendly.event_scheduled') {
        track('fit_call_booked');
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  if (!CALENDLY_URL) {
    return (
      <p className={s.fallback}>
        Your booking link is on its way. Check your email for an invitation to schedule the 20-minute fit call, or write to{' '}
        <a href="mailto:jesse@smbautomation.io">jesse@smbautomation.io</a> to pick a time directly.
      </p>
    );
  }

  const cookieValue =
    typeof document !== 'undefined'
      ? document.cookie.split('; ').find((c) => c.startsWith(`${ATTR_COOKIE}=`))?.split('=').slice(1).join('=')
      : undefined;
  const attr = parseAttribution(cookieValue);

  const url = new URL(CALENDLY_URL);
  const name = params.get('name');
  const email = params.get('email');
  if (name) url.searchParams.set('name', name);
  if (email) url.searchParams.set('email', email);
  if (attr?.utm_source) url.searchParams.set('utm_source', attr.utm_source);
  if (attr?.utm_medium) url.searchParams.set('utm_medium', attr.utm_medium);
  if (attr?.utm_campaign) url.searchParams.set('utm_campaign', attr.utm_campaign);
  url.searchParams.set('hide_gdpr_banner', '1');

  return (
    <>
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      <div
        className={`calendly-inline-widget ${s.calendly}`}
        data-url={url.toString()}
        style={{ minWidth: '320px', height: '700px' }}
      />
    </>
  );
}
