import type { Metadata } from 'next';
import IndustryPage, { type IndustryData } from '@/components/IndustryPage';

export const metadata: Metadata = {
  title: 'Property Management Automation',
  description:
    'Business Efficiency Audits for property management companies: leasing lead response, maintenance intake, renewals, delinquency, owner reporting, and resident onboarding. Built by an operator who ran a $200M portfolio.',
  alternates: { canonical: 'https://smbautomation.io/property-management-automation' },
};

const data: IndustryData = {
  slug: 'property-management-automation',
  eyebrow: 'PROPERTY MANAGEMENT',
  h1: 'Find the work your property management company should stop doing',
  h1Em: 'manually.',
  subhead:
    'Your team lives in the property management system, spreadsheets, a shared inbox, and a phone that never stops. Leasing, maintenance, accounting, and resident support all have to work at once. We analyze how work actually moves through your portfolio and give you a prioritized plan for fixing the friction with automation, AI, and the tools you already own.',
  serviceName: 'Property Management Automation Audit',
  serviceDescription:
    'A Business Efficiency Audit for property management companies: workflow inventory across leasing, maintenance, accounting, and resident services, with a ranked opportunity scorecard, ROI estimates, and a 90-day roadmap.',
  stats: [
    { value: '$200M', label: 'Real estate portfolio operated' },
    { value: '1,400+', label: 'Units under management' },
    { value: '13 years', label: 'Building and operating businesses' },
    { value: '$24K to $25M', label: 'ARR scaled at a health-tech company' },
  ],
  problemsIntro: 'The friction shows up in the same places at almost every property management company.',
  problems: [
    'Leasing leads that wait hours for a first response while the prospect tours a competitor',
    'Tour scheduling that takes three emails and still no-shows',
    'Maintenance requests retyped from voicemails and emails into the PM system',
    'Residents calling for work order updates because nobody closes the loop',
    'Renewals that start 30 days out instead of 90, weakening every negotiation',
    'Delinquency outreach that depends on who has time that week',
    'Owner reports assembled by hand from three systems every month',
    'Move-in checklists where steps get missed during busy weeks',
  ],
  opportunitiesIntro: 'Opportunities we typically find in property management portfolios.',
  opportunities: [
    {
      title: 'Automated leasing lead response',
      body: 'Every lead from every listing source answered, qualified, and offered a tour within minutes, around the clock, with everything logged to your PM system.',
    },
    {
      title: 'Maintenance intake and triage',
      body: 'Structured resident requests, urgency classification, automatic vendor routing, and status updates that stop the "any update?" calls.',
    },
    {
      title: 'Renewal pipeline',
      body: 'Renewals surface 90 days out with a tracked outreach sequence, protecting occupancy and negotiating position.',
    },
    {
      title: 'Owner reporting automation',
      body: 'Monthly owner packets assembled automatically from your PM and accounting systems, delivered on a fixed schedule.',
    },
    {
      title: 'Delinquency communication',
      body: 'Notices and reminders that send on a fixed cadence, consistently and documented, which speeds collections.',
    },
    {
      title: 'Resident onboarding',
      body: 'Move-in checklists that run themselves: utilities, insurance proof, portal setup, and key handoff tracked to completion.',
    },
  ],
  founderShort:
    'I ran operations for a $200 million real estate portfolio covering more than 1,400 units, including centralized leasing, maintenance, and resident support. This is the deepest domain expertise in the business: I know where portfolios leak time and money because I have owned those numbers myself.',
  faqs: [
    {
      q: 'Do you work with our property management software?',
      a: 'Yes. The audit is built around your existing stack, whether that is AppFolio, Buildium, Yardi, Rent Manager, Propertyware, or something else. The first question is always what your current system can do that you are not using.',
    },
    {
      q: 'We are a small team. Is this overkill?',
      a: 'The audit is built for companies with 5 to 100 employees, or portfolios with 400 or more units. If you are smaller and one workflow is the obvious problem, the $495 Single Workflow Audit is the better starting point.',
    },
    {
      q: 'Can you handle both single-family and multifamily operations?',
      a: 'Yes. The workflows differ, but the method is the same: document how work moves, find where it gets stuck, and rank the fixes by return.',
    },
    {
      q: 'Will this disrupt our operations during the audit?',
      a: 'No. Discovery is a 60- to 90-minute session plus a questionnaire. No system access or software installs are required.',
    },
    {
      q: 'What does it cost and how fast is it?',
      a: '$1,500 fixed, delivered within seven business days after discovery, with a findings guarantee: if we do not identify at least $15,000 in annualized opportunity, we refund the fee and you keep the roadmap.',
    },
  ],
};

export default function PropertyManagementPage() {
  return <IndustryPage data={data} />;
}
