import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import BookingCalendar from '@/components/BookingCalendar';
import { HELLO_EMAIL, PHONE_DISPLAY, PHONE_TEL, TRIAL_START_COPY } from '@/lib/booking';
import { ATTR_COOKIE, campaignParams, parseAttribution } from '@/lib/attribution';
import m from '@/components/Marketing.module.css';
import s from '@/components/BookingPage.module.css';

export const metadata: Metadata = {
  title: 'Start Your 30-Day Free Trial',
  description:
    'Enter your details and book your onboarding call to start a 30-day free trial of the SMB Automation Front Desk Assistant.',
  alternates: { canonical: 'https://smbautomation.io/start-trial' },
  robots: { index: false, follow: true },
};

type SearchParams = Record<string, string | string[] | undefined>;

export default function StartTrialPage({ searchParams }: { searchParams: SearchParams }) {
  /* First-touch UTMs (or this page's own) ride along to GHL so the booking keeps its ad source. */
  const params = campaignParams(parseAttribution(cookies().get(ATTR_COOKIE)?.value), searchParams);

  return (
    <section className={s.page}>
      <div className={s.intro}>
        <p className={m.eyebrow}>Free trial</p>
        <h1 className={s.title}>Start your 30-day free trial</h1>
        <p className={s.lede}>
          On the onboarding call, Jesse sets up your Front Desk Assistant: the Chat Agent, the Voice
          Agent, or both, depending on your plan.
        </p>
        <ol className={s.steps}>
          <li>
            <span className={s.stepNum}>1</span>
            <span>
              <strong>Enter your details</strong>
              Name, email, phone number, and business website.
            </span>
          </li>
          <li>
            <span className={s.stepNum}>2</span>
            <span>
              <strong>Review the trial terms</strong>
              After 30 days, your plan is billed monthly at its listed price:{' '}
              <Link href="/#pricing">Answer $397/mo or Front Desk $797/mo</Link>. Cancel before your
              30-day trial ends by calling or emailing us and you won&apos;t be charged.{' '}
              <Link href="/terms#free-trial">Full trial terms</Link>. Text message updates are
              optional. Check a box only if you want them.
            </span>
          </li>
          <li>
            <span className={s.stepNum}>3</span>
            <span>
              <strong>Book your onboarding call</strong>
              Pick a time that works for you.
            </span>
          </li>
        </ol>
        <p className={s.note}>{TRIAL_START_COPY}</p>
        <p className={s.help}>
          Questions first? Email <a href={`mailto:${HELLO_EMAIL}`}>{HELLO_EMAIL}</a>, or hear our Voice Agent at{' '}
          <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>.
        </p>
      </div>
      <BookingCalendar flow="trial" params={params} />
    </section>
  );
}
