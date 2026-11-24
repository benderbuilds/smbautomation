import type { Metadata } from 'next';
import Image from 'next/image';
import BookingLink from '@/components/BookingLink';
import { TRIAL_START_COPY } from '@/lib/booking';
import m from '@/components/Marketing.module.css';
import RentCalculator from './RentCalculator';
import s from './page.module.css';

const URL = 'https://smbautomation.io/industries/property-management';

export const metadata: Metadata = {
  title: { absolute: 'AI Receptionist for Property Management | SMB Automation' },
  description:
    'After-hours maintenance calls, leasing inquiries, showing bookings, and resident questions answered 24/7, with urgent issues routed to your on-call team. 30-day free trial.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'Tenant calls at 11 PM. We handle it. | SMB Automation',
    description:
      'An AI receptionist for property managers: maintenance intake, leasing calls, and resident questions, routed under your rules.',
    url: URL,
    siteName: 'SMB Automation',
    type: 'website',
  },
};

const CALL = [
  { who: 'Caller', text: 'There’s water coming out from under my kitchen sink and it won’t stop.' },
  { who: 'AI', text: 'I can take the details for the on-call team. Which building and unit are you in?' },
  { who: 'Caller', text: 'Building B, unit 204. It’s still leaking.' },
  { who: 'AI', text: 'I’ve passed the leak details and your unit number to the on-call team.' },
] as const;

const PROBLEMS = [
  {
    title: 'After-hours maintenance',
    body: 'Give residents a clear path to the on-call team when a repair needs attention tonight.',
  },
  {
    title: 'Leasing leads',
    body: 'Prospects browse listings at night. The first property that answers gets the showing.',
  },
  {
    title: 'Repeat questions',
    body: 'Rent portal, parking, pet policy. Your team answers the same ten questions every day.',
  },
];

const COVERAGE = [
  { who: 'Tenants', title: 'Maintenance', body: 'Collect the unit and issue, then route urgent reports to your on-call contact.' },
  { who: 'Prospects', title: 'Leasing', body: 'Availability, pricing, pet policy, and showings booked on your calendar.' },
  { who: 'Residents', title: 'Questions', body: 'Rent portal, parking, amenities, move-out steps. Answered from your policies.' },
  { who: 'Owners + vendors', title: 'Routing', body: 'Route owner and vendor inquiries to the people you choose.' },
];

const STATS = [
  { value: '93%', label: 'client retention at TelePharm' },
  { value: '300+', label: 'accounts onboarded at TelePharm' },
  { value: '13 yrs', label: 'in customer success' },
];

export default function PropertyManagementPage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className={m.hero}>
        <div className={`${m.heroCopy} ${s.heroCopy}`}>
          <p className={m.eyebrow}>AI receptionist for property management</p>
          <h1 className={`${m.h1} ${s.h1}`}>Tenant calls at 11&nbsp;PM. We handle it.</h1>
          <p className={m.sub}>
            Give residents a way to report maintenance after hours and prospects a way to book a
            showing. You decide which calls reach your on-call team.
          </p>
          <div className={m.btnRow}>
            <BookingLink flow="trial" location="pm_hero" className={m.btnPrimary}>
              Start my 30-day free trial
            </BookingLink>
            <BookingLink flow="demo" location="pm_hero" className={m.btnSecondary}>
              Book a demo
            </BookingLink>
          </div>
          <ul className={s.facts}>
            <li>Typical setup within 48 hours</li>
            <li>Keep your number</li>
            <li>Month to month</li>
          </ul>
        </div>

        <div className={m.heroAside}>
          <figure className={s.call} aria-label="Example after-hours maintenance call">
            <div className={s.callTop}>
              <span className={s.callTime}>
                <span className={s.callDot} aria-hidden="true" />
                Example call · 11:12 PM
              </span>
              <span className={s.callProperty}>Ridgeview Apartments</span>
            </div>
            <dl className={s.transcript}>
              {CALL.map((line) => (
                <div key={line.text} className={s.line}>
                  <dt className={line.who === 'AI' ? s.whoAi : s.who}>{line.who}</dt>
                  <dd>{line.text}</dd>
                </div>
              ))}
            </dl>
            <figcaption className={s.alert}>
              <span className={s.alertLabel}>Example maintenance alert</span>
              <span className={s.alertTitle}>Active leak · Building B, unit 204</span>
              <span className={s.alertText}>
                Routed to the on-call contact under the property’s rules. You decide which
                situations reach your on-call team.
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------- Why it matters ---------- */}
      <section className={m.section} aria-labelledby="why-title">
        <div className={m.sectionHead}>
          <h2 id="why-title" className={m.h2}>
            Your phone line is a maintenance queue, a leasing office, and an owner hotline. At once.
          </h2>
          <p className={m.tag}>Why it matters</p>
        </div>
        <div className={m.cols3}>
          {PROBLEMS.map((p, i) => (
            <div key={p.title}>
              <span className={m.num}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={m.colTitle}>{p.title}</h3>
              <p className={m.colBody}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Coverage ---------- */}
      <section className={m.band} aria-labelledby="coverage-title">
        <div className={m.bandHead}>
          <h2 id="coverage-title" className={m.bandTitle}>
            One number for maintenance, leasing, and resident questions.
          </h2>
          <p className={m.bandIntro}>
            Jesse sets up your properties, policies, and on-call contacts. You approve the routing
            rules before launch.
          </p>
        </div>
        <div className={m.cols4}>
          {COVERAGE.map((c) => (
            <div key={c.title}>
              <span className={m.bandLabel}>{c.who}</span>
              <h3 className={m.bandColTitle}>{c.title}</h3>
              <p className={m.bandBody}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Calculator ---------- */}
      <section className={s.numbers} aria-labelledby="calc-title">
        <div className={s.numbersCopy}>
          <p className={m.eyebrow}>Run your numbers</p>
          <h2 id="calc-title" className={s.numbersTitle}>
            What does a missed leasing call cost you?
          </h2>
          <p className={s.numbersText}>
            Estimate how much a delay in filling vacant units could cost your portfolio.
          </p>
          <p className={s.numbersNote}>
            Example inputs. Adjust to your portfolio. This is an estimate from a calculator, not a
            client result.
          </p>
        </div>
        <RentCalculator />
      </section>

      {/* ---------- Founder ---------- */}
      <section className={s.founder} aria-labelledby="founder-title">
        <div className={s.portrait}>
          <Image
            src="/assets/jesse-bender.png"
            alt="Jesse Bender, founder of SMB Automation"
            fill
            sizes="(max-width: 900px) 100vw, 360px"
            className={s.portraitImg}
          />
        </div>
        <div className={s.founderCopy}>
          <p className={m.eyebrow}>Who builds your agent</p>
          <h2 id="founder-title" className={s.founderTitle}>
            Jesse builds your agent and walks you through it.
          </h2>
          <p className={s.founderText}>
            I&apos;m Jesse. I was employee #6 at TelePharm and built customer success from 3 accounts
            to 300+ through our acquisition by Cardinal Health. For 13 years I&apos;ve helped
            independent operators compete with companies ten times their size. I set up every agent
            myself, from Iowa City.
          </p>
          <dl className={s.stats}>
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className={s.statValue}>{stat.value}</dt>
                <dd className={s.statLabel}>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section className={m.closing} aria-labelledby="closing-title">
        <div className={m.closingCopy}>
          <h2 id="closing-title" className={m.closingTitle}>
            Try it with your own properties for 30 days.
          </h2>
          <p className={m.closingText}>
            Most clients go live within 48 hours. Custom setups can take longer. {TRIAL_START_COPY}{' '}
            Monthly billing begins after 30 days unless you cancel.
          </p>
        </div>
        <div className={m.closingActions}>
          <BookingLink flow="trial" location="pm_closing" className={m.btnPrimary}>
            Start my 30-day free trial
          </BookingLink>
          <BookingLink flow="demo" location="pm_closing" className={m.closingLink}>
            Book a demo
          </BookingLink>
        </div>
      </section>
    </>
  );
}
