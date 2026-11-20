import Script from 'next/script';
import s from './HighLevelForm.module.css';

/* HighLevel booking calendar. Bookings land on the contact in HighLevel, which
   sends the confirmation and reminder texts (service program only) and emails.
   The id comes from the calendar's embed code (Calendars > Share): the last
   segment of the iframe src. */
export const HIGHLEVEL_CALENDARS = {
  rooferAudit: { id: '' },
} as const;

type CalendarKey = keyof typeof HIGHLEVEL_CALENDARS;

export default function HighLevelCalendar({ calendar, title }: { calendar: CalendarKey; title: string }) {
  const { id } = HIGHLEVEL_CALENDARS[calendar];

  if (!id) {
    return (
      <div className={s.wrap}>
        <p className={s.fallback}>
          We will call you shortly to set up your audit. Prefer to reach us first? Call{' '}
          <a href="tel:+13192552700">(319) 255-2700</a> or email{' '}
          <a href="mailto:jesse@smbautomation.io">jesse@smbautomation.io</a>.
        </p>
      </div>
    );
  }

  return (
    <div className={s.wrap}>
      <iframe
        src={`https://api.leadconnectorhq.com/widget/booking/${id}`}
        className={s.frame}
        style={{ minHeight: 800 }}
        scrolling="no"
        id={`${id}_${calendar}`}
        title={title}
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </div>
  );
}
