import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import s from '@/components/ContentPage.module.css';
import a from './page.module.css';

export const metadata: Metadata = {
  title: 'About',
  description:
    'SMB Automation was built by Jesse Bender, an operator with 13 years of experience starting, scaling, and running businesses. The audit starts with how your business actually works. Technology comes second.',
  alternates: { canonical: 'https://smbautomation.io/about' },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://smbautomation.io/#jesse-bender',
  name: 'Jesse Bender',
  jobTitle: 'Founder',
  worksFor: {
    '@type': 'Organization',
    name: 'SMB Automation',
    url: 'https://smbautomation.io',
  },
  email: 'jesse@smbautomation.io',
  sameAs: ['https://www.linkedin.com/company/smbautomation'],
  knowsAbout: [
    'Business process automation',
    'Property management operations',
    'Healthcare technology',
    'Workflow analysis',
    'SMB operations',
  ],
};

export default function AboutPage() {
  return (
    <>
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow">ABOUT SMB AUTOMATION</span>
          <h1 className={s.headline}>Built by an operator, not a software salesperson.</h1>
          <p className={s.heroSub}>
            SMB Automation exists because most automation advice comes from people selling software. This business starts from the other side: how work actually moves through a company, and what it costs when it moves badly.
          </p>
        </div>
      </section>

      <section className={s.section}>
        <div className={a.founderGrid}>
          <div className={a.photoBlock}>
            <Image
              src="/assets/jesse-bender.png"
              alt="Jesse Bender, Founder of SMB Automation"
              fill
              sizes="(max-width: 767px) 100vw, 340px"
              style={{ objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
          <div>
            <h2 className={s.h2}>Jesse Bender, Founder</h2>
            <p className={s.body}>
              I spent 13 years starting, scaling, and running businesses. I was an early employee at a health-tech company that went from roughly $24,000 in annual recurring revenue to more than $25 million before a Fortune 500 acquisition. I ran operations for a $200 million real estate portfolio covering more than 1,400 units, where leasing, maintenance, accounting, and resident support all had to work at once or the numbers fell apart.
            </p>
            <p className={s.body}>
              Along the way I scaled teams, implemented CRMs and operations platforms across multiple companies, owned a restaurant through the pandemic, and built the kind of internal systems that let a business grow without adding headcount.
            </p>
            <p className={s.body}>
              I have seen what happens when a growing company adds software without fixing the underlying process. I have also seen how much capacity gets unlocked when the right workflow is redesigned around the customer, the team, and a measurable outcome.
            </p>
          </div>
        </div>
      </section>

      <section className={s.sectionAlt}>
        <div className={s.inner}>
          <h2 className={s.h2}>How we work</h2>
          <p className={s.body}>
            SMB Automation starts with how your business actually works. Technology comes second. That ordering shows up in everything:
          </p>
          <ul className={s.list}>
            <li className={s.listItem}>
              <span className="proof-dot" aria-hidden="true" />
              The audit is a fixed-fee, defined product with a findings guarantee, not an open-ended sales conversation.
            </li>
            <li className={s.listItem}>
              <span className="proof-dot" aria-hidden="true" />
              Recommendations are vendor-neutral. The first question is always whether the tools you already own can solve the problem.
            </li>
            <li className={s.listItem}>
              <span className="proof-dot" aria-hidden="true" />
              The roadmap belongs to you. Implement it internally, hire another provider, or ask us to build it.
            </li>
            <li className={s.listItem}>
              <span className="proof-dot" aria-hidden="true" />
              Some work should stay human. Part of every audit is deciding what not to automate.
            </li>
          </ul>
          <p className={s.body}>
            The business is based in Des Moines, Iowa and serves clients nationwide, with the deepest domain expertise in property management, healthcare and wellness, and home and local services.
          </p>
        </div>
      </section>

      <section className={s.cta}>
        <div className={s.ctaInner}>
          <span className="eyebrow-light">NEXT STEP</span>
          <h2 className={s.ctaHeadline}>See what an operator finds in your business.</h2>
          <p className={s.ctaSub}>
            Applications take about three minutes. Qualified businesses book a 20-minute fit call immediately.
          </p>
          <Link href="/apply" className="btn-primary">Apply for the Audit →</Link>
        </div>
      </section>
    </>
  );
}
