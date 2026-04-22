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

      {/* 2. Stats Bar */}
      <section className={s.proofBar}>
        <div className={s.proofInner}>
          {[
            { num: '$2.4M+', label: 'In Tracked Client Revenue' },
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
      <div className={s.quoteRow}>
        <div className={s.quoteRowInner}>
          {/* TODO: swap with real approved client quote before deploy */}
          <p className={s.quoteText}>&ldquo;They replaced our manual follow-up in three weeks. I got my Sundays back.&rdquo;</p>
          <p className={s.quoteAttrib}>Custom Builder, Lone Tree, IA</p>
        </div>
      </div>

      {/* 3. Process */}
      <section className={s.process} id="how-we-work">
        <div className={s.sectionHeader}>
          <span className="eyebrow">THE PROCESS</span>
          <h2 className={s.sectionHeadline}>Three phases. No surprises.</h2>
        </div>
        <div className={s.processGrid}>
          {[
            {
              num: '01',
              title: 'Analyze',
              desc: 'One working session. We audit your SEO, follow-up workflow, CRM, and top three competitors. You leave with a ranked action plan, not a 40-page report.',
              time: '60 to 90 minutes. No homework.',
            },
            {
              num: '02',
              title: 'Build',
              desc: 'We build the first system inside your existing stack. Email, calendar, CRM, forms, phone. Nothing new to learn.',
              time: 'Most first builds ship in 2 to 4 weeks.',
            },
            {
              num: '03',
              title: 'Scale',
              desc: 'Monthly retainer. We measure what\'s working, fix what\'s not, and add the next system in the queue.',
              time: 'Month to month. Pause anytime.',
            },
          ].map(step => (
            <div key={step.num} className={s.processStep}>
              <div className={s.processNum}>{step.num}</div>
              <div className={s.processTitle}>{step.title}</div>
              <p className={s.processDesc}>{step.desc}</p>
              <p className={s.processTime}>{step.time}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. What We Do */}
      <section className={s.whatWeDo}>
        <div className={s.sectionHeader}>
          <span className="eyebrow">WHAT WE DO</span>
          <h2 className={s.sectionHeadline}>Three ways we plug in.</h2>
        </div>
        <div className={s.whatWeDoGrid}>
          {[
            {
              eyebrow: 'BUSINESS ANALYSIS',
              pain: 'You don\'t know exactly where you\'re losing leads, revenue, or rankings.',
              body: 'We audit your SEO, Google Business Profile, follow-up workflow, and your top three competitors. One session. Live, not async.',
              result: 'A ranked action plan you can hand to your team on Monday.',
            },
            {
              eyebrow: 'BUILDS & CUSTOM DEVELOPMENT',
              pain: 'You\'ve been quoted $80K for an MVP, or you\'re stuck with an AI-built prototype that won\'t launch.',
              body: 'We ship the system that should have shipped six months ago. Working software inside your existing stack. No platform lock-in.',
              result: 'Most first builds go live in 2 to 4 weeks.',
            },
            {
              eyebrow: 'RETAINER & OPTIMIZATION',
              pain: 'The system you bought last year is already outdated and nobody is measuring it.',
              body: 'Monthly retainer. We track what\'s working, kill what\'s not, and build the next automation in your queue.',
              result: 'Your system gets measured, maintained, and extended every month. It compounds instead of decaying.',
            },
          ].map(card => (
            <div key={card.eyebrow} className={s.whatWeDoCard}>
              <div className={s.cardEyebrow}>
                <span className={s.cardDot} />
                {card.eyebrow}
              </div>
              <h3 className={s.cardPain}>{card.pain}</h3>
              <p className={s.cardBody}>{card.body}</p>
              <div className={s.cardResult}>
                <div className={s.cardResultTag}>RESULT</div>
                <div className={s.cardResultText}>{card.result}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Who This Is For */}
      <section className={s.who}>
        <div className={s.whoInner}>
          <span className="eyebrow-light">WHO THIS IS FOR</span>
          <h2 className={s.whoHeadline}>Built for operators, not enterprises.</h2>
          <p className={s.whoSub}>
            This is for the owner who&apos;s past the startup grind, knows what&apos;s working, and is ready to stop being the bottleneck in their own business. If that&apos;s you, keep reading.
          </p>
          <div className={s.whoGrid}>
            <div className={s.whoCol}>
              <div className={s.whoColTitle}>You&apos;re exactly who we built this for if:</div>
              <ul className={s.fitList}>
                {[
                  'You\'re doing $500K to $20M in annual revenue.',
                  'You\'ve got a team but you\'re still the person everything routes through.',
                  'You\'ve tried automations before. Some worked. Most didn\'t get maintained.',
                  'You can invest $5,000 a month in systems that compound.',
                  'You want a partner embedded for 12+ months, not a one-and-done project.',
                ].map(item => (
                  <li key={item} className={s.fitItem}>
                    <span className="proof-dot" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className={s.badFitBlock}>
                <div className={s.badFitTitle}>We&apos;re probably not the right fit if:</div>
                <ul className={s.fitList}>
                  {[
                    'You\'re pre-revenue or still validating your offer.',
                    'You want a one-time project with no follow-through.',
                    'You\'re looking for the cheapest option, not the right one.',
                    'You need someone to decide your strategy for you. We implement. You lead.',
                  ].map(item => (
                    <li key={item} className={s.fitItem}>
                      <span className="proof-dot" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
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

      {/* 6. Recent Work */}
      <section className={s.caseStudies}>
        <div className={s.sectionHeader}>
          <span className="eyebrow">Recent Work</span>
          <h2 className={s.sectionHeadline}>What it looks like in practice.</h2>
        </div>
        <div className={s.caseGrid}>
          {[
            {
              tag: 'Real Estate',
              metric: '12 inbound referrals in 90 days', // TODO: confirm real metric with Jesse
              title: 'Annual Client Engagement System',
              result: '10-template automated email sequence keeping 200+ past clients engaged year-round.',
              attrib: 'REALTOR, IOWA CITY, IA',
            },
            {
              tag: 'Custom Home Building',
              metric: 'Saved 6 hrs/week in quote follow-up', // TODO: confirm real metric with Jesse
              title: 'Growth Strategy & Online Presence Overhaul',
              result: 'Comprehensive competitor analysis, website gap audit, and four-phase growth roadmap for a regional builder.',
              attrib: 'CUSTOM BUILDER, LONE TREE, IA',
            },
            {
              tag: 'Local Services',
              metric: 'Content creation time cut by 80%', // TODO: confirm real metric with Jesse
              title: 'Video Content Automation Pipeline',
              result: 'Automated before/after video production cutting content creation time by 80%.',
              attrib: 'LOCAL SERVICES BUSINESS', // TODO: confirm INDUSTRY, CITY, STATE with Jesse
            },
          ].map(c => (
            <Link key={c.title} href="/work" className={s.caseCard}>
              <div className={s.caseTag}>{c.tag}</div>
              <div className={s.caseMetric}>{c.metric}</div>
              <div className={s.caseTitle}>{c.title}</div>
              <p className={s.caseResult}>{c.result}</p>
              <div className={s.caseAttrib}>{c.attrib}</div>
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
