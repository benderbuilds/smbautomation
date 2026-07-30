import type { Metadata } from 'next';
import Link from 'next/link';
import s from '@/components/ContentPage.module.css';

export const metadata: Metadata = {
  title: 'Results',
  description:
    'Recent work from SMB Automation: automation systems and operational roadmaps built around how each business actually operates.',
  alternates: { canonical: 'https://smbautomation.io/results' },
};

const RESULTS = [
  {
    tag: 'Local Services',
    title: '80% less content-production time',
    summary:
      'Built an automated pipeline that turns existing project photos into branded before-and-after videos for a service business, removing a recurring weekly task from the owner’s plate.',
    detail:
      'The company had hundreds of before-and-after job photos but no scalable way to turn them into marketing content. The automation batches photos, generates branded video templates, and publishes to multiple platforms.',
  },
  {
    tag: 'Real Estate',
    title: '200+ past clients kept in active contact',
    summary:
      'Built an automated annual engagement system for a real estate business that maintains contact with more than 200 past clients between transactions with no manual work.',
    detail:
      'A ten-touch annual sequence triggered by each client’s close date covers holidays, market updates, and personal check-ins. Open rates exceeded 40% within 60 days of launch.',
  },
  {
    tag: 'Custom Home Building',
    title: 'A phased operations roadmap',
    summary:
      'Analyzed competitors and mapped the full customer journey for a regional business, producing a prioritized plan covering visibility, follow-up, referrals, and customer experience.',
    detail:
      'The engagement audited six competitors, documented the customer journey end to end, and delivered a four-phase roadmap the internal team could execute in priority order.',
  },
];

export default function ResultsPage() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow">RECENT WORK</span>
          <h1 className={s.headline}>Systems built around how the business actually operates.</h1>
          <p className={s.heroSub}>
            A sample of recent engagements. Each one started with a clear problem and ended with a defined, measurable result. Identifying details changed with client permission.
          </p>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.inner}>
          {RESULTS.map((r) => (
            <div key={r.title} className={s.card} style={{ marginBottom: '1.5rem' }}>
              <span className="eyebrow">{r.tag.toUpperCase()}</span>
              <h2 className={s.cardTitle}>{r.title}</h2>
              <p className={s.cardBody}>{r.summary}</p>
              <p className={s.cardBody}>{r.detail}</p>
            </div>
          ))}
          <p className={s.body} style={{ marginTop: '1rem' }}>
            Want to see what the audit deliverable itself looks like?{' '}
            <Link href="/sample-audit" style={{ color: 'var(--blue)', fontWeight: 600 }}>
              See a sample audit →
            </Link>
          </p>
        </div>
      </section>

      <section className={s.cta}>
        <div className={s.ctaInner}>
          <span className="eyebrow-light">YOUR TURN</span>
          <h2 className={s.ctaHeadline}>Find out what this looks like for your business.</h2>
          <p className={s.ctaSub}>
            Applications take about three minutes. Qualified businesses book a 20-minute fit call immediately.
          </p>
          <Link href="/apply" className="btn-primary">Apply for the Audit →</Link>
        </div>
      </section>
    </>
  );
}
