import Link from 'next/link';
import Script from 'next/script';
import { BOOKING, bookingUrl, type BookingFlow } from '@/lib/booking';
import s from './BookingCalendar.module.css';

/* Embeds a GHL booking calendar. The calendar's own attached form collects the
   visitor's details (and, for the trial, the optional SMS consent boxes), so the
   site never renders a form of its own. form_embed.js resizes the iframe to its
   content, which keeps the calendar from scrolling inside itself on a phone. */
export default function BookingCalendar({
  flow,
  params,
}: {
  flow: BookingFlow;
  /** Campaign UTMs forwarded to GHL so the booking keeps its ad source. */
  params?: URLSearchParams;
}) {
  const url = bookingUrl(flow, params);
  return (
    <div className={s.wrap}>
      <iframe
        src={url}
        id={`${BOOKING[flow].calendarId}_embed`}
        title={BOOKING[flow].frameTitle}
        className={s.frame}
        scrolling="no"
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
      <div className={s.meta}>
        <p>
          Calendar not loading?{' '}
          <a href={url} target="_blank" rel="noopener">
            Open the booking page
          </a>
          .
        </p>
        <p>
          <Link href="/privacy">Privacy Policy</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/terms">Terms of Service</Link>
          {flow === 'trial' && (
            <>
              <span aria-hidden="true"> · </span>
              <Link href="/terms#free-trial">Free trial terms</Link>
              <span aria-hidden="true"> · </span>
              <Link href="/terms#sms">Text message terms</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
