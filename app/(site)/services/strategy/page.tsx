import type { Metadata } from 'next';
import s from '../detail.module.css';

export const metadata: Metadata = {
  title: 'Business Analysis & Growth Strategy',
  description: 'A deep operational audit, competitor analysis, and prioritized growth roadmap with dollar values attached. Engagements start at $2,500.',
  alternates: { canonical: 'https://smbautomation.io/services/strategy' },
};

const CALENDLY = 'https://calendly.com/jesse-smbautomation/30min';

export default function StrategyPage() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow-light">Service 01</span>
          <h1 className={s.headline}>Business Analysis & Growth Strategy</h1>
          <p className={s.heroSub}>
            We study your business until we understand it well enough to tell you things you do not already know. You get a prioritized roadmap with dollar values attached to every recommendation.
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
              { title: 'Competitor landscape analysis', desc: 'Understand exactly how you stack up and where competitors are weak.' },
              { title: 'Customer journey mapping', desc: 'Map every touchpoint from awareness through repeat purchase.' },
              { title: 'Revenue leak identification', desc: 'Find where money is being lost and estimate the dollar value of each leak.' },
              { title: 'Tech stack audit', desc: 'Identify what you have, what is redundant, and what is missing.' },
              { title: 'Prioritized growth roadmap', desc: 'Every recommendation ranked by estimated ROI and effort.' },
              { title: 'Findings presentation', desc: 'Recorded walkthrough plus a written report you can act on immediately.' },
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
              { step: 'Day 1-2', title: 'Intake and kickoff', desc: 'You complete a detailed intake form. We schedule a 60-minute kickoff call to go deeper on your business model, goals, and constraints.' },
              { step: 'Day 3-7', title: 'Research and analysis', desc: 'We conduct the full audit independently. Competitor research, customer journey reconstruction, data review, and opportunity mapping.' },
              { step: 'Day 8-10', title: 'Roadmap build', desc: 'We build your prioritized growth roadmap with estimated revenue impact and effort for each initiative.' },
              { step: 'Day 10', title: 'Presentation and walkthrough', desc: 'We deliver a recorded video walkthrough and a written PDF report. You own both assets permanently.' },
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
            <p>Strategy engagements start at $2,500. Most are completed within 10 business days.</p>
          </div>
        </div>
      </div>

      <section className={s.ctaSection}>
        <h2 className={s.ctaHeadline}>Ready to see where your business is leaking revenue?</h2>
        <p className={s.ctaSub}>Book a free 30-minute call. We will walk through your situation and tell you whether the strategy engagement is the right starting point.</p>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Book a Strategy Call →
        </a>
      </section>
    </>
  );
}
