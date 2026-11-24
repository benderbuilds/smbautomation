import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import BookingCalendar from '@/components/BookingCalendar';
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/booking';
import { ATTR_COOKIE, campaignParams, parseAttribution } from '@/lib/attribution';
import m from '@/components/Marketing.module.css';
import s from '@/components/BookingPage.module.css';

export const metadata: Metadata = {
  title: 'Book a Demo',
  description:
    'Pick a time to see the SMB Automation Front Desk Assistant answer calls and website chat for a business like yours.',
  alternates: { canonical: 'https://smbautomation.io/book-demo' },
  robots: { index: false, follow: true },
};

type SearchParams = Record<string, string | string[] | undefined>;

export default function BookDemoPage({ searchParams }: { searchParams: SearchParams }) {
  /* First-touch UTMs (or this page's own) ride along to GHL so the booking keeps its ad source. */
  const params = campaignParams(parseAttribution(cookies().get(ATTR_COOKIE)?.value), searchParams);

  return (
    <section className={s.page}>
      <div className={s.intro}>
        <p className={m.eyebrow}>Demo</p>
        <h1 className={s.title}>Book a demo</h1>
        <p className={s.lede}>
          See the Front Desk Assistant answer calls and website chat for a business like yours, and
          get your questions about plans and setup answered.
        </p>
        <ol className={s.steps}>
          <li>
            <span className={s.stepNum}>1</span>
            <span>
              <strong>Enter your details</strong>
              Name, email, and business website.
            </span>
          </li>
          <li>
            <span className={s.stepNum}>2</span>
            <span>
              <strong>Pick a demo time</strong>
              Choose any open slot.
            </span>
          </li>
        </ol>
        <p className={s.note}>Booking a demo does not start a free trial.</p>
        <p className={s.help}>
          Prefer to call? <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>.
        </p>
      </div>
      <BookingCalendar flow="demo" params={params} />
    </section>
  );
}
