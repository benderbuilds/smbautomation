import type { Metadata } from 'next';
import BookingCalendar from '@/components/BookingCalendar';
import { PHONE_DISPLAY, PHONE_TEL, TRIAL_START_COPY } from '@/lib/booking';
import m from '@/components/Marketing.module.css';
import s from '@/components/BookingPage.module.css';

export const metadata: Metadata = {
  title: 'Start Your 30-Day Free Trial',
  description:
    'Enter your details and book your onboarding call to start a 30-day free trial of the SMB Automation Front Desk Assistant.',
  alternates: { canonical: 'https://smbautomation.io/start-trial' },
  robots: { index: false, follow: true },
};

export default function StartTrialPage() {
  return (
    <section className={s.page}>
      <div className={s.intro}>
        <p className={m.eyebrow}>Free trial</p>
        <h1 className={s.title}>Start your 30-day free trial</h1>
        <p className={s.lede}>
          On the onboarding call, Jesse connects your website chat, Voice AI, or both, depending on
          your plan.
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
              Text message updates are optional. Check a box only if you want them.
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
          Questions first? Call <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>.
        </p>
      </div>
      <BookingCalendar flow="trial" />
    </section>
  );
}
