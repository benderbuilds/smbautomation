import type { Metadata } from 'next';
import s from '../detail.module.css';

export const metadata: Metadata = {
  title: 'Ongoing Optimization & Retainer',
  description: 'A fractional technical growth team embedded in your business. Monthly performance reviews, system optimization, and new builds. Starting at $5,000/mo.',
  alternates: { canonical: 'https://smbautomation.io/services/scale' },
};

const CALENDLY = 'https://calendly.com/jesse-smbautomation/30min';

export default function ScalePage() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow-light">Service 03</span>
          <h1 className={s.headline}>Ongoing Optimization & Retainer</h1>
          <p className={s.heroSub}>
            We stay embedded in your business. Not as a support contract. As a technical growth team that shows up every month and moves things forward.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Book a Strategy Call →
          </a>
        </div>
      </section>

      <div className={s.sectionBg} style={{ background: 'var(--bg)' }}>
        <div className={s.section}>
          <h2 className={s.sectionTitle}>What the retainer includes</h2>
          <div className={s.grid}>
            {[
              { title: 'Monthly performance review', desc: 'We review every system, every metric. You get a written summary and a clear next-priority list.' },
              { title: 'System monitoring and optimization', desc: 'We catch problems before they cost you. Active monitoring and continuous tuning of everything we have built.' },
              { title: 'Priority access for new builds', desc: 'Retainer clients move to the front of the queue for new projects. No re-scoping, no onboarding delay.' },
              { title: 'Strategic advisory', desc: 'We sit in on planning conversations and help you pressure-test decisions before you commit resources.' },
              { title: 'Dedicated Slack channel', desc: 'Async access for questions, context, and quick reviews. Response within one business day.' },
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
          <h2 className={s.sectionTitle}>Who this is for</h2>
          <div className={s.timeline}>
            {[
              { step: 'Fit 1', title: 'Businesses completing a build with us', desc: 'If we just delivered a project, the retainer is the natural next step. You have infrastructure running. The retainer keeps it performing and growing.' },
              { step: 'Fit 2', title: 'Operators who want a fractional technical team', desc: 'You do not need a full-time hire. You need senior technical judgment on call, available monthly, without the overhead.' },
              { step: 'Fit 3', title: 'Fast-growing businesses with shifting priorities', desc: 'Your needs change as you grow. The retainer flexes with you. Scope is reviewed quarterly and adjusted to what matters now.' },
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
            <p>Retainers start at $5,000/mo. Scope is flexible and reviewed quarterly.</p>
          </div>
        </div>
      </div>

      <section className={s.ctaSection}>
        <h2 className={s.ctaHeadline}>Ready to have a growth team in your corner?</h2>
        <p className={s.ctaSub}>Book a call. We will walk through where you are and whether the retainer is the right fit right now.</p>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Book a Strategy Call →
        </a>
      </section>
    </>
  );
}
