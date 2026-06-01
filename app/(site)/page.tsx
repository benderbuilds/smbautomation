import type { Metadata } from 'next';
import ProblemSection from '@/components/ProblemSection';
import AuditSection from '@/components/AuditSection';
import FounderSection from '@/components/FounderSection';
import HomeFaq from '@/components/HomeFaq';
import ApplicationForm from '@/components/ApplicationForm';
import s from './page.module.css';

export const metadata: Metadata = {
  title: { absolute: 'SMBautomation - Business Audits and AI Builds for Small and Mid-Size Businesses | Jesse Bender, Founder' },
  description: 'Get a business audit from Jesse Bender: 13 years scaling companies, $200M portfolio managed, Fortune 500 exit. We find where time and money are leaking, then build only what pays back.',
  alternates: { canonical: 'https://smbautomation.io' },
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SMB Automation',
  url: 'https://smbautomation.io',
  description: 'SMB Automation builds custom AI automation systems for small and mid-size businesses — finding where time and money leak, then building the workflows that fix it.',
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow">STRATEGIC GROWTH PARTNER FOR SMBS</span>
          <h1 className={s.heroHeadline}>
            Stop guessing where automation <em>pays off.</em>
          </h1>
          <p className={s.heroSub}>
            It starts with a business audit. We find where time and money are leaking, then we build only what pays back.
          </p>
          <a href="#apply" className="btn-orange">Get your audit →</a>
          <p className={s.heroSupport}>Tell us about your business. We respond within 1 business day.</p>
        </div>
      </section>

      {/* 2. Problem */}
      <ProblemSection />

      {/* 3. The Audit */}
      <AuditSection />

      {/* 4. Founder */}
      <FounderSection />

      {/* 5. FAQ */}
      <HomeFaq />

      {/* 6. Final CTA */}
      <section className={s.finalCta}>
        <div className={s.finalCtaInner}>
          <span className="eyebrow-light">READY</span>
          <h2 className={s.finalCtaHeadline}>Find out what&apos;s actually worth automating.</h2>
          <p className={s.finalCtaSub}>15-minute application. We respond within 1 business day.</p>
          <a href="#apply" className="btn-orange">Get your audit →</a>
        </div>
      </section>

      {/* 7. Application Form */}
      <ApplicationForm />
    </>
  );
}
