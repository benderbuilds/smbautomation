import Link from 'next/link';
import s from './ResultsSection.module.css';

const RESULTS = [
  {
    title: '80% less content-production time',
    body: 'Built an automated pipeline that turns existing project photos into branded before-and-after videos for a service business, removing a recurring weekly task from the owner’s plate.',
  },
  {
    title: '200+ past clients kept in active contact',
    body: 'Built an automated annual engagement system for a real estate business that maintains contact with more than 200 past clients between transactions with no manual work.',
  },
  {
    title: 'A phased operations roadmap',
    body: 'Analyzed competitors and mapped the full customer journey for a regional business, producing a prioritized plan covering visibility, follow-up, referrals, and customer experience.',
  },
];

export default function ResultsSection() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <span className="eyebrow">RECENT WORK</span>
        <h2 className={s.headline}>Systems built around how the business actually operates.</h2>
        <div className={s.grid}>
          {RESULTS.map((r) => (
            <div key={r.title} className={s.card}>
              <h3 className={s.title}>{r.title}</h3>
              <p className={s.body}>{r.body}</p>
            </div>
          ))}
        </div>
        <div className={s.cta}>
          <Link href="/sample-audit" className="btn-secondary">See a sample audit →</Link>
        </div>
      </div>
    </section>
  );
}
