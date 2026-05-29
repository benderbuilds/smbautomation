'use client';

import { useState } from 'react';
import Script from 'next/script';
import s from './HomeFaq.module.css';

const FAQS = [
  {
    q: 'What kind of businesses do you work with?',
    a: 'Owners in property management, healthcare, hospitality, home building, and local service businesses. The pattern is the same: real revenue, real customers, ops held together by spreadsheets and the owner\'s memory.',
  },
  {
    q: 'How is this different from hiring a developer?',
    a: 'Developers build what you tell them to build. We figure out what to build first. The audit proves the ROI before any code gets written.',
  },
  {
    q: 'What does the audit cost?',
    a: 'Scoped to your operation. We send specifics after a 30-minute conversation. If we build, the audit fee applies to the first build.',
  },
  {
    q: 'How fast do you ship?',
    a: 'First audit deliverable in 2 weeks. Most builds ship in 4 to 8 weeks after that.',
  },
  {
    q: 'What if it doesn\'t work?',
    a: 'Every build is scoped from a proven ROI number in the audit. If we can\'t show the math, we don\'t take the work.',
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
          <h2 className={s.headline}>What owners ask first.</h2>
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
