import type { Metadata } from 'next';
import IndustryPage, { type IndustryData } from '@/components/IndustryPage';

export const metadata: Metadata = {
  title: 'Healthcare Automation',
  description:
    'Business Efficiency Audits for healthcare and wellness practices: patient intake, appointments and reminders, lab and refill workflows, retention, and administrative work. Scoped around privacy and compliance requirements.',
  alternates: { canonical: 'https://smbautomation.io/healthcare-automation' },
};

const data: IndustryData = {
  slug: 'healthcare-automation',
  eyebrow: 'HEALTHCARE AND WELLNESS',
  h1: 'Find the work your practice should stop doing',
  h1Em: 'manually.',
  subhead:
    'Your team juggles the EHR, the scheduling system, the phone, and a fax machine that refuses to die. Every manual handoff costs staff time and patient experience. We analyze how work moves through your practice and give you a prioritized plan for fixing it, scoped around privacy and compliance requirements from day one.',
  serviceName: 'Healthcare Automation Audit',
  serviceDescription:
    'A Business Efficiency Audit for healthcare and wellness practices: workflow inventory across intake, scheduling, clinical support, and administration, with a ranked opportunity scorecard, ROI estimates, and a 90-day roadmap. Scoped around privacy and compliance requirements.',
  stats: [
    { value: '$24K to $25M', label: 'ARR scaled at a health-tech company' },
    { value: '13 years', label: 'Building and operating businesses' },
    { value: '$200M', label: 'Real estate portfolio operated' },
    { value: '1,400+', label: 'Units under management' },
  ],
  problemsIntro: 'The friction shows up in the same places at almost every practice.',
  problems: [
    'New patient inquiries that wait hours for a response while the caller books elsewhere',
    'Intake forms completed on paper and retyped into the EHR',
    'No-shows that a reminder sequence would have prevented',
    'Refill and lab follow-up tracked in someone’s memory or a sticky note',
    'Patients who lapse after a first visit because nobody re-engages them',
    'Reporting that requires manual exports from the EHR and billing system',
    'Front desk staff answering the same ten questions all day',
  ],
  opportunitiesIntro: 'Opportunities we typically find in healthcare and wellness practices.',
  opportunities: [
    {
      title: 'Patient and lead intake',
      body: 'Digital intake that flows into your systems without retyping, and inquiry response that happens in minutes instead of hours.',
    },
    {
      title: 'Appointments and reminders',
      body: 'Self-serve scheduling where appropriate, plus reminder sequences that measurably cut no-shows.',
    },
    {
      title: 'Lab and refill workflows',
      body: 'Structured follow-up queues so results and refills never depend on one person remembering.',
    },
    {
      title: 'Retention and reactivation',
      body: 'Automated recall and re-engagement for lapsed patients, built around your visit cadence.',
    },
    {
      title: 'Administrative workflows',
      body: 'Document processing, referral tracking, and reporting that runs on a schedule instead of consuming staff hours.',
    },
  ],
  founderShort:
    'I was an early employee at a health-tech company that grew from roughly $24,000 in annual recurring revenue to more than $25 million before a Fortune 500 acquisition. I have built technology inside healthcare, which means the audit is scoped around privacy and compliance realities from the start, not bolted on afterward.',
  faqs: [
    {
      q: 'How do you handle HIPAA and patient privacy?',
      a: 'The audit itself does not require access to patient records; we analyze workflows, not charts. Every recommendation is scoped around privacy and compliance requirements, including whether a tool will sign a business associate agreement.',
    },
    {
      q: 'Do you work with our EHR?',
      a: 'The audit is vendor-neutral and built around your existing systems. We first look at what your EHR and practice management tools can already do, then recommend additions only where they provide a meaningful advantage.',
    },
    {
      q: 'We are a wellness business, not a medical practice. Does this still apply?',
      a: 'Yes. Med spas, therapy practices, chiropractic, dental, and fitness businesses share the same core workflows: intake, scheduling, reminders, retention, and reporting.',
    },
    {
      q: 'Will AI be making clinical decisions?',
      a: 'No. Clinical judgment stays human. The audit targets administrative and communication workflows, and part of every audit is deciding what should not be automated.',
    },
    {
      q: 'What does it cost and how fast is it?',
      a: '$1,500 fixed, delivered within seven business days after discovery, with a findings guarantee: if we do not identify at least $15,000 in annualized opportunity, we refund the fee and you keep the roadmap.',
    },
  ],
};

export default function HealthcarePage() {
  return <IndustryPage data={data} />;
}
