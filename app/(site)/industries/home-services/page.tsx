import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import ScenarioTabs, { type Scenario } from '@/components/industry/ScenarioTabs';
import {
  Agents,
  Closing,
  Compare,
  Examples,
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
import { TRIAL_START_COPY } from '@/lib/booking';
import ind from '@/components/industry/Industry.module.css';

const URL = 'https://smbautomation.io/industries/home-services';

export const metadata: Metadata = {
  title: { absolute: 'AI Receptionist for Home Services | SMB Automation' },
  description:
    'The Front Desk Assistant answers calls and website chats for HVAC, plumbing, and electrical companies 24/7, books jobs on your calendar, and sends emergencies to your on-call tech. 30-day free trial.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'The furnace quit at 2 AM. We picked up. | SMB Automation',
    description:
      'The Front Desk Assistant for home service companies: a Voice Agent and Chat Agent that answer while your crew is on the job, book service calls, and route emergencies under your rules.',
    url: URL,
    siteName: 'SMB Automation',
    type: 'website',
  },
};

/* ---------- Content ---------- */

const HERO_CALL = [
  { from: 'customer', text: 'Our furnace stopped and it’s 8 degrees out. We have a newborn at home.' },
  { from: 'agent', text: 'I’m sorry, we’ll get someone to you. What’s the address?' },
  { from: 'customer', text: '2210 Linden Drive. The thermostat says 58 inside.' },
  { from: 'agent', text: 'Thank you. I’ll send your request to the on-call technician within a few minutes.' },
] as const;

const PROBLEMS: Card[] = [
  {
    icon: 'voicemail',
    title: 'Voicemail sends them to the next company',
    body: 'A homeowner with no heat doesn’t leave a message. They call the next name on Google until someone answers.',
  },
  {
    icon: 'user',
    title: 'Your techs can’t answer from a crawl space',
    body: 'When the crew is on a job, the phone rings out. The callback happens at 5 p.m., after they booked someone else.',
  },
  {
    icon: 'clock',
    title: 'Emergencies don’t keep business hours',
    body: 'Burst pipes, dead furnaces, and tripped panels happen at night and on weekends, when the office is closed.',
  },
];

const STEPS: Step[] = [
  {
    icon: 'phone',
    plan: 'All plans',
    title: 'Answer',
    body: 'Picks up every call and website chat in your company name, including nights, weekends, and busy season.',
  },
  {
    icon: 'calendar',
    plan: 'All plans',
    title: 'Book and route',
    body: 'Books service calls and estimates on your calendar and sends true emergencies to your on-call tech.',
  },
  {
    icon: 'bell',
    plan: 'Front Desk',
    title: 'Remind',
    body: 'Texts customers before the appointment so the tech isn’t knocking on an empty house.',
  },
  {
    icon: 'star',
    plan: 'Front Desk',
    title: 'Ask for a review',
    body: 'Invites customers to leave an honest Google review once the job is done.',
  },
];

const SCENARIOS: Scenario[] = [
  {
    id: 'no-heat',
    tab: 'No heat emergency',
    channel: 'Voice Agent',
    time: '2:04 a.m.',
    place: 'Cedar Valley HVAC',
    lines: [
      { from: 'customer', text: 'Our furnace stopped and it’s 8 degrees out. We have a newborn at home.' },
      { from: 'agent', text: 'I’m sorry, we’ll get someone to you. What’s the address, and is the furnace making any noise or showing a light?' },
      { from: 'customer', text: '2210 Linden Drive. No noise, and there’s a blinking red light.' },
      { from: 'agent', text: 'Thank you. I’ll send your request to the on-call technician within a few minutes, with your address and the blinking light.' },
    ],
    outcome: {
      icon: 'bell',
      tone: 'urgent',
      label: 'Urgent: routed to on-call',
      title: 'No heat, infant in home · 2210 Linden Dr',
      text: 'The on-call tech gets the address, symptoms, and callback number by call and text.',
    },
  },
  {
    id: 'estimate',
    tab: 'Estimate request',
    channel: 'Chat Agent',
    time: '9:15 p.m.',
    place: 'Website chat · Riverside Plumbing',
    lines: [
      { from: 'customer', text: 'Our water heater is 15 years old and leaking a little. Can someone quote a replacement?' },
      { from: 'agent', text: 'Yes. A technician can look at it and give you options. Is it gas or electric, and is the leak getting worse?' },
      { from: 'customer', text: 'Gas. It’s just a small puddle. Thursday afternoon would work.' },
      { from: 'agent', text: 'Thursday at 1:00 p.m. is open. Can I get your name, address, and phone number to confirm?' },
    ],
    outcome: {
      icon: 'calendar',
      tone: 'booked',
      label: 'Estimate booked',
      title: 'Thursday 1:00 p.m. · Gas water heater replacement',
      text: 'The visit lands on your calendar with the customer’s details and notes on the leak.',
    },
  },
  {
    id: 'service-call',
    tab: 'Service call',
    channel: 'Voice Agent',
    time: '10:40 a.m.',
    place: 'Main line, crew on a job',
    lines: [
      { from: 'customer', text: 'Half the outlets in my kitchen stopped working. I already checked the breaker.' },
      { from: 'agent', text: 'Thanks for checking that. Do you smell anything burning or see any scorch marks?' },
      { from: 'customer', text: 'No, nothing like that. They just don’t work.' },
      { from: 'agent', text: 'Okay. I can get an electrician out tomorrow between 8 and 10 a.m. Does that work?' },
    ],
    outcome: {
      icon: 'calendar',
      tone: 'booked',
      label: 'Job booked',
      title: 'Tomorrow 8 to 10 a.m. · Kitchen outlets out',
      text: 'Booked while your electricians stayed on the job they were already doing.',
    },
  },
  {
    id: 'question',
    tab: 'Customer question',
    channel: 'Chat Agent',
    time: '7:20 p.m.',
    place: 'Website chat · Cedar Valley HVAC',
    lines: [
      { from: 'customer', text: 'Do you service North Liberty? And do you charge for estimates?' },
      { from: 'agent', text: 'Yes, North Liberty is in our service area. Estimates for new equipment are free. Repair visits have a standard trip charge, which the technician applies to the repair if you go ahead.' },
      { from: 'customer', text: 'Good to know, thanks.' },
      { from: 'agent', text: 'You’re welcome. If you’d like, I can book a visit for you now.' },
    ],
    outcome: {
      icon: 'check',
      tone: 'info',
      label: 'Answered from your policies',
      title: 'Service area and estimate questions',
      text: 'Answered on the spot from the pricing and service area details you give us.',
    },
  },
  {
    id: 'reschedule',
    tab: 'Reschedule',
    channel: 'Voice Agent',
    time: '6:55 a.m.',
    place: 'Main line, before the office opens',
    lines: [
      { from: 'customer', text: 'I have a tune-up at 9 today but something came up at work. Can I move it?' },
      { from: 'agent', text: 'Of course. I have Friday at 9:00 a.m. or Monday at 1:00 p.m. Which is better?' },
      { from: 'customer', text: 'Friday at 9.' },
      { from: 'agent', text: 'Done. You’re set for Friday at 9:00 a.m., and you’ll get a reminder text the day before.' },
    ],
    outcome: {
      icon: 'text',
      tone: 'info',
      label: 'Rescheduled',
      title: 'Tune-up moved to Friday 9:00 a.m.',
      text: 'Your calendar updates and your office gets a text summary, so the 9 a.m. slot opens up for someone else.',
    },
  },
];

const AGENTS: Agent[] = [
  {
    icon: 'phone',
    name: 'Voice Agent',
    lead: 'Answers your business line while your crew is under a sink, in an attic, or off the clock.',
    points: [
      'Answers in your company name, 24/7',
      'Books service calls and estimates on your calendar',
      'Routes emergencies to your on-call tech',
      'Texts you a summary after every call',
      'Works with your existing business number',
    ],
  },
  {
    icon: 'chat',
    name: 'Chat Agent',
    lead: 'Turns homeowners browsing your website at night into booked jobs.',
    points: [
      'Answers service area, pricing, and warranty questions',
      'Asks for the details your techs need',
      'Offers open times and books one',
      'Adds the booking to your calendar',
      'Installs with one snippet on your site',
    ],
  },
];

const COMPARE: CompareRow[] = [
  { row: 'Answers nights, weekends, and busy season', voicemail: false, hire: false, us: true },
  { row: 'Sends emergencies to your on-call tech', voicemail: false, hire: 'Office hours only', us: true },
  { row: 'Books the job on your calendar', voicemail: false, hire: true, us: true },
  { row: 'Answers website visitors too', voicemail: false, hire: 'Sometimes', us: 'Chat Agent' },
  { row: 'Monthly cost', voicemail: 'Free', hire: 'Salary, taxes, and benefits', us: 'From $397' },
];

const FAQS: Faq[] = [
  {
    q: 'Does this replace our dispatcher or office manager?',
    a: 'No. The Front Desk Assistant takes the calls and chats your team can’t get to, books the simple ones, and hands off anything that needs a person. Your office stops chasing missed calls and spends that time on the work only they can do.',
  },
  {
    q: 'Who decides what counts as an emergency?',
    a: 'You do. Before launch we set your rules together: what goes straight to the on-call tech (no heat, active leaks, burning smells), what gets booked for the next opening, and what waits for the office. You approve them before anything goes live.',
  },
  {
    q: 'Can it quote prices?',
    a: 'It shares the prices and policies you give it, such as trip charges, free estimates, or maintenance plan pricing. For jobs that need a technician to look first, it books the estimate instead of guessing.',
  },
  {
    q: 'Does it work with our scheduling software?',
    a: 'It books on Google Calendar or Outlook Calendar on every plan. The Multi-Location plan adds CRM and API integrations, so we can connect the tools you already use.',
  },
  {
    q: 'Can customers keep calling our current number?',
    a: 'Yes. The Voice Agent works with your existing business number, so nothing changes for your customers.',
  },
  {
    q: 'How does the free trial work?',
    a: `${TRIAL_START_COPY} No credit card required to start. Monthly billing begins after the 30 days unless you cancel.`,
  },
];

export default function HomeServicesPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />

      <Hero
        title={<>The furnace quit at 2&nbsp;AM.</>}
        accent="We picked up."
        lede="The Front Desk Assistant answers calls and website chats for HVAC, plumbing, and electrical companies 24/7. Jobs land on your calendar. Emergencies reach your on-call tech."
        points={['No setup fee', 'Keep your business number', 'Month to month']}
        location="hs_hero"
        visual={
          <>
            <figure className={ind.callCard} aria-label="Example after-hours no-heat call">
              <div className={ind.callTop}>
                <span className={ind.callAvatar} aria-hidden="true">
                  <Icon name="phone" size={18} />
                </span>
                <span className={ind.callWho}>
                  <span className={ind.callName}>Cedar Valley HVAC</span>
                  <span className={ind.callMeta}>Voice Agent · 2:04 a.m.</span>
                </span>
                <span className={ind.callBars} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
              </div>
              <ol className={ind.lines}>
                {HERO_CALL.map((line) => (
                  <li key={line.text} className={line.from === 'agent' ? ind.lineAgent : ind.lineCustomer}>
                    <span className={ind.lineWho}>{line.from === 'agent' ? 'Voice Agent' : 'Homeowner'}</span>
                    <span className={ind.lineText}>{line.text}</span>
                  </li>
                ))}
              </ol>
              <figcaption className="sr-only">
                The Voice Agent collects the address and alerts the on-call technician about a furnace outage.
              </figcaption>
            </figure>
            <FloatCard position="top" tone="red" icon="bell" label="Urgent · routed to on-call" text="No heat · 2210 Linden Dr" />
            <FloatCard position="bottom" tone="green" icon="calendar" label="Estimate booked" text="Thu 1:00 p.m. · Water heater" />
          </>
        }
      />

      <WorksWith />

      <Problem
        title="Your phone rings 168 hours a week. Your crew is on a job for most of them."
        problems={PROBLEMS}
      />

      <HowItWorks
        title="From the first ring to the five-star review."
        text="Every plan answers, books, and routes. Front Desk adds the reminders and review requests that keep your schedule full."
        steps={STEPS}
      />

      <Examples
        title="Five calls your crew won’t have to stop for this week."
        text="Everyday situations from heating, plumbing, and electrical companies. Pick one to see how the Voice Agent and Chat Agent handle it, and where each one ends up."
      >
        <ScenarioTabs scenarios={SCENARIOS} customerLabel="Caller" />
      </Examples>

      <Agents tinted title="One Front Desk Assistant. Two agents working while you’re on the job." agents={AGENTS} />

      <Pricing locationPrefix="hs_" />

      <Compare title="More coverage than a hire. More than voicemail ever will." rows={COMPARE} />

      <Team location="hs_team" />

      <FaqSection title="Questions contractors ask first." faqs={FAQS} />

      <Closing
        location="hs_closing"
        title="Try it on your own phone line for 30 days."
        text={`Most clients go live within 48 hours. You approve the call rules before launch. ${TRIAL_START_COPY}`}
      />
    </>
  );
}
