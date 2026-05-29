'use client';

import { useState } from 'react';
import Script from 'next/script';
import s from './HomeFaq.module.css';

const FAQS = [
  {
    q: 'What kind of businesses do you build for?',
    a: 'We work with owners doing $500K to $20M in annual revenue who have a team but are still the person everything routes through. Our deepest experience is in property management, healthcare, hospitality, home building, and local service businesses. If your operation runs on appointments, leads, and recurring revenue, we can most likely help. If you are pre-revenue or still validating your offer, we are probably not the right fit yet.',
  },
  {
    q: 'What is the Operations Opportunity Map?',
    a: 'It is a paid diagnostic engagement where we map your workflows, score every bottleneck by ROI, and hand you a prioritized plan with the dollar impact of each fix. You own the map whether or not we build anything. Most clients use it to decide exactly what to automate first, in what order, and what it is worth to them. It is the same process we apply to operations up to $200M in revenue.',
  },
  {
    q: 'How is this different from hiring a developer or an agency?',
    a: 'Developers build what you spec. Agencies sell retainers. We start by finding what will actually move your numbers before we build anything. The Operations Opportunity Map proves the dollar impact first. You are not guessing at ROI after the fact. We also stay embedded after the build, which means the systems get maintained and improved instead of decaying the moment the project closes.',
  },
  {
    q: 'What does the free audit include?',
    a: 'The free automated audit is a fast, system-generated look at your online presence and lead intake: Google Business Profile gaps, website conversion friction, missed follow-up points, and basic SEO signals. It is not a deep operational diagnostic. It is a quick read on where you are leaking obvious opportunities. Delivered to your inbox in 24 hours. No call required.',
  },
  {
    q: 'How fast do you ship?',
    a: 'Most first builds go live in 2 to 4 weeks after scoping is complete. Turnaround depends on the complexity of your existing stack and how quickly we can get access to your tools. The Operations Opportunity Map itself typically takes 5 to 7 business days. We do not drag out engagements. We ship, measure, and iterate.',
  },
  {
    q: 'What tools do you build with?',
    a: 'We build inside your existing stack whenever possible. Common tools include Make, n8n, GoHighLevel, HubSpot, Airtable, Supabase, Vapi, Twilio, and custom-coded applications when off-the-shelf tools are not the right fit. We do not resell software or lock you into platforms. You own everything we build: credentials, logic, and documentation.',
  },
  {
    q: 'What happens if it does not work?',
    a: 'Every build comes with a defined success metric agreed on before we start. If we cannot identify at least one automation worth $10,000 in recovered time or revenue during the diagnostic phase, we will tell you straight that we are not the right fit. After launch, we watch for failures and edge cases and fix them fast. The retainer model exists specifically so systems stay working and keep improving rather than being abandoned.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
};

export default function HomeFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className={s.section} id="faq">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className={s.inner}>
        <div className={s.header}>
          <span className="eyebrow">COMMON QUESTIONS</span>
          <h2 className={s.headline}>What owners ask before they reach out.</h2>
        </div>
        <div className={s.list}>
          {FAQS.map((faq, i) => (
            <div key={i} className={s.item}>
              <button
                className={s.question}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <span className={`${s.chevron}${open === i ? ` ${s.chevronOpen}` : ''}`}>▼</span>
              </button>
              {open === i && (
                <p className={s.answer}>{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
