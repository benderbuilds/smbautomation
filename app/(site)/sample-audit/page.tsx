import type { Metadata } from 'next';
import SampleAuditGate from './SampleAuditGate';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Sample Business Efficiency Audit',
  description:
    'See exactly what a Business Efficiency Audit deliverable looks like: workflow inventory, ranked opportunity scorecard, ROI estimates, recommended tools, and a 90-day roadmap.',
  alternates: { canonical: 'https://smbautomation.io/sample-audit' },
};

const CONTENTS = [
  'Executive summary with the headline findings',
  'Workflow inventory across leasing, maintenance, accounting, and resident services',
  'Opportunity scorecard: ten opportunities ranked by impact, cost, effort, risk, and payback',
  'Time and financial estimates for the top five opportunities',
  'Recommended tools selected around the existing software stack',
  'A phased 90-day roadmap with implementation budget ranges',
];

export default function SampleAuditPage() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.copy}>
          <h1 className={s.headline}>See a real audit before you buy one.</h1>
          <p className={s.sub}>
            This is a complete Business Efficiency Audit deliverable, anonymized as a fictional 22-employee property management company. The structure, depth, and numbers mirror what you receive.
          </p>
          <ul className={s.list}>
            {CONTENTS.map((c) => (
              <li key={c} className={s.item}>
                <span className="proof-dot" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <SampleAuditGate />
      </div>
    </section>
  );
}
