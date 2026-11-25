import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import {
  Agents,
  Closing,
  Compare,
  FaqSection,
  FloatCard,
  Hero,
  HowItWorks,
  JsonLd,
  Pricing,
  Problem,
  Team,
  WorksWith,
  faqSchema,
  type Agent,
  type Card,
  type CompareRow,
  type Faq,
  type Step,
} from '@/components/sections/Sections';
import { PHONE_DISPLAY, TRIAL_START_COPY } from '@/lib/booking';
import s from '@/components/Site.module.css';

export const metadata: Metadata = {
  title: { absolute: 'AI Phone Answering and Website Chat for Small Businesses | SMB Automation' },
  description:
    'The Front Desk Assistant turns website visitors into booked jobs and answers every call. A Chat Agent and Voice Agent built for your business. Plans from $397/month. 30-day free trial, no credit card required.',
  alternates: { canonical: 'https://smbautomation.io' },
  openGraph: {
    title: 'Every call answered. Every job booked. | SMB Automation',
    description:
      'AI phone answering and website chat that turns your existing calls and traffic into booked customers. 30-day free trial, no setup fee.',
    url: 'https://smbautomation.io',
    siteName: 'SMB Automation',
    type: 'website',
  },
};

/* ---------- Content ---------- */

const CHAT = [
  { from: 'visitor', text: 'We had hail last night. Can someone look at our roof?' },
  { from: 'agent', text: 'Sorry to hear that. We can schedule an inspection. What ZIP code is the property in?' },
  { from: 'visitor', text: '52240. Friday works best.' },
  { from: 'agent', text: 'I have Friday at 10:00 a.m. or 2:30 p.m. Which works for you?' },
  { from: 'visitor', text: 'Let’s do 10. Thank you!' },
] as const;

const PROBLEMS: Card[] = [
  {
    icon: 'voicemail',
    title: 'Voicemail loses the job',
    body: 'A caller who reaches voicemail can try the next shop before you get back to them.',
  },
  {
    icon: 'clock',
    title: 'The callback comes too late',
    body: 'You call back after the job wraps. By then they’ve already booked someone who picked up.',
  },
  {
    icon: 'user',
    title: 'A hire only covers 40 hours',
    body: 'A full-time receptionist covers 40 hours a week. Your phone rings for the other 128.',
  },
];

const STEPS: Step[] = [
  { icon: 'phone', plan: 'All plans', title: 'Answer', body: 'Picks up every call or website chat in your business name, day or night.' },
  { icon: 'calendar', plan: 'All plans', title: 'Book', body: 'Collects the job details and books an open time on your calendar.' },
  { icon: 'bell', plan: 'Front Desk', title: 'Remind', body: 'Texts customers before their appointment so fewer people forget.' },
  { icon: 'star', plan: 'Front Desk', title: 'Ask for a review', body: 'Invites customers to leave an honest Google review after the job.' },
];

const AGENTS: Agent[] = [
  {
    icon: 'phone',
    name: 'Voice Agent',
    lead: 'Answers your business line like a trained front desk who never takes a day off.',
    points: [
      'Answers in your business name, 24/7',
      'Books the job on your calendar',
      'Routes urgent calls straight to you',
      'Texts you a summary after every call',
      'Works with your existing number',
    ],
  },
  {
    icon: 'chat',
    name: 'Chat Agent',
    lead: 'Turns the visitors already on your website into booked appointments.',
    points: [
      'Answers visitor questions instantly',
      'Asks for the details your team needs',
      'Offers open times and books one',
      'Adds the booking to your calendar',
      'Installs with one snippet on your site',
    ],
  },
];

const COMPARE: CompareRow[] = [
  { row: 'Answers nights and weekends', voicemail: false, hire: false, us: true },
  { row: 'Books the job on your calendar', voicemail: false, hire: true, us: true },
  { row: 'Texts you a summary of each call', voicemail: false, hire: 'Sometimes', us: true },
  { row: 'Answers website visitors too', voicemail: false, hire: 'Sometimes', us: 'Chat Agent' },
  { row: 'Monthly cost', voicemail: 'Free', hire: 'Salary, taxes, and benefits', us: 'From $397' },
];

const FAQS: Faq[] = [
  {
    q: 'How does the free trial work?',
    a: `${TRIAL_START_COPY} No credit card required to start. Monthly billing begins after the 30 days unless you cancel.`,
  },
  {
    q: 'Can I keep my current business phone number?',
    a: 'Yes. The Voice Agent works with your existing business number, so customers keep calling the number they already know.',
  },
  {
    q: 'How fast can we go live?',
    a: 'Most clients go live within 48 hours. Custom setups can take longer. You review and approve sample conversations before anything goes live.',
  },
  {
    q: 'What happens with an urgent call?',
    a: 'The Voice Agent can route urgent calls straight to you, and it texts you a summary after every call so nothing slips through.',
  },
  {
    q: 'Is there a contract or setup fee?',
    a: 'No setup fee and no long-term contract. Plans are billed month to month after the free trial.',
  },
  {
    q: 'Can I try the Front Desk Assistant before I sign up?',
    a: `Yes. The chat bubble in the corner of this page is our own Chat Agent, and calling ${PHONE_DISPLAY} reaches our Voice Agent. Ask either one anything, or book a demo for a full walkthrough.`,
  },
];

const offerSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Front Desk Assistant',
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
      <JsonLd data={offerSchema} />
      <JsonLd data={faqSchema(FAQS)} />

      <Hero
        title="Every call answered."
        accent="Every job booked."
        lede="Turn website visitors into booked jobs, and never miss a call with our Front Desk Assistant. Built for you."
        points={['No setup fee', 'Keep your business number', 'Month to month']}
        location="home_hero"
        visual={
          <>
            <figure className={s.chat} aria-label="Example website chat for a roofing company">
              <div className={s.chatTop}>
                <span className={s.chatAvatar} aria-hidden="true">
                  <Icon name="chat" size={18} />
                </span>
                <span className={s.chatWho}>
                  <span className={s.chatName}>Hawkeye Roofing</span>
                  <span className={s.chatStatus}>
                    <span className={s.liveDot} aria-hidden="true" />
                    Chat Agent · online
                  </span>
                </span>
                <span className={s.chatTag}>Example</span>
              </div>
              <ol className={s.chatBody}>
                {CHAT.map((msg) => (
                  <li key={msg.text} className={msg.from === 'visitor' ? s.visitor : s.agent}>
                    <span className="sr-only">{msg.from === 'visitor' ? 'Visitor: ' : 'Chat Agent: '}</span>
                    {msg.text}
                  </li>
                ))}
              </ol>
              <figcaption className="sr-only">
                The Chat Agent books a roof inspection for Friday at 10:00 a.m. and adds it to the
                team’s calendar.
              </figcaption>
            </figure>
            <FloatCard position="top" tone="blue" icon="phone" label="Call answered · 9:42 p.m." text="Urgent leak, routed to owner" />
            <FloatCard position="bottom" tone="green" icon="calendar" label="Booked on your calendar" text="Roof inspection · Fri 10:00 a.m." />
          </>
        }
      />

      <WorksWith />

      <Problem title="Your phone rings 168 hours a week. Who answers when you’re on a job?" problems={PROBLEMS} />

      <HowItWorks
        anchors
        title="From the first ring to the five-star review."
        text="Every plan answers and books. Front Desk adds the follow-up that brings customers back."
        steps={STEPS}
      />

      <Agents title="One Front Desk Assistant. Two agents working for you." agents={AGENTS} />

      <Pricing anchors />

      <Compare title="More coverage than a hire. More than voicemail ever will." rows={COMPARE} />

      <Team location="home_team" />

      <FaqSection anchors title="Questions owners ask first." faqs={FAQS} />

      <Closing
        anchors
        location="home_closing"
        title="Try the Front Desk Assistant free for 30 days."
        text={`Most clients go live within 48 hours. You approve the sample conversations before launch. ${TRIAL_START_COPY}`}
      />
    </>
  );
}
