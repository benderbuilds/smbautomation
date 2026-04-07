import type { Metadata } from 'next';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Case studies from real SMB automation and growth projects. Real estate, home building, local services, and more.',
  alternates: { canonical: 'https://smbautomation.io/work' },
};

const CALENDLY = 'https://calendly.com/jesse-smbautomation/30min';

const cases = [
  {
    tag: 'Real Estate',
    title: 'Annual Client Engagement System',
    result: '10-template automated email sequence keeping 200+ past clients engaged year-round.',
    detail: 'A residential real estate agent had no systematic way to stay in touch with past clients between transactions. We built a 10-email annual sequence triggered by close date, covering holidays, market updates, and personal check-ins. Open rates exceeded 40% within 60 days.',
  },
  {
    tag: 'Custom Home Building',
    title: 'Growth Strategy & Online Presence Overhaul',
    result: 'Comprehensive competitor analysis, website gap audit, and four-phase growth roadmap for a regional builder.',
    detail: 'A regional custom home builder was losing leads to competitors with stronger digital presence. We audited six competitors, mapped the full customer journey, and delivered a prioritized four-phase growth roadmap including SEO, content, referral systems, and a client portal.',
  },
  {
    tag: 'Local Services',
    title: 'Video Content Automation Pipeline',
    result: 'Automated before/after video production cutting content creation time by 80%.',
    detail: 'A home services company had hundreds of before/after job photos but no scalable way to turn them into social content. We built an automation that batches photos, generates branded video templates, and publishes to multiple platforms. 80% time reduction versus manual production.',
  },
];

export default function WorkPage() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow-light">Recent Work</span>
          <h1 className={s.headline}>What it looks like in practice.</h1>
          <p className={s.heroSub}>
            A sample of recent engagements. Each one started with a clear problem and a defined result.
          </p>
        </div>
      </section>

      <div className={s.body}>
        <div className={s.grid}>
          {cases.map(c => (
            <div key={c.title} className={s.card}>
              <div className={s.tag}>{c.tag}</div>
              <div className={s.title}>{c.title}</div>
              <p className={s.result}>{c.result}</p>
              <p className={s.detail}>{c.detail}</p>
            </div>
          ))}
        </div>
        <p className={s.note}>
          More case studies added as engagements are completed. Identifying details changed with client permission.
        </p>
      </div>

      <section style={{ background: 'var(--blue)', padding: '4rem 5vw', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 400, letterSpacing: '-0.02em', color: '#fff', marginBottom: '1rem' }}>
          Want results like these?
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)', maxWidth: 440, margin: '0 auto 2rem', lineHeight: 1.7 }}>
          Book a free call. We will walk through your business and tell you what we would build first.
        </p>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Book a Free Strategy Call →
        </a>
      </section>
    </>
  );
}
