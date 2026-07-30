'use client';

import { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import s from './HomeFaq.module.css';

const FAQS: { q: string; a: string; link?: { href: string; label: string } }[] = [
  {
    q: 'What exactly is a Business Efficiency Audit?',
    a: 'A structured review of how work moves through your business. We identify repetitive tasks, unreliable handoffs, missed follow-up, revenue leaks, software gaps, and opportunities to improve the process through automation, AI, or better use of your existing tools.',
  },
  {
    q: 'How much does it cost?',
    a: '$1,500, fixed. Implementation is optional and typically ranges from $5,000 to $20,000+ depending on scope.',
  },
  {
    q: 'What if the audit does not find anything worth fixing?',
    a: 'If we do not identify at least $15,000 in annualized time or revenue opportunity, we refund the full fee and you keep the roadmap.',
  },
  {
    q: 'Why is the price displayed?',
    a: 'The audit is a defined consulting product, not an open-ended sales conversation. Showing the price lets you decide whether this is a fit before you apply.',
  },
  {
    q: 'Do I need to know what I want to automate?',
    a: 'No. Identifying the right opportunities is the purpose of the audit. Starting with a technology before understanding the problem is one of the most common ways businesses waste money.',
  },
  {
    q: 'Who is this not for?',
    a: 'Pre-revenue businesses, companies without repeatable workflows yet, anyone looking for general AI training or a list of tools, and buyers shopping purely on price. If your business is not prepared to invest at least $5,000 in implementation, the audit will not pay for itself.',
  },
  {
    q: 'What if I only have one process that needs fixing?',
    a: 'We offer a Single Workflow Audit for $495 covering one clearly defined process, delivered in five business days. It is the right choice when you already know exactly where the problem is.',
    link: { href: '/single-workflow-audit', label: 'Learn about the Single Workflow Audit →' },
  },
  {
    q: 'Do I have to hire SMB Automation to implement the recommendations?',
    a: 'No. The roadmap belongs to your company. Implement it internally, hire another provider, or ask us to execute it.',
  },
  {
    q: 'Will you recommend tools we already use?',
    a: 'Whenever possible. The first question is always whether your existing systems can solve the problem. New software gets recommended only when it provides a meaningful advantage.',
  },
  {
    q: 'Do you build custom software?',
    a: 'Sometimes, but only when an off-the-shelf option cannot reasonably solve the problem. Most businesses improve significantly by properly configuring and connecting tools they already own.',
  },
  {
    q: 'Are you tied to specific software companies?',
    a: 'No. Recommendations are based on fit, cost, usability, integrations, security requirements, and expected return.',
  },
  {
    q: 'How quickly will I receive the audit?',
    a: 'Within seven business days after discovery is complete.',
  },
  {
    q: 'Can you work with our existing IT company?',
    a: 'Yes. We provide the roadmap and work alongside internal employees, IT providers, software vendors, agencies, and other specialists.',
  },
  {
    q: 'Is AI always part of the recommendation?',
    a: 'No. The right answer may be better software configuration, a traditional automation, a redesigned process, employee training, or no change at all. The goal is to improve the business, not force AI into every workflow.',
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
          <span className="eyebrow">QUESTIONS</span>
          <h2 className={s.headline}>Questions business owners ask first.</h2>
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
                <p className={s.answer}>
                  {faq.a}
                  {faq.link && (
                    <>
                      {' '}
                      <Link href={faq.link.href} className={s.answerLink}>{faq.link.label}</Link>
                    </>
                  )}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
