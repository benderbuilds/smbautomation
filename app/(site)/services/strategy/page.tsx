import type { Metadata } from 'next';
import s from '../detail.module.css';

export const metadata: Metadata = {
  title: 'SEO, GBP & Competitor Analysis',
  description: 'A 1-hour analysis of your search rankings, Google Business Profile, and social media presence against your top competitors. Walk away with a prioritized action plan.',
  alternates: { canonical: 'https://smbautomation.io/services/strategy' },
};

const CALENDLY = 'https://calendly.com/jesse-smbautomation/30min';

export default function StrategyPage() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow-light">Service 01</span>
          <h1 className={s.headline}>SEO, GBP & Competitor Analysis</h1>
          <p className={s.heroSub}>
            In one hour, we show you exactly where your business is invisible online and where competitors are beating you. You leave with a specific, prioritized action plan you can start implementing the same week.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Book a Strategy Call →
          </a>
        </div>
      </section>

      <div className={s.sectionBg} style={{ background: 'var(--bg)' }}>
        <div className={s.section}>
          <h2 className={s.sectionTitle}>What is included</h2>
          <div className={s.grid}>
            {[
              { title: 'SEO audit', desc: 'Where you rank, where you don\'t, and which keyword gaps are costing you the most traffic.' },
              { title: 'Google Business Profile review', desc: 'Completeness score, review strategy, local pack visibility, and specific fixes to improve ranking.' },
              { title: 'Social media presence analysis', desc: 'How your content, frequency, and engagement compare to your top 3 competitors.' },
              { title: 'Competitor benchmarking', desc: 'A side-by-side view of where competitors are outperforming you and where you have an opening.' },
              { title: 'Prioritized action plan', desc: 'Every recommendation ranked by impact and ease of implementation. You know exactly what to do first.' },
              { title: 'Written summary', desc: 'Delivered within 48 hours of your session. You own it permanently.' },
            ].map(item => (
              <div key={item.title} className={s.gridItem}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={s.sectionBg} style={{ background: 'var(--bg-white)' }}>
        <div className={s.section}>
          <h2 className={s.sectionTitle}>How it works</h2>
          <div className={s.timeline}>
            {[
              { step: 'Before the session', title: 'We do the research', desc: 'You share your website URL and 2-3 competitors. We complete the SEO, GBP, and social media analysis before we get on the call.' },
              { step: 'The session (1 hour)', title: 'We walk through the findings', desc: 'We present what we found, explain the gaps, and prioritize the action items with you. No slides, no pitch — just findings and recommendations.' },
              { step: 'Within 48 hours', title: 'Written summary delivered', desc: 'You receive a written action plan with every recommendation from the session, ranked by priority. Yours to keep and implement.' },
            ].map(step => (
              <div key={step.step} className={s.timelineStep}>
                <div className={s.timelineNum}>{step.step}</div>
                <div className={s.timelineText}>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={s.investment}>
            <h3>Investment</h3>
            <p><span style={{ textDecoration: 'line-through', opacity: 0.5, marginRight: '0.4em' }}>$500</span><strong>$250</strong> — applied to your first project if you move forward.</p>
            <p style={{ marginTop: '0.75rem', fontSize: '0.875rem' }}>Most clients see quick wins within a week of implementing the plan.</p>
          </div>
        </div>
      </div>

      <section className={s.ctaSection}>
        <h2 className={s.ctaHeadline}>Ready to see where your business is invisible online?</h2>
        <p className={s.ctaSub}>Book a strategy session. We will analyze your SEO, GBP, and social presence and give you a specific action plan in one hour.</p>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Book a Strategy Call →
        </a>
      </section>
    </>
  );
}
