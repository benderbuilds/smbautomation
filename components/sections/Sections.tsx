/* Shared page sections for the homepage and every /industries/* page. Each page
   passes its own copy; layout, pricing, contact details, and the team block stay
   identical so industry pages match the homepage section for section. */

import BookingLink from '@/components/BookingLink';
import Icon, { type IconName } from '@/components/Icon';
import { HELLO_EMAIL, PHONE_DISPLAY, PHONE_TEL, TRIAL_START_COPY } from '@/lib/booking';
import s from '@/components/Site.module.css';

/* ---------- Shared content ---------- */

/* Tools the Front Desk Assistant fits alongside. Plain names, no third-party logos:
   these are integrations and platforms, not customers. */
const WORKS_WITH: { icon: IconName; label: string }[] = [
  { icon: 'calendar', label: 'Google Calendar' },
  { icon: 'calendar', label: 'Outlook Calendar' },
  { icon: 'star', label: 'Google reviews' },
  { icon: 'phone', label: 'Your current phone number' },
  { icon: 'chat', label: 'WordPress, Wix and Squarespace sites' },
];

export const PLANS = [
  {
    name: 'Answer',
    who: 'Solo operators and small teams',
    price: '$397',
    features: [
      'Voice Agent or Chat Agent',
      '24/7 answering and booking',
      'Urgent-call routing (voice)',
      'Text summaries after every call (voice)',
      'Keep your existing business number',
    ],
    cta: { flow: 'trial' as const, label: 'Start free trial' },
  },
  {
    name: 'Front Desk',
    badge: 'Voice + chat',
    who: 'Teams with steady inbound volume',
    price: '$797',
    featured: true,
    features: [
      'Voice Agent and Chat Agent',
      'Call transcripts and recordings',
      'Appointment reminders',
      'Missed-call text-back',
      'Google review requests',
      'Monthly results report',
    ],
    cta: { flow: 'trial' as const, label: 'Start free trial' },
  },
  {
    name: 'Multi-Location',
    who: 'Two or more locations or lines',
    price: 'Custom',
    features: [
      'Everything in Front Desk',
      'Call flows per location',
      'Invoice and AR follow-up',
      'CRM and API integrations',
      'Dedicated tuning',
    ],
    cta: { flow: 'demo' as const, label: 'Talk to us' },
  },
];

/* ---------- Types ---------- */

export type Card = { icon: IconName; title: string; body: string };
export type Step = Card & { plan: string };
export type Agent = { icon: IconName; name: string; lead: string; points: string[] };
type Cell = boolean | string;
export type CompareRow = { row: string; voicemail: Cell; hire: Cell; us: Cell };
export type Faq = { q: string; a: string };

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/* ---------- Sections ---------- */

export function Hero({
  title,
  accent,
  lede,
  points,
  location,
  visual,
}: {
  title: React.ReactNode;
  accent: React.ReactNode;
  lede: React.ReactNode;
  points: string[];
  /** Analytics location for the hero CTAs, e.g. home_hero. */
  location: string;
  visual: React.ReactNode;
}) {
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={s.heroGlow} aria-hidden="true" />
      <div className={s.heroInner}>
        <div className={s.heroCopy}>
          <h1 id="hero-title" className={s.h1}>
            {title} <span className={s.h1Accent}>{accent}</span>
          </h1>
          <p className={s.lede}>{lede}</p>

          <div className={s.heroActions}>
            <BookingLink flow="trial" location={location} className={s.btnAccent}>
              Start your free trial
              <Icon name="arrow" size={18} />
            </BookingLink>
            <BookingLink flow="demo" location={location} className={s.btnGlass}>
              Book a demo
            </BookingLink>
          </div>

          <a href={PHONE_TEL} className={s.voiceDemo}>
            <span className={s.voiceDemoIcon} aria-hidden="true">
              <Icon name="phone" size={18} />
            </span>
            <span>
              <span className={s.voiceDemoLabel}>Hear the Voice Agent live</span>
              <span className={s.voiceDemoNumber}>Call {PHONE_DISPLAY}</span>
            </span>
          </a>

          <ul className={s.heroPoints}>
            {points.map((p) => (
              <li key={p}>
                <Icon name="check" size={16} />
                {p}
              </li>
            ))}
          </ul>
          <p className={s.fine}>
            {TRIAL_START_COPY} No credit card required. Monthly billing begins after the trial
            unless you cancel.
          </p>
        </div>

        <div className={s.heroVisual}>{visual}</div>
      </div>
    </section>
  );
}

/** A small glass status card that floats over the hero visual. */
export function FloatCard({
  position,
  tone,
  icon,
  label,
  text,
}: {
  position: 'top' | 'bottom';
  tone: 'blue' | 'green' | 'red';
  icon: IconName;
  label: string;
  text: string;
}) {
  const toneClass = { blue: s.floatIconBlue, green: s.floatIconGreen, red: s.floatIconRed }[tone];
  return (
    <div className={`${s.float} ${position === 'top' ? s.floatCall : s.floatBooked}`} aria-hidden="true">
      <span className={`${s.floatIcon} ${toneClass}`}>
        <Icon name={icon} size={18} />
      </span>
      <span>
        <span className={s.floatLabel}>{label}</span>
        <span className={s.floatText}>{text}</span>
      </span>
    </div>
  );
}

export function WorksWith() {
  return (
    <section className={s.works} aria-labelledby="works-title">
      <p id="works-title" className={s.worksTitle}>
        Fits the tools you already run on
      </p>
      <ul className={s.worksList}>
        {WORKS_WITH.map((w) => (
          <li key={w.label}>
            <Icon name={w.icon} size={18} />
            {w.label}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Problem({
  title,
  problems,
  hireLabel = 'Full-time receptionist',
}: {
  title: React.ReactNode;
  problems: Card[];
  hireLabel?: string;
}) {
  return (
    <section className={s.section} aria-labelledby="problem-title">
      <div className={s.head}>
        <p className={s.kicker}>The problem</p>
        <h2 id="problem-title" className={s.h2}>
          {title}
        </h2>
      </div>

      <div
        className={s.hours}
        role="img"
        aria-label={`${hireLabel} covers 40 of the 168 hours in a week. The Front Desk Assistant covers all 168.`}
      >
        <div className={s.hoursRow}>
          <span className={s.hoursLabel}>{hireLabel}</span>
          <span className={s.hoursTrack}>
            <span className={s.hoursFillHire} style={{ width: `${(40 / 168) * 100}%` }} />
          </span>
          <span className={s.hoursValue}>40 hrs</span>
        </div>
        <div className={s.hoursRow}>
          <span className={s.hoursLabel}>Front Desk Assistant</span>
          <span className={s.hoursTrack}>
            <span className={s.hoursFillUs} style={{ width: '100%' }} />
          </span>
          <span className={s.hoursValue}>168 hrs</span>
        </div>
      </div>

      <div className={s.grid3}>
        {problems.map((p) => (
          <article key={p.title} className={s.card}>
            <span className={`${s.cardIcon} ${s.cardIconWarm}`}>
              <Icon name={p.icon} size={22} />
            </span>
            <h3 className={s.h3}>{p.title}</h3>
            <p className={s.body}>{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HowItWorks({
  title,
  text,
  steps,
  anchors = false,
}: {
  title: React.ReactNode;
  text: React.ReactNode;
  steps: Step[];
  /** Homepage only: the #how-it-works anchor and its #automation alias. */
  anchors?: boolean;
}) {
  return (
    <section
      id={anchors ? 'how-it-works' : undefined}
      className={`${s.section} ${s.tinted} ${s.anchor}`}
      aria-labelledby="how-title"
    >
      {/* Alias for older links to /#automation. */}
      {anchors && <span id="automation" className={s.alias} aria-hidden="true" />}
      <div className={s.head}>
        <p className={s.kicker}>How it works</p>
        <h2 id="how-title" className={s.h2}>
          {title}
        </h2>
        <p className={s.headText}>{text}</p>
      </div>
      <ol className={s.steps}>
        {steps.map((step, i) => (
          <li key={step.title} className={s.step}>
            <div className={s.stepTop}>
              <span className={s.stepIcon}>
                <Icon name={step.icon} size={22} />
              </span>
              <span className={s.stepNum} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className={s.h3}>{step.title}</h3>
            <p className={s.body}>{step.body}</p>
            <span className={step.plan === 'All plans' ? s.chip : s.chipAccent}>{step.plan}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Industry-specific example conversations (or any extra block) in the section frame. */
export function Examples({
  title,
  text,
  children,
}: {
  title: React.ReactNode;
  text: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className={s.section} aria-labelledby="examples-title">
      <div className={s.head}>
        <p className={s.kicker}>See it work</p>
        <h2 id="examples-title" className={s.h2}>
          {title}
        </h2>
        <p className={s.headText}>{text}</p>
      </div>
      {children}
    </section>
  );
}

export function Agents({ title, agents, tinted = false }: { title: React.ReactNode; agents: Agent[]; tinted?: boolean }) {
  return (
    <section className={tinted ? `${s.section} ${s.tinted}` : s.section} aria-labelledby="agents-title">
      <div className={s.head}>
        <p className={s.kicker}>What you get</p>
        <h2 id="agents-title" className={s.h2}>
          {title}
        </h2>
      </div>
      <div className={s.grid2}>
        {agents.map((a) => (
          <article key={a.name} className={`${s.card} ${s.agentCard}`}>
            <div className={s.agentHead}>
              <span className={`${s.cardIcon} ${s.cardIconBlue}`}>
                <Icon name={a.icon} size={22} />
              </span>
              <h3 className={s.h3}>{a.name}</h3>
            </div>
            <p className={s.agentLead}>{a.lead}</p>
            <ul className={s.checks}>
              {a.points.map((pt) => (
                <li key={pt}>
                  <Icon name="check" size={18} />
                  {pt}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className={s.tryIt}>
        <Icon name="chat" size={18} />
        Try both now: the chat bubble on this page is a live Chat Agent, and{' '}
        <a href={PHONE_TEL} className={s.inlineLink}>
          {PHONE_DISPLAY}
        </a>{' '}
        rings our Voice Agent.
      </p>
    </section>
  );
}

export function Pricing({
  title = 'Priced like software, not like payroll.',
  locationPrefix = '',
  anchors = false,
}: {
  title?: React.ReactNode;
  /** Prefix for plan CTA analytics locations; the homepage uses none (pricing_answer). */
  locationPrefix?: string;
  /** Homepage only: the #pricing anchor and its #services alias. */
  anchors?: boolean;
}) {
  return (
    <section
      id={anchors ? 'pricing' : undefined}
      className={`${s.section} ${s.pricing} ${s.anchor}`}
      aria-labelledby="pricing-title"
    >
      {/* Alias for older links to /#services. */}
      {anchors && <span id="services" className={s.alias} aria-hidden="true" />}
      <div className={`${s.head} ${s.headCenter}`}>
        <p className={s.kicker}>Pricing</p>
        <h2 id="pricing-title" className={s.h2}>
          {title}
        </h2>
        <ul className={s.terms}>
          <li>30-day free trial</li>
          <li>No setup fee</li>
          <li>Month to month</li>
        </ul>
      </div>
      <div className={s.plans}>
        {PLANS.map((plan) => (
          <article key={plan.name} className={plan.featured ? `${s.plan} ${s.planFeatured}` : s.plan}>
            <div className={s.planHead}>
              <h3 className={s.planName}>{plan.name}</h3>
              {plan.badge && <span className={s.badge}>{plan.badge}</span>}
            </div>
            <p className={s.planWho}>{plan.who}</p>
            <p className={s.price}>
              <span className={s.priceValue}>{plan.price}</span>
              {plan.price !== 'Custom' && <span className={s.per}>/month</span>}
            </p>
            <BookingLink
              flow={plan.cta.flow}
              location={`${locationPrefix}pricing_${plan.name.toLowerCase().replace(/\s+/g, '_')}`}
              className={plan.featured ? s.btnAccentBlock : s.btnOutlineBlock}
            >
              {plan.cta.label}
            </BookingLink>
            <ul className={s.checks}>
              {plan.features.map((f) => (
                <li key={f}>
                  <Icon name="check" size={18} />
                  {f}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function CompareCell({ value, highlight }: { value: Cell; highlight?: boolean }) {
  if (value === true) {
    return (
      <span className={`${s.cellIcon} ${highlight ? s.cellYesStrong : s.cellYes}`}>
        <Icon name="check" size={18} label="Yes" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className={`${s.cellIcon} ${s.cellNo}`}>
        <Icon name="x" size={16} label="No" />
      </span>
    );
  }
  return <span className={highlight ? s.cellTextStrong : s.cellText}>{value}</span>;
}

export function Compare({
  title,
  rows,
  hireLabel = 'Full-time receptionist',
}: {
  title: React.ReactNode;
  rows: CompareRow[];
  hireLabel?: string;
}) {
  return (
    <section className={s.section} aria-labelledby="compare-title">
      <div className={s.head}>
        <p className={s.kicker}>Compare</p>
        <h2 id="compare-title" className={s.h2}>
          {title}
        </h2>
      </div>
      <div className={s.tableWrap}>
        <table className={s.table}>
          <caption className="sr-only">Voicemail, {hireLabel.toLowerCase()}, and SMB Automation compared</caption>
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">Feature</span>
              </th>
              <th scope="col">Voicemail</th>
              <th scope="col">{hireLabel}</th>
              <th scope="col" className={s.colUs}>
                SMB Automation
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.row}>
                <th scope="row">{r.row}</th>
                <td>
                  <CompareCell value={r.voicemail} />
                </td>
                <td>
                  <CompareCell value={r.hire} />
                </td>
                <td className={s.colUs}>
                  <CompareCell value={r.us} highlight />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/** "Who you work with": the same copy on every page. */
export function Team({ location }: { location: string }) {
  return (
    <section className={`${s.section} ${s.tinted}`} aria-labelledby="team-title">
      <div className={s.founder}>
        <div className={s.founderCopy}>
          <p className={s.kicker}>Who you work with</p>
          <h2 id="team-title" className={s.h2}>
            Built in Iowa. Customized for your business.
          </h2>
          <p className={s.headText}>
            SMB Automation is based in Iowa and founded on a Midwest work ethic. We customize each
            agent specifically to your business. You have access to a real person every step of the
            way. Start your free trial or book a demo today to talk to our team.
          </p>
        </div>
        <div className={s.founderCard}>
          <p className={s.founderCardTitle}>Talk to our team</p>
          <a href={`mailto:${HELLO_EMAIL}`} className={s.contactRow}>
            <span className={`${s.cardIcon} ${s.cardIconBlue}`}>
              <Icon name="chat" size={20} />
            </span>
            <span>
              <span className={s.contactLabel}>Email</span>
              <span className={s.contactValue}>{HELLO_EMAIL}</span>
            </span>
          </a>
          <BookingLink flow="trial" location={location} className={s.btnAccentBlock}>
            Start your free trial
          </BookingLink>
          <BookingLink flow="demo" location={location} className={s.btnOutlineBlock}>
            Book a demo
          </BookingLink>
        </div>
      </div>
    </section>
  );
}

export function FaqSection({
  title,
  faqs,
  anchors = false,
}: {
  title: React.ReactNode;
  faqs: Faq[];
  /** Homepage only: the #faq anchor the footer links to. */
  anchors?: boolean;
}) {
  return (
    <section id={anchors ? 'faq' : undefined} className={`${s.section} ${s.anchor}`} aria-labelledby="faq-title">
      <div className={s.faqWrap}>
        <div className={s.head}>
          <p className={s.kicker}>FAQ</p>
          <h2 id="faq-title" className={s.h2}>
            {title}
          </h2>
        </div>
        <div className={s.faq}>
          {faqs.map((f) => (
            <details key={f.q} className={s.faqItem}>
              <summary>
                <span>{f.q}</span>
                <span className={s.faqIcon} aria-hidden="true">
                  <Icon name="plus" size={18} />
                </span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing({
  title,
  text,
  location,
  anchors = false,
}: {
  title: React.ReactNode;
  text: React.ReactNode;
  location: string;
  /** Homepage only: the #contact anchor. */
  anchors?: boolean;
}) {
  return (
    <section id={anchors ? 'contact' : undefined} className={s.closing} aria-labelledby="closing-title">
      <div className={s.closingCard}>
        <h2 id="closing-title" className={s.closingTitle}>
          {title}
        </h2>
        <p className={s.closingText}>{text}</p>
        <div className={s.closingActions}>
          <BookingLink flow="trial" location={location} className={s.btnAccent}>
            Start your free trial
            <Icon name="arrow" size={18} />
          </BookingLink>
          <BookingLink flow="demo" location={location} className={s.btnOnDark}>
            Book a demo
          </BookingLink>
        </div>
      </div>
    </section>
  );
}
