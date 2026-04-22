import type { Metadata } from 'next';
import Link from 'next/link';
import HeroDiagram from '@/components/HeroDiagram';
import s from './page.module.css';

export const metadata: Metadata = {
  title: { absolute: 'SMB Automation | Business Analysis, Custom Builds & Growth Systems for SMBs' },
  description: 'We analyze your business, build what is missing, and scale it with you. Strategic growth partner for SMBs doing $500K to $20M.',
  alternates: { canonical: 'https://smbautomation.io' },
};

const CALENDLY = 'https://calendly.com/jesse-smbautomation/30min';

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SMB Automation',
  url: 'https://smbautomation.io',
  description: 'We analyze your business, build what is missing, and scale it with you. Strategic growth partner for SMBs doing $500K to $20M.',
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
          <div>
            <span className="eyebrow-light">GROWTH SYSTEMS FOR SMBS DOING $500K TO $20M</span>
            <h1 className={s.heroHeadline}>
              Your team is doing by hand what your competitors&apos; systems already handle automatically.{' '}
              <em>We close that gap.</em>
            </h1>
            <p className={s.heroSub}>
              We audit your operation, build the systems you&apos;re missing, and stay embedded to scale what works. Most first builds ship in 2 to 4 weeks.
            </p>
            <div className={s.heroCtas}>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-orange">
                SHOW ME MY BIGGEST AUTOMATION GAP →
              </a>
            </div>
            <a href="#how-we-work" className={s.heroTextLink}>Or see how we work →</a>
          </div>
          <div className={s.heroRight}>
            <HeroDiagram />
          </div>
        </div>
      </section>

      {/* 2. Social Proof Bar */}
      <section className={s.proofBar}>
        <div className={s.proofInner}>
          {[
            { num: '$2.4M+', label: 'Revenue Influenced' },
            { num: '40+', label: 'Systems Deployed' },
            { num: '18', label: 'Industries Served' },
            { num: '< 48 hrs', label: 'Avg Time to First Insight' },
          ].map(stat => (
            <div key={stat.label} className={s.proofStat}>
              <div className={s.proofNumber}>{stat.num}</div>
              <div className={s.proofLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Services Overview */}
      <section className={s.services}>
        <div className={s.sectionHeader}>
          <span className="eyebrow">What We Do</span>
          <h2 className={s.sectionHeadline}>Strategy. Build. Scale.</h2>
          <p className={s.sectionSub}>
            Three phases of working with us. Each one delivers standalone value, and together they compound.
          </p>
        </div>
        <div className={s.serviceGrid}>
          {[
            {
              title: 'Business Analysis & Growth Strategy',
              desc: 'We start by analyzing your online presence against your competitors. SEO, Google Business Profile, social media. In one hour, you get a clear picture of where you\'re invisible, where you\'re losing to competitors, and a prioritized action plan to fix it.',
              cta: 'Explore Strategy Services →',
              href: '/services/strategy',
            },
            {
              title: '0-1 MVP Builds & Custom Development',
              desc: 'We design and build the tools your business is missing. Custom automations, client-facing apps, internal dashboards, AI workflows. Every build is scoped around a measurable outcome: time saved, revenue recovered, or capacity unlocked.',
              cta: 'Explore Build Services →',
              href: '/services/build',
            },
            {
              title: 'Ongoing Optimization & Retainer',
              desc: 'We stay embedded in your business. Monthly performance reviews, system optimization, new builds as priorities shift. This is not a support contract. It is having a technical growth team on call.',
              cta: 'Explore Scale Services →',
              href: '/services/scale',
            },
          ].map(svc => (
            <div key={svc.title} className={s.serviceCard}>
              <div className={s.serviceTitle}>{svc.title}</div>
              <p className={s.serviceDesc}>{svc.desc}</p>
              <Link href={svc.href} className={s.serviceLink}>{svc.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Process */}
      <section className={s.process} id="process">
        <div className={s.sectionHeader}>
          <span className="eyebrow">How We Work</span>
          <h2 className={s.sectionHeadline}>Analyze. Build. Scale.</h2>
          <p className={s.sectionSub}>
            Every engagement follows this progression. Some clients start at step one, others jump straight to a build. We meet you where you are.
          </p>
        </div>
        <div className={s.processGrid}>
          {[
            {
              num: '01',
              title: 'SEO, GBP & Competitor Analysis',
              desc: 'We audit your search rankings, Google Business Profile, and social media against your top competitors. No generic templates. You get a specific, prioritized action plan in one session.',
            },
            {
              num: '02',
              title: 'Build What Matters Most',
              desc: 'We prioritize by impact. The first build targets your highest-value bottleneck with a measurable ROI target attached. You see results before we move to the next one.',
            },
            {
              num: '03',
              title: 'Scale With You Monthly',
              desc: 'We review performance data, optimize what is running, and build the next priority. Your business evolves. Your systems evolve with it.',
            },
          ].map(step => (
            <div key={step.num} className={s.processStep}>
              <div className={s.processNum}>{step.num}</div>
              <div className={s.processTitle}>{step.title}</div>
              <p className={s.processDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Who We Work With */}
      <section className={s.who}>
        <div className={s.whoInner}>
          <span className="eyebrow-light">Who This Is For</span>
          <h2 className={s.whoHeadline}>Built for operators, not enterprises.</h2>
          <p className={s.whoSub}>
            We work best with small and mid-sized businesses that are past the startup phase and ready to invest in systems that scale.
          </p>
          <div className={s.whoGrid}>
            <div className={s.whoCol}>
              <div className={s.whoColTitle}>Good fit</div>
              <ul className={s.fitList}>
                {[
                  'Revenue between $500K and $20M',
                  'Currently relying on manual processes that should be automated',
                  'Ready to invest $5,000+/mo in growth infrastructure',
                  'Want a strategic partner, not a vendor who disappears after delivery',
                  'Decision-maker is involved in the engagement',
                ].map(item => (
                  <li key={item} className={s.fitItem}>
                    <span className="proof-dot" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.whoCol}>
              <div className={s.whoColTitle}>Industries we know well</div>
              {[
                { group: 'Healthcare & Wellness', items: 'Med spas, weight loss clinics, TRT/HRT clinics, hair restoration' },
                { group: 'Professional Services', items: 'Immigration attorneys, tax resolution firms, senior care advisors' },
                { group: 'Home & Property', items: 'Property management, custom home builders, commercial cleaning, landscaping' },
                { group: 'Real Estate', items: 'Agents, brokerages, property investors' },
              ].map(g => (
                <div key={g.group} className={s.industryGroup}>
                  <div className={s.industryGroupTitle}>{g.group}</div>
                  <div className={s.industryList}>{g.items}</div>
                </div>
              ))}
              <div className={s.whoNote}>
                Do not see your industry? If your business runs on appointments, leads, and recurring revenue, we can probably help. Book a call and we will tell you honestly.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Case Studies Preview */}
      <section className={s.caseStudies}>
        <div className={s.sectionHeader}>
          <span className="eyebrow">Recent Work</span>
          <h2 className={s.sectionHeadline}>What it looks like in practice.</h2>
        </div>
        <div className={s.caseGrid}>
          {[
            {
              tag: 'Real Estate',
              title: 'Annual Client Engagement System',
              result: '10-template automated email sequence keeping 200+ past clients engaged year-round.',
            },
            {
              tag: 'Custom Home Building',
              title: 'Growth Strategy & Online Presence Overhaul',
              result: 'Comprehensive competitor analysis, website gap audit, and four-phase growth roadmap for a regional builder.',
            },
            {
              tag: 'Local Services',
              title: 'Video Content Automation Pipeline',
              result: 'Automated before/after video production cutting content creation time by 80%.',
            },
          ].map(c => (
            <Link key={c.title} href="/work" className={s.caseCard}>
              <div className={s.caseTag}>{c.tag}</div>
              <div className={s.caseTitle}>{c.title}</div>
              <p className={s.caseResult}>{c.result}</p>
              <div className={s.caseCta}>Read the Full Story →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className={s.finalCta}>
        <h2 className={s.finalCtaHeadline}>Ready to see what is possible?</h2>
        <p className={s.finalCtaSub}>
          Book a free 30-minute strategy call. We will walk through your business, identify the biggest opportunities, and tell you exactly what we would build first.
        </p>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Book Your Free Strategy Call →
        </a>
      </section>
    </>
  );
}
