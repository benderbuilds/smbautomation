import type { Metadata } from 'next';
import Link from 'next/link';
import BookingLink from '@/components/BookingLink';
import { INDUSTRIES } from '@/lib/industries';
import { industryContent } from '@/lib/industryContent';
import HomeSample from '@/components/HomeSample';
import ExamplesStrip from '@/components/ExamplesStrip';
import { TrialActions } from '@/components/IndustryPage';
import s from '@/components/FrontDesk.module.css';
import p from './page.module.css';

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


const PLANS = [
  {
    name: 'Answer',
    who: 'Phone answering or website chat',
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
    who: 'Phone answering and website chat',
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
    <div className={p.home}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }} />
      <section className={p.hero}>
        <div className={p.heroCopy}>
          <p className={p.product}>AI phone answering &amp; website chat</p>
          <h1>Are you the reason you aren&apos;t booking <span>more jobs?</span></h1>
          <p className={p.lede}>Sign up for a free trial of our Front Desk Assistant: convert your existing website traffic to booked customers and never miss a phone call again.</p>
          <TrialActions location="home_hero" />
          <p className={s.fine}>Trial starts when you book onboarding. Card added at onboarding. Cancel before day 30 to avoid billing.</p>
        </div>
        <HomeSample chat={industryContent.roofers.example} phone={industryContent.hvac.example} />
      </section>
      <section id="how-it-works" className={s.section}><span id="automation" />
        <h2>What your front desk handles</h2><p className={s.sectionIntro}>We set it up. You approve the answers before your customers reach the assistant.</p>
        <div className={s.services}>
          <article><h3>Answer incoming calls</h3><p>An AI voice assistant picks up, answers questions using your business information, and routes urgent calls to the person you choose.</p></article>
          <article><h3>Capture website leads</h3><p>A chat widget answers visitors while they’re on your site. It asks what they need and collects their contact details.</p></article>
          <article><h3>Book the next step</h3><p>Offer an open time on your calendar or hand your team a callback request with the details. Front Desk also sends appointment reminders.</p></article>
        </div>
      </section>
      <section id="industries" className={`${s.section} ${s.directorySection}`}><div>
        <h2>Find your industry</h2><p className={s.sectionIntro}>See the calls, questions, and bookings your assistant can handle for your business.</p>
        </div><ul className={s.directory}>{INDUSTRIES.map(item =>
          <li key={item.href}><Link href={item.href}><strong>{item.label}</strong><span>{item.summary}</span><b aria-hidden="true">↗</b></Link></li>)}</ul>
      </section>
      <ExamplesStrip />
      <section id="pricing" className={s.section}><span id="services" />
        <h2>Choose phone, chat, or both.</h2>
        <p className={s.sectionIntro}>30-day free trial. No setup fee. Month to month.</p>
        <div className={p.plans}>{PLANS.map(plan =>
          <article key={plan.name} className={p.plan}>
            <h3>{plan.name}</h3><p>{plan.who}</p>
            <strong className={p.price}>{plan.price}{plan.price !== 'Custom' && <small>/month</small>}</strong>
            <ul>{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
            <BookingLink flow={plan.cta.flow} location={`pricing_${plan.name.toLowerCase().replace(/\s+/g, '_')}`} className={plan.featured ? s.primary : s.secondary}>{plan.cta.label}</BookingLink>
          </article>)}</div>
      </section>
      <section id="contact" className={s.closing}><div><h2>Try your own front desk for 30 days.</h2>
        <p>We set up your answers, calendar, and call routing. You review sample conversations before your customers reach the assistant.</p>
      </div><TrialActions location="home_closing" /></section>
    </div>
  );
}
