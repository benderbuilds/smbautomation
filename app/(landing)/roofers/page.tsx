import type { Metadata } from 'next';
import Image from 'next/image';
import { LandingHeader, LandingFooter } from './LandingChrome';
import RooferAuditForm from './RooferAuditForm';
import s from './roofers.module.css';

export const metadata: Metadata = {
  title: { absolute: 'Never Miss Another $20K Roof | SMB Automation for Roofers' },
  description:
    'Missed calls texted back in 60 seconds by day, answered live after hours, every estimate followed up automatically. Get a free missed-revenue audit for your roofing company.',
  alternates: { canonical: 'https://smbautomation.io/roofers' },
  // Paid-traffic page: keep it out of search so it doesn't compete with the main site.
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Never Miss Another $20K Roof',
    description: '24/7 call and lead response for roofing companies. Free missed-revenue audit.',
    url: 'https://smbautomation.io/roofers',
    siteName: 'SMB Automation',
    type: 'website',
    images: [{ url: '/assets/roofers/roofer-sunset.jpg', width: 1408, height: 1760 }],
  },
};

/* Footnote numbers map to SOURCES below. */
const STATS = [
  { value: '27%', label: 'of calls to home service businesses go unanswered', note: 1 },
  { value: '85%', label: 'of unanswered callers never call back', note: 1 },
  { value: '73%', label: 'of calls come in outside 9 to 5', note: 2 },
  { value: '78%', label: 'of buyers hire the first company that responds', note: 3 },
  { value: '12%', label: 'of contractors respond to a lead within 5 minutes', note: 4 },
];

const SOURCES = [
  'Invoca; CallRail 2025 call benchmark report.',
  'Invoca 2026 home-improvement call benchmarks.',
  'Widely cited lead-response research.',
  'Industry lead-response benchmark reports.',
];

const STEPS = [
  {
    when: 'Business hours',
    title: 'Missed-call text-back',
    body: 'A call you can’t pick up gets an instant text: “Sorry we missed you. How can we help?” The conversation starts before they dial the next roofer.',
  },
  {
    when: 'After hours',
    live: true,
    title: 'Live answering',
    body: 'Nights, weekends, holidays: every call gets picked up. The caller is qualified, estimates get booked into your calendar, and true emergencies route straight to you. No voicemail black hole.',
  },
  {
    when: 'Every estimate',
    title: 'Follow-up on autopilot',
    body: 'Unsent and unsigned estimates get systematic follow-up until they close or opt out. Plus an automatic Google review request after every finished job.',
  },
];

const DELIVERABLES = [
  ['Missed calls texted back in 60 seconds', 'during business hours, automatically'],
  ['Every after-hours call answered live', 'nights, weekends, and holidays'],
  ['Web leads answered in under 60 seconds', 'text and email, day or night'],
  ['Estimates chased until they sign', 'automated follow-up sequences'],
  ['More Google reviews', 'a request after every finished job'],
  ['No new software to learn', 'layers onto the tools you already use'],
];

const FAQ = [
  {
    q: 'Do I need to replace my current software?',
    a: 'No. This layers onto what you already use.',
  },
  {
    q: 'How fast can it be live?',
    a: 'Most companies are running within 2 weeks.',
  },
  {
    q: 'What happens when someone calls at 2am?',
    a: 'The call is answered live, the caller is qualified, and estimates get booked into your calendar. True emergencies route straight to you.',
  },
  {
    q: 'What does it cost?',
    a: 'It depends on call volume. The audit gives you an exact number before you commit to anything.',
  },
  {
    q: 'Is this just a chatbot?',
    a: 'No. It’s a full response system: live answering, texts, email, calendar booking, and follow-up sequences.',
  },
];

export default function RoofersPage() {
  return (
    <>
      <LandingHeader />

      {/* ---------------- Hero ---------------- */}
      <section className={s.hero}>
        <div className={s.heroInner}>
          <div className={s.heroCopy}>
            <span className="eyebrow-light">For roofing company owners</span>
            <h1 className={s.heroHeadline}>
              Your competitor answered in 47 seconds. <em>You called back tomorrow.</em>
            </h1>
            <p className={s.heroSub}>
              We install a 24/7 response system for roofing companies. Missed calls get a text back
              in 60 seconds by day. After-hours calls get answered live. Every estimate gets chased
              automatically.
            </p>
            <div className={s.heroCtas}>
              <a href="#audit" className="btn-orange">
                Get my free missed-revenue audit →
              </a>
              <span className={s.heroNote}>Free. 20 minutes. No pitch.</span>
            </div>
          </div>
          <div className={s.heroMedia}>
            <Image
              src="/assets/roofers/roofer-sunset.jpg"
              alt="Roofer standing on a shingled roof at sunset, answering a phone call"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
              className={s.heroImg}
            />
            <div className={s.callCard} aria-hidden="true">
              <span className={s.callCardLabel}>Missed call · 4:12 PM</span>
              <span className={s.callCardText}>Text sent in 41 sec</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Problem ---------------- */}
      <section className={s.stats} aria-labelledby="leak-title">
        <div className={s.inner}>
          <span className="eyebrow-light">The leak</span>
          <h2 id="leak-title" className={s.statsTitle}>
            The job goes to whoever picks up first.
          </h2>
          <dl className={s.statGrid}>
            {STATS.map((stat) => (
              <div key={stat.value} className={s.stat}>
                <dt className={s.statValue}>
                  {stat.value}
                  <sup className={s.footnoteRef}>
                    <a href={`#source-${stat.note}`} aria-label={`Source ${stat.note}`}>
                      {stat.note}
                    </a>
                  </sup>
                </dt>
                <dd className={s.statLabel}>{stat.label}</dd>
              </div>
            ))}
          </dl>
          <p className={s.statsClose}>
            You’re not losing jobs because your work is bad.{' '}
            <strong>You’re losing them because you were on a roof.</strong>
          </p>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className={`${s.section} ${s.sectionWhite}`} aria-labelledby="how-title">
        <div className={s.inner}>
          <div className={s.sectionHead}>
            <span className="eyebrow">How it works</span>
            <h2 id="how-title" className={s.sectionTitle}>
              No caller goes unanswered. <em>Day or night.</em>
            </h2>
          </div>

          {/* 24-hour coverage strip: 7am to 6pm text-back, the rest live answering. */}
          <div className={s.clock} aria-label="Coverage across a 24-hour day">
            <div className={`${s.clockSeg} ${s.clockNight}`} style={{ flexGrow: 7 }}>
              <span>Live answering</span>
            </div>
            <div className={`${s.clockSeg} ${s.clockDay}`} style={{ flexGrow: 11 }}>
              <span>Text-back in 60 sec</span>
            </div>
            <div className={`${s.clockSeg} ${s.clockNight}`} style={{ flexGrow: 6 }}>
              <span>Live answering</span>
            </div>
          </div>
          <div className={s.clockTicks} aria-hidden="true">
            <span>12 AM</span>
            <span>7 AM</span>
            <span>6 PM</span>
            <span>12 AM</span>
          </div>

          <ol className={s.steps}>
            {STEPS.map((step, i) => (
              <li key={step.title} className={s.step}>
                <div className={s.stepTop}>
                  <span className={s.stepNum}>0{i + 1}</span>
                  <span className={s.stepWhen}>{step.when}</span>
                  {step.live && <span className={s.liveBadge}>Live</span>}
                </div>
                <h3 className={s.stepTitle}>{step.title}</h3>
                <p className={s.stepBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- What you get ---------------- */}
      <section className={`${s.section} ${s.sectionAlt}`} aria-labelledby="get-title">
        <div className={`${s.inner} ${s.getGrid}`}>
          <div>
            <span className="eyebrow">What you get</span>
            <h2 id="get-title" className={s.sectionTitle}>
              You stay on the roof. <em>We make sure no job slips past you.</em>
            </h2>
            <div className={s.proof}>
              <span className={s.proofLabel}>Recent result</span>
              <p className={s.proofText}>
                A home services client added <strong>2 new customers in the first 30 days.</strong>
              </p>
            </div>
          </div>
          <ul className={s.deliverables}>
            {DELIVERABLES.map(([outcome, how]) => (
              <li key={outcome} className={s.deliverable}>
                <span className="proof-dot" aria-hidden="true" />
                <span>
                  <strong>{outcome}</strong> <span className={s.deliverableHow}>· {how}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Audit + form ---------------- */}
      <section className={`${s.section} ${s.sectionDark}`} id="audit" aria-labelledby="audit-title">
        <div className={`${s.inner} ${s.auditGrid}`}>
          <div>
            <span className="eyebrow-light">The free audit</span>
            <h2 id="audit-title" className={s.sectionTitle}>
              See what missed calls cost you. <em>In dollars.</em>
            </h2>
            <p className={s.auditLede}>
              We look at your call volume and lead flow and show you what missed calls and slow
              follow-up cost you every month. Then we name the three fixes with the fastest payback.
            </p>
            <ul className={s.auditList}>
              <li>
                <span className="proof-dot" aria-hidden="true" />
                Free, 20 minutes, no pitch
              </li>
              <li>
                <span className="proof-dot" aria-hidden="true" />
                An exact monthly dollar number, not a guess
              </li>
              <li>
                <span className="proof-dot" aria-hidden="true" />
                Pricing before you commit to anything
              </li>
            </ul>
            <div className={s.founder}>
              <Image
                src="/assets/jesse-bender.png"
                alt="Jesse Bender"
                width={64}
                height={64}
                className={s.founderImg}
              />
              <div>
                <p className={s.founderName}>You’ll talk to Jesse Bender</p>
                <p className={s.founderRole}>Founder, SMB Automation</p>
              </div>
            </div>
          </div>
          <RooferAuditForm />
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className={`${s.section} ${s.sectionWhite}`} aria-labelledby="faq-title">
        <div className={`${s.inner} ${s.faqGrid}`}>
          <div>
            <span className="eyebrow">Questions</span>
            <h2 id="faq-title" className={s.sectionTitle}>
              Straight answers.
            </h2>
          </div>
          <div className={s.faqList}>
            {FAQ.map((item) => (
              <details key={item.q} className={s.faqItem}>
                <summary className={s.faqQ}>{item.q}</summary>
                <p className={s.faqA}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Closing CTA ---------------- */}
      <section className={s.closing}>
        <div className={s.inner}>
          <h2 className={s.closingTitle}>
            The next call comes in while you’re on a roof. <em>Who answers it?</em>
          </h2>
          <a href="#audit" className="btn-orange">
            Get my free missed-revenue audit →
          </a>
        </div>
      </section>

      <LandingFooter>
        <ol className={s.sources} aria-label="Sources">
          {SOURCES.map((src, i) => (
            <li key={src} id={`source-${i + 1}`}>
              {src}
            </li>
          ))}
        </ol>
      </LandingFooter>
    </>
  );
}
