import type { Metadata } from 'next';
import IndustryPage, { type IndustryData } from '@/components/IndustryPage';

export const metadata: Metadata = {
  title: 'Home Services Automation',
  description:
    'Business Efficiency Audits for home and local service companies: call capture, lead response, estimating, scheduling, dispatch, reviews, invoicing, and customer reactivation.',
  alternates: { canonical: 'https://smbautomation.io/home-services-automation' },
};

const data: IndustryData = {
  slug: 'home-services-automation',
  eyebrow: 'HOME AND LOCAL SERVICES',
  h1: 'Find the work your service business should stop doing',
  h1Em: 'manually.',
  subhead:
    'Your day runs on the phone, the field service app, and a whiteboard. Missed calls become missed jobs, estimates go out and never get chased, and follow-up happens when someone remembers. We analyze how work moves through your business and give you a prioritized plan for fixing it with automation, AI, and the tools you already own.',
  serviceName: 'Home Services Automation Audit',
  serviceDescription:
    'A Business Efficiency Audit for home and local service companies: workflow inventory across call capture, estimating, scheduling, dispatch, invoicing, and retention, with a ranked opportunity scorecard, ROI estimates, and a 90-day roadmap.',
  stats: [
    { value: '13 years', label: 'Building and operating businesses' },
    { value: '$24K to $25M', label: 'ARR scaled at a health-tech company' },
    { value: '$200M', label: 'Real estate portfolio operated' },
    { value: '1,400+', label: 'Units under management' },
  ],
  problemsIntro: 'The friction shows up in the same places at almost every service company.',
  problems: [
    'Calls that go to voicemail while the caller dials the next company on the list',
    'Leads from the website, Google, and referrals landing in different inboxes',
    'Estimates that go out and never get a follow-up',
    'Scheduling and dispatch that requires constant calls and texts',
    'Review requests that happen only when someone remembers',
    'Invoices that require manual follow-up to get paid',
    'Past customers who never hear from you again after the job closes',
  ],
  opportunitiesIntro: 'Opportunities we typically find in home and local service companies.',
  opportunities: [
    {
      title: 'Call capture and lead response',
      body: 'Every call answered or instantly texted back, every web lead responded to in minutes, and everything logged in one pipeline.',
    },
    {
      title: 'Estimate follow-up',
      body: 'A tracked sequence that chases every open estimate automatically, recovering jobs that silence was losing.',
    },
    {
      title: 'Scheduling and dispatch',
      body: 'Self-serve booking where it fits, automated confirmations and reminders, and dispatch updates without the phone tag.',
    },
    {
      title: 'Reviews and reputation',
      body: 'Review requests that fire after every completed job, building the Google presence that wins the next customer.',
    },
    {
      title: 'Invoicing and payments',
      body: 'Invoices that send on completion and remind on a schedule, shortening the gap between finishing work and getting paid.',
    },
    {
      title: 'Customer reactivation',
      body: 'Seasonal and maintenance-based campaigns that bring past customers back without manual list-pulling.',
    },
  ],
  founderShort:
    'I spent 13 years starting, scaling, and running businesses, from a health-tech company that grew to a Fortune 500 acquisition to a $200 million real estate operation where field work, scheduling, and customer communication had to run every single day. I have owned the operational numbers a service business lives on.',
  faqs: [
    {
      q: 'Do you work with our field service software?',
      a: 'Yes. The audit is built around your existing stack, whether that is ServiceTitan, Jobber, Housecall Pro, or spreadsheets and a whiteboard. We recommend new tools only when they clearly beat what you own.',
    },
    {
      q: 'We are busy in season. When should we do this?',
      a: 'The audit takes 60 to 90 minutes of your time plus a questionnaire. Most owners run it in season, because that is when the friction is visible, then implement in the shoulder season.',
    },
    {
      q: 'Is this just about answering the phone?',
      a: 'Call capture is usually one finding, not the whole story. Estimating, scheduling, invoicing, reviews, and reactivation typically hold as much value.',
    },
    {
      q: 'What if we only have one obvious problem?',
      a: 'If you already know exactly which process is broken, the $495 Single Workflow Audit covers one defined workflow in five business days and may be the faster starting point.',
    },
    {
      q: 'What does it cost and how fast is it?',
      a: '$1,500 fixed, delivered within seven business days after discovery, with a findings guarantee: if we do not identify at least $15,000 in annualized opportunity, we refund the fee and you keep the roadmap.',
    },
  ],
};

export default function HomeServicesPage() {
  return <IndustryPage data={data} />;
}
