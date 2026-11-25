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

const URL = 'https://smbautomation.io/industries/property-management';

export const metadata: Metadata = {
  title: { absolute: 'AI Receptionist for Property Management | SMB Automation' },
  description:
    'The Front Desk Assistant answers maintenance calls, leasing inquiries, and resident questions 24/7, routes emergencies to your on-call team, and books showings. 30-day free trial.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'Tenant calls at 11 PM. We handle it. | SMB Automation',
    description:
      'The Front Desk Assistant for property managers: a Voice Agent and Chat Agent for maintenance intake, leasing calls, and resident questions, routed under your rules.',
    url: URL,
    siteName: 'SMB Automation',
    type: 'website',
  },
};

/* ---------- Content ---------- */

const HERO_CALL = [
  { from: 'customer', text: 'There’s water coming out from under my kitchen sink and it won’t stop.' },
  { from: 'agent', text: 'I’m sorry, let’s get this handled. Which building and unit are you in?' },
  { from: 'customer', text: 'Building B, unit 204.' },
  { from: 'agent', text: 'Thank you. If you can, turn the valve under the sink to the right. I’m alerting the on-call team now.' },
] as const;

const PROBLEMS: Card[] = [
  {
    icon: 'clock',
    title: 'Emergencies don’t wait for 9 a.m.',
    body: 'A leak at midnight becomes drywall, flooring, and an insurance claim by morning if nobody picks up.',
  },
  {
    icon: 'building',
    title: 'Leasing leads shop at night',
    body: 'Prospects browse listings after work. The first property that answers usually gets the showing.',
  },
  {
    icon: 'chat',
    title: 'The same ten questions, every day',
    body: 'Rent portal, guest parking, pet policy, move-out steps. Your team answers them on repeat.',
  },
];

const STEPS: Step[] = [
  {
    icon: 'phone',
    plan: 'All plans',
    title: 'Answer',
    body: 'Picks up every resident, prospect, and vendor call or chat in your company name, day or night.',
  },
  {
    icon: 'calendar',
    plan: 'All plans',
    title: 'Route and book',
    body: 'Sends emergencies to your on-call contact and books showings on your leasing calendar.',
  },
  {
    icon: 'bell',
    plan: 'Front Desk',
    title: 'Remind',
    body: 'Texts prospects before their showing so fewer people forget to come.',
  },
  {
    icon: 'star',
    plan: 'Front Desk',
    title: 'Ask for a review',
    body: 'Invites residents to leave a Google review after a move-in or a finished repair.',
  },
];

const SCENARIOS: Scenario[] = [
  {
    id: 'leak',
    tab: 'Emergency maintenance',
    channel: 'Voice Agent',
    time: '11:12 p.m.',
    place: 'Ridgeview Apartments',
    lines: [
      { from: 'customer', text: 'There’s water coming out from under my kitchen sink and it won’t stop.' },
      { from: 'agent', text: 'I’m sorry, let’s get this handled. Which building and unit are you in?' },
      { from: 'customer', text: 'Building B, unit 204. It’s pooling on the floor.' },
      { from: 'agent', text: 'Thank you. If you can, turn the valve under the sink to the right to shut off the water. I’m alerting the on-call team now, and they’ll call you back at this number.' },
    ],
    outcome: {
      icon: 'bell',
      tone: 'urgent',
      label: 'Urgent: routed to on-call',
      title: 'Active leak · Building B, unit 204',
      text: 'The on-call contact gets the unit, issue, and callback number by call and text.',
    },
  },
  {
    id: 'showing',
    tab: 'Leasing inquiry',
    channel: 'Chat Agent',
    time: '9:40 p.m.',
    place: 'Website chat · Maple Court',
    lines: [
      { from: 'customer', text: 'Do you have any 2 bedrooms open for March? I have a dog.' },
      { from: 'agent', text: 'Yes. We have a 2 bedroom available March 1. Dogs under 50 lbs are welcome with a pet deposit. Would you like to tour it?' },
      { from: 'customer', text: 'Yes, Saturday morning if possible.' },
      { from: 'agent', text: 'Saturday at 11:00 a.m. is open. Can I get your name and phone number to confirm?' },
    ],
    outcome: {
      icon: 'calendar',
      tone: 'booked',
      label: 'Showing booked',
      title: 'Saturday 11:00 a.m. · 2 bedroom, Maple Court',
      text: 'The showing lands on your leasing calendar with the prospect’s contact info and pet details.',
    },
  },
  {
    id: 'dishwasher',
    tab: 'Routine repair',
    channel: 'Voice Agent',
    time: '8:05 p.m.',
    place: 'Oak Street Townhomes',
    lines: [
      { from: 'customer', text: 'My dishwasher isn’t draining. It’s not an emergency, I just want it looked at.' },
      { from: 'agent', text: 'Got it. What’s your address and unit number?' },
      { from: 'customer', text: '1418 Oak Street, unit 3. Mornings are best for me.' },
      { from: 'agent', text: 'Thanks. I’ve passed this to maintenance with your note about mornings. The office will follow up tomorrow to schedule it.' },
    ],
    outcome: {
      icon: 'text',
      tone: 'info',
      label: 'Logged for the morning',
      title: 'Dishwasher not draining · 1418 Oak St, unit 3',
      text: 'No overnight page. Your office gets a text summary to schedule during business hours.',
    },
  },
  {
    id: 'question',
    tab: 'Resident question',
    channel: 'Chat Agent',
    time: '6:30 p.m.',
    place: 'Website chat · Ridgeview Apartments',
    lines: [
      { from: 'customer', text: 'Where do my guests park this weekend?' },
      { from: 'agent', text: 'Guests can park in any spot marked Visitor along the north lot for up to 48 hours. No permit is needed.' },
      { from: 'customer', text: 'Perfect, and how do I pay rent online?' },
      { from: 'agent', text: 'You can pay through the resident portal. Here’s the link to sign in.' },
    ],
    outcome: {
      icon: 'check',
      tone: 'info',
      label: 'Answered from your policies',
      title: 'Parking and rent portal questions',
      text: 'Answered on the spot from the policies you give us. No staff time needed.',
    },
  },
  {
    id: 'vendor',
    tab: 'Owner or vendor call',
    channel: 'Voice Agent',
    time: '2:15 p.m.',
    place: 'Main office line',
    lines: [
      { from: 'customer', text: 'Hi, this is Mike from Precision Plumbing about an invoice for the Elm Street job.' },
      { from: 'agent', text: 'Thanks, Mike. Invoices go to our accounting contact. Let me connect you.' },
    ],
    outcome: {
      icon: 'phone',
      tone: 'info',
      label: 'Transferred',
      title: 'Vendor invoice · routed to accounting',
      text: 'Owner and vendor calls go to the people you choose, not the leasing line.',
    },
  },
];

const AGENTS: Agent[] = [
  {
    icon: 'phone',
    name: 'Voice Agent',
    lead: 'Answers your office line for residents, prospects, owners, and vendors, any hour.',
    points: [
      'Answers in your company name, 24/7',
      'Collects the unit, issue, and callback number',
      'Routes emergencies to your on-call contact',
      'Texts your office a summary after every call',
      'Works with your existing office number',
    ],
  },
  {
    icon: 'chat',
    name: 'Chat Agent',
    lead: 'Turns the renters browsing your listings tonight into booked showings.',
    points: [
      'Answers availability, pricing, and pet questions',
      'Books showings on your leasing calendar',
      'Answers parking, portal, and move-out questions',
      'Takes maintenance requests from residents',
      'Installs with one snippet on your site',
    ],
  },
];

const COMPARE: CompareRow[] = [
  { row: 'Answers maintenance calls after hours', voicemail: false, hire: false, us: true },
  { row: 'Sends emergencies to your on-call contact', voicemail: false, hire: 'Office hours only', us: true },
  { row: 'Books showings on your calendar', voicemail: false, hire: true, us: true },
  { row: 'Answers leasing questions on your website', voicemail: false, hire: 'Sometimes', us: 'Chat Agent' },
  { row: 'Monthly cost', voicemail: 'Free', hire: 'Salary, taxes, and benefits', us: 'From $397' },
];

const FAQS: Faq[] = [
  {
    q: 'Does this replace our on-call maintenance team?',
    a: 'No. The Front Desk Assistant answers the call, collects the details, and routes real emergencies to your on-call contact. Your team still does the repair. They just stop fielding every call to find the urgent ones.',
  },
  {
    q: 'Who decides what counts as an emergency?',
    a: 'You do. Before launch we set your routing rules together: which issues reach the on-call contact, which wait for the morning, and who handles owner and vendor calls. You approve them before anything goes live.',
  },
  {
    q: 'Can it answer leasing questions about availability and pricing?',
    a: 'Yes, from the listing details and policies you provide during setup. It books showings on your calendar so prospects can pick a time without waiting for a callback.',
  },
  {
    q: 'We manage several properties. Can each one be handled differently?',
    a: 'Yes. Each property can have its own details, policies, and on-call contact. The Multi-Location plan adds separate call flows per location for larger portfolios.',
  },
  {
    q: 'Can residents keep calling our current office number?',
    a: 'Yes. The Voice Agent works with your existing business number, so nothing changes for residents or prospects.',
  },
  {
    q: 'How does the free trial work?',
    a: `${TRIAL_START_COPY} No credit card required to start. Monthly billing begins after the 30 days unless you cancel.`,
  },
];

export default function PropertyManagementPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />

      <Hero
        title={<>Tenant calls at 11&nbsp;PM.</>}
        accent="We handle it."
        lede="The Front Desk Assistant answers maintenance calls, leasing questions, and resident requests 24/7. Emergencies reach your on-call team. Showings land on your calendar."
        points={['No setup fee', 'Keep your office number', 'Month to month']}
        location="pm_hero"
        visual={
          <>
            <figure className={ind.callCard} aria-label="Example after-hours maintenance call">
              <div className={ind.callTop}>
                <span className={ind.callAvatar} aria-hidden="true">
                  <Icon name="phone" size={18} />
                </span>
                <span className={ind.callWho}>
                  <span className={ind.callName}>Ridgeview Apartments</span>
                  <span className={ind.callMeta}>Voice Agent · 11:12 p.m.</span>
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
                    <span className={ind.lineWho}>{line.from === 'agent' ? 'Voice Agent' : 'Resident'}</span>
                    <span className={ind.lineText}>{line.text}</span>
                  </li>
                ))}
              </ol>
              <figcaption className="sr-only">
                The Voice Agent collects the unit and alerts the on-call team about an active leak.
              </figcaption>
            </figure>
            <FloatCard position="top" tone="red" icon="bell" label="Urgent · routed to on-call" text="Active leak · Bldg B, #204" />
            <FloatCard position="bottom" tone="green" icon="calendar" label="Showing booked" text="Sat 11:00 a.m. · 2 bed, Maple Ct" />
          </>
        }
      />

      <WorksWith />

      <Problem
        title="Your office line rings 168 hours a week. Who answers at midnight?"
        problems={PROBLEMS}
        hireLabel="Office staff"
      />

      <HowItWorks
        title="From the midnight leak to the signed lease."
        text="Every plan answers, routes, and books. Front Desk adds the reminders and review requests that keep units full."
        steps={STEPS}
      />

      <Examples
        title="Five calls your team won’t have to take this week."
        text="Everyday situations from a property management office. Pick one to see how the Voice Agent and Chat Agent handle it, and where each one ends up."
      >
        <ScenarioTabs scenarios={SCENARIOS} customerLabel="Caller" />
      </Examples>

      <Agents tinted title="One Front Desk Assistant for your whole portfolio." agents={AGENTS} />

      <Pricing locationPrefix="pm_" />

      <Compare
        title="More coverage than office hours. Fewer calls for your on-call tech."
        rows={COMPARE}
        hireLabel="Office staff"
      />

      <Team location="pm_team" />

      <FaqSection title="Questions property managers ask first." faqs={FAQS} />

      <Closing
        location="pm_closing"
        title="Try it with your own properties for 30 days."
        text={`Most clients go live within 48 hours. You approve the routing rules before launch. ${TRIAL_START_COPY}`}
      />
    </>
  );
}
