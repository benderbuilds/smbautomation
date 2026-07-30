import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import s from './IndustryPage.module.css';

export interface IndustryData {
  slug: string;
  eyebrow: string;
  h1: string;
  h1Em: string;
  subhead: string;
  serviceName: string;
  serviceDescription: string;
  stats: { value: string; label: string }[];
  problemsIntro: string;
  problems: string[];
  opportunitiesIntro: string;
  opportunities: { title: string; body: string }[];
  founderShort: string;
  faqs: { q: string; a: string }[];
}

const DELIVERABLES = [
  {
    title: 'Workflow Inventory',
    body: 'A documented view of the recurring processes creating the most friction across your business.',
  },
  {
    title: 'Opportunity Scorecard',
    body: 'Eight to fifteen opportunities ranked by business impact, implementation cost, effort, risk, and expected return.',
  },
  {
    title: 'Time and Financial Estimates',
    body: 'Estimated weekly hours saved, annual labor value, capacity improvements, potential revenue impact, and ongoing software costs.',
  },
  {
    title: 'Recommended Tools',
    body: 'Practical software and automation options selected around your existing systems, team, budget, and security requirements.',
  },
  {
    title: '90-Day Roadmap',
    body: 'A clear order of operations showing what to implement first, what should follow, and what can wait.',
  },
  {
    title: 'Implementation Budget Ranges',
    body: 'Realistic estimates for the cost and complexity of executing each recommendation.',
  },
  {
    title: 'Executive Findings Presentation',
    body: 'A 60-minute session where we walk through the findings, explain the priorities, and answer questions.',
  },
  {
    title: 'Complete Written Playbook',
    body: 'The finished roadmap belongs to your business whether or not you hire SMB Automation to implement it.',
  },
];

export default function IndustryPage({ data }: { data: IndustryData }) {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.serviceName,
    serviceType: 'Business efficiency audit and automation consulting',
    description: data.serviceDescription,
    provider: {
      '@type': 'Organization',
      name: 'SMB Automation',
      url: 'https://smbautomation.io',
    },
    areaServed: 'US',
    offers: {
      '@type': 'Offer',
      price: '1500',
      priceCurrency: 'USD',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smbautomation.io' },
      {
        '@type': 'ListItem',
        position: 2,
        name: data.serviceName,
        item: `https://smbautomation.io/${data.slug}`,
      },
    ],
  };

  return (
    <>
      <Script
        id={`${data.slug}-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, breadcrumbSchema]) }}
      />

      {/* 1-3: Eyebrow, H1, subhead */}
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow">{data.eyebrow}</span>
          <h1 className={s.headline}>
            {data.h1} <em>{data.h1Em}</em>
          </h1>
          <p className={s.sub}>{data.subhead}</p>
          <div className={s.heroCta}>
            <Link href="/apply" className="btn-primary">Apply for the Audit →</Link>
          </div>
          <p className={s.trust}>
            Fixed fee: $1,500. Delivered in seven business days. The roadmap belongs to you whether or not you hire us to build it.
          </p>
        </div>
      </section>

      {/* 4: Credibility bar */}
      <section className={s.credBar}>
        <div className={s.credGrid}>
          {data.stats.map((stat) => (
            <div key={stat.label} className={s.credCell}>
              <p className={s.credValue}>{stat.value}</p>
              <p className={s.credLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5: Problems */}
      <section className={s.section}>
        <div className={s.inner}>
          <span className="eyebrow">THE REAL PROBLEM</span>
          <h2 className={s.h2}>{data.problemsIntro}</h2>
          <ul className={s.problemList}>
            {data.problems.map((p) => (
              <li key={p} className={s.problemItem}>
                <span className="proof-dot" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6: Deliverables */}
      <section className={s.sectionAlt}>
        <div className={s.innerWide}>
          <span className="eyebrow">YOUR BUSINESS EFFICIENCY ROADMAP</span>
          <h2 className={s.h2}>A practical plan for running a more efficient business.</h2>
          <div className={s.deliverablesGrid}>
            {DELIVERABLES.map((d) => (
              <div key={d.title} className={s.deliverableCard}>
                <h3 className={s.cardTitle}>{d.title}</h3>
                <p className={s.cardBody}>{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7: Opportunities */}
      <section className={s.section}>
        <div className={s.innerWide}>
          <span className="eyebrow">WHAT WE TYPICALLY FIND</span>
          <h2 className={s.h2}>{data.opportunitiesIntro}</h2>
          <div className={s.oppGrid}>
            {data.opportunities.map((o) => (
              <div key={o.title} className={s.oppCard}>
                <h3 className={s.cardTitle}>{o.title}</h3>
                <p className={s.cardBody}>{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8: Founder, shortened */}
      <section className={s.sectionAlt}>
        <div className={s.founderGrid}>
          <div className={s.photoBlock}>
            <Image
              src="/assets/jesse-bender.png"
              alt="Jesse Bender, Founder of SMB Automation"
              fill
              sizes="(max-width: 767px) 100vw, 280px"
              style={{ objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
          <div>
            <span className="eyebrow">WHY SMB AUTOMATION</span>
            <h2 className={s.h2}>Built by an operator, not a software salesperson.</h2>
            <p className={s.body}>{data.founderShort}</p>
            <p className={s.signature}>JESSE BENDER, FOUNDER, SMB AUTOMATION</p>
          </div>
        </div>
      </section>

      {/* 9: FAQ */}
      <section className={s.section}>
        <div className={s.inner}>
          <span className="eyebrow">QUESTIONS</span>
          <h2 className={s.h2}>Common questions from {data.eyebrow.toLowerCase()} operators.</h2>
          <div className={s.faqList}>
            {data.faqs.map((f) => (
              <div key={f.q} className={s.faqItem}>
                <h3 className={s.faqQ}>{f.q}</h3>
                <p className={s.faqA}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10: Final CTA */}
      <section className={s.finalCta}>
        <div className={s.finalCtaInner}>
          <span className="eyebrow-light">STOP GUESSING</span>
          <h2 className={s.finalCtaHeadline}>Find out what is actually worth automating.</h2>
          <p className={s.finalCtaSub}>
            Get a clear view of where your business is losing time, what those problems are costing you, and which improvements should come first.
          </p>
          <Link href="/apply" className="btn-orange">Apply for the Audit →</Link>
          <p className={s.finalCtaTrust}>
            Fixed fee. Vendor-neutral recommendations. No implementation requirement. Findings guarantee.
          </p>
        </div>
      </section>
    </>
  );
}
