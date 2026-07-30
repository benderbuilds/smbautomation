import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import CredibilityBar from '@/components/CredibilityBar';
import ProblemSection from '@/components/ProblemSection';
import OutcomeSection from '@/components/OutcomeSection';
import DeliverablesSection from '@/components/DeliverablesSection';
import OfferSection from '@/components/OfferSection';
import ImplementationSection from '@/components/ImplementationSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import IndustrySection from '@/components/IndustrySection';
import ResultsSection from '@/components/ResultsSection';
import FounderSection from '@/components/FounderSection';
import PhilosophySection from '@/components/PhilosophySection';
import HomeFaq from '@/components/HomeFaq';
import s from './page.module.css';

export const metadata: Metadata = {
  title: { absolute: 'Business Efficiency Audit and Automation Consulting | SMB Automation' },
  description:
    'Find the manual work costing your business time and money. Get a prioritized automation roadmap, ROI estimates, recommended tools, and a 90-day implementation plan. Fixed fee, $1,500.',
  alternates: { canonical: 'https://smbautomation.io' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Business Efficiency Audit',
  serviceType: 'Business efficiency audit and automation consulting',
  description:
    'A structured review of how work moves through your business: workflow inventory, ranked opportunity scorecard, ROI estimates, recommended tools, and a prioritized 90-day roadmap. Fixed fee, delivered in seven business days.',
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

export default function HomePage() {
  return (
    <>
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero */}
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow">BUSINESS EFFICIENCY AUDITS FOR ESTABLISHED COMPANIES</span>
          <h1 className={s.heroHeadline}>
            Find the work your business should stop doing <em>manually.</em>
          </h1>
          <p className={s.heroSub}>
            We analyze how work moves through your business, identify where time and money are being lost, and give you a prioritized plan for fixing it with automation, AI, and practical off-the-shelf tools.
          </p>
          <p className={s.heroSub}>
            Keep the playbook and implement it yourself, or have us build it for you.
          </p>
          <div className={s.heroCtas}>
            <Link href="/apply" className="btn-primary">Apply for the Audit →</Link>
            <Link href="/sample-audit" className={s.sampleLink}>See a sample audit →</Link>
          </div>
          <p className={s.heroSupport}>
            Fixed fee: $1,500. Delivered in seven business days. The roadmap belongs to you whether or not you hire us to build it.
          </p>
        </div>
      </section>

      <CredibilityBar />
      <ProblemSection />
      <OutcomeSection />
      <DeliverablesSection />
      <OfferSection />
      <ImplementationSection />
      <HowItWorksSection />
      <IndustrySection />
      <ResultsSection />
      <FounderSection />
      <PhilosophySection />
      <HomeFaq />

      {/* Final CTA */}
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
