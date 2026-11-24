import type { Metadata } from 'next';
import BookingLink from '@/components/BookingLink';
import { TRIAL_START_COPY } from '@/lib/booking';
import m from '@/components/Marketing.module.css';
import s from './page.module.css';

export const metadata: Metadata = {
  title: { absolute: 'AI Phone Answering and Website Chat for Small Businesses | SMB Automation' },
  description:
    'AI phone answering and website chat that books jobs while you work. Plans from $397/month. Start a 30-day free trial or book a demo.',
  alternates: { canonical: 'https://smbautomation.io' },
  openGraph: {
    title: 'Are you the reason you aren’t booking more jobs? | SMB Automation',
    description:
      'AI phone answering and website chat that turns your existing traffic into booked customers. 30-day free trial, no setup fee.',
    url: 'https://smbautomation.io',
    siteName: 'SMB Automation',
    type: 'website',
  },
};

const CHAT = [
  { from: 'visitor', text: 'We had hail last night. Can someone look at our roof?' },
  { from: 'agent', text: 'We can schedule an inspection. What ZIP code is the property in?' },
  { from: 'visitor', text: '52240. Friday works best.' },
  { from: 'agent', text: 'I have Friday at 10:00 a.m. or 2:30 p.m. Which works for you?' },
  { from: 'visitor', text: 'Let’s do 10. Thank you!' },
] as const;

const TRIAL_STEPS = [
  { label: 'Your details', value: 'Name, email, phone number, and business website' },
  { label: 'Trial terms', value: 'Review what the 30-day trial includes' },
  { label: 'Onboarding call', value: 'Pick a time. Booking it starts your trial' },
];

const PROBLEMS = [
  {
    title: 'Voicemail',
    body: 'A caller who reaches voicemail can try the next shop before you get back to them.',
  },
  {
    title: 'The callback',
    body: 'You call back after the job wraps. By then they’ve already booked someone who picked up.',
  },
  {
    title: 'The front desk hire',
    body: 'A full-time receptionist covers 40 hours a week. Your phone rings for the other 128.',
  },
];

const STEPS = [
  { plan: 'All plans', title: 'Answer', body: 'Answer by phone, website chat, or both, depending on your plan.' },
  { plan: 'All plans', title: 'Book', body: 'Collect the job details and book an open time on your calendar.' },
  { plan: 'Front Desk', title: 'Remind', body: 'Send customers a text before their appointment.' },
  { plan: 'Front Desk', title: 'Ask for a review', body: 'Invite customers to leave a Google review after the job.' },
];

const PLANS = [
  {
    name: 'Answer',
    who: 'Solo operators and small teams',
    price: '$397',
    features: [
      'Voice Agent or Chat Agent',
      '24/7 answering and booking',
      'Voice option includes urgent-call routing',
      'Voice option includes text summaries',
      'Keep your existing business number for voice',
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
      'Voice + Chat Agent',
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

const offerSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Front Desk Assistant',
  serviceType: 'AI phone answering and website chat',
  provider: { '@type': 'Organization', name: 'SMB Automation', url: 'https://smbautomation.io' },
  areaServed: { '@type': 'Country', name: 'United States' },
  offers: [
    { '@type': 'Offer', name: 'Answer', price: '397', priceCurrency: 'USD', description: 'Voice Agent or Chat Agent, billed monthly' },
    { '@type': 'Offer', name: 'Front Desk', price: '797', priceCurrency: 'USD', description: 'Voice and Chat Agent, billed monthly' },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
      />

      {/* ---------- Hero ---------- */}
      <section className={m.hero}>
        <div className={m.heroCopy}>
          <p className={m.eyebrow}>AI phone answering &amp; website chat</p>
          <h1 className={m.h1}>Are you the reason you aren&apos;t booking more jobs?</h1>
          <p className={m.sub}>
            Sign up for a free trial of our Front Desk Assistant: convert your existing website
            traffic to booked customers and never miss a phone call again.
          </p>

          <div className={s.start}>
            <p className={s.startHead}>How the free trial starts</p>
            <ol className={s.startSteps}>
              {TRIAL_STEPS.map((step, i) => (
                <li key={step.label}>
                  <span className={s.startNum}>{i + 1}</span>
                  <span className={s.startText}>
                    <span className={s.startLabel}>{step.label}</span>
                    {step.value}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className={s.heroActions}>
            <BookingLink flow="trial" location="home_hero" className={m.btnBlock}>
              I&apos;m ready to book more jobs
            </BookingLink>
            <BookingLink flow="demo" location="home_hero" className={s.demoLink}>
              Book a demo
            </BookingLink>
            <p className={m.fine}>
              {TRIAL_START_COPY} Add a card at onboarding. Monthly billing begins after the trial
              unless you cancel.
            </p>
          </div>
        </div>

        <div className={m.heroAside}>
          <figure className={s.chat} aria-label="Example website chat for a roofing company">
            <div className={s.chatTop}>
              <span className={s.chatName}>Hawkeye Roofing</span>
              <span className={s.chatTag}>Example website chat</span>
            </div>
            <ol className={s.chatBody}>
              {CHAT.map((msg) => (
                <li key={msg.text} className={msg.from === 'visitor' ? s.visitor : s.agent}>
                  <span className="sr-only">{msg.from === 'visitor' ? 'Visitor: ' : 'Assistant: '}</span>
                  {msg.text}
                </li>
              ))}
            </ol>
            <figcaption className={s.chatFoot}>
              <span className={s.chatFootLabel}>After the customer books</span>
              <span className={s.chatFootTitle}>Roof inspection · Friday, 10:00 a.m.</span>
              <span className={s.chatFootText}>The time and job details appear on the team’s calendar.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------- Problem ---------- */}
      <section className={m.section} aria-labelledby="problem-title">
        <div className={m.sectionHead}>
          <h2 id="problem-title" className={m.h2}>
            Who answers when you’re already on a job?
          </h2>
          <p className={m.tag}>The problem</p>
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

      {/* ---------- How it works ---------- */}
      <section id="how-it-works" className={`${m.band} ${s.anchor}`} aria-labelledby="how-title">
        <div className={m.bandHead}>
          <h2 id="how-title" className={m.bandTitle}>
            From the first question to the follow-up.
          </h2>
          <p className={m.bandIntro}>
            Choose the follow-up your team needs. Front Desk adds reminders and review requests.
            Custom plans can also follow up on open invoices.
          </p>
        </div>
        <div className={m.cols4}>
          {STEPS.map((step) => (
            <div key={step.title}>
              <span className={m.bandLabel}>{step.plan}</span>
              <h3 className={m.bandColTitle}>{step.title}</h3>
              <p className={m.bandBody}>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Pricing ---------- */}
      <section id="pricing" className={`${m.section} ${s.anchor}`} aria-labelledby="pricing-title">
        <div className={s.pricingHead}>
          <h2 id="pricing-title" className={m.h2}>
            Priced like software. Built for you.
          </h2>
          <p className={s.pricingTerms}>30-day free trial · No setup fee · Month to month</p>
        </div>
        <div className={s.plans}>
          {PLANS.map((plan) => (
            <article key={plan.name} className={plan.featured ? `${s.plan} ${s.planFeatured}` : s.plan}>
              <div className={s.planHead}>
                <div className={s.planNameRow}>
                  <h3 className={s.planName}>{plan.name}</h3>
                  {plan.badge && <span className={s.badge}>{plan.badge}</span>}
                </div>
                <p className={s.planWho}>{plan.who}</p>
              </div>
              <p className={s.price}>
                <span className={s.priceValue}>{plan.price}</span>
                {plan.price !== 'Custom' && <span className={s.per}>/month</span>}
              </p>
              <ul className={s.features}>
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <BookingLink
                flow={plan.cta.flow}
                location={`pricing_${plan.name.toLowerCase().replace(/\s+/g, '_')}`}
                className={plan.featured ? s.planCtaFeatured : s.planCta}
              >
                {plan.cta.label}
              </BookingLink>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section id="contact" className={m.closing} aria-labelledby="closing-title">
        <div className={m.closingCopy}>
          <h2 id="closing-title" className={m.closingTitle}>
            Try your own AI front desk for 30 days.
          </h2>
          <p className={m.closingText}>
            Most clients go live within 48 hours. Custom setups can take longer. You approve the
            sample conversations before launch. {TRIAL_START_COPY}
          </p>
        </div>
        <div className={m.closingActions}>
          <BookingLink flow="trial" location="home_closing" className={m.btnPrimary}>
            I&apos;m ready to book more jobs
          </BookingLink>
          <BookingLink flow="demo" location="home_closing" className={m.closingLink}>
            Book a demo
          </BookingLink>
        </div>
      </section>
    </>
  );
}
