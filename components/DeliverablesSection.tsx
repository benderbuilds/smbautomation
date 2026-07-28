import Link from 'next/link';
import s from './DeliverablesSection.module.css';

const DELIVERABLES = [
  {
    title: 'Workflow Inventory',
    body: 'A documented view of the recurring processes creating the most friction across your business.',
  },
  {
    title: 'Opportunity Scorecard',
    body: 'Eight to fifteen opportunities ranked by business impact, implementation cost, effort, risk, and expected return.',
  },
  {
    title: 'Time and Financial Estimates',
    body: 'Estimated weekly hours saved, annual labor value, capacity improvements, potential revenue impact, and ongoing software costs.',
  },
  {
    title: 'Recommended Tools',
    body: 'Practical software and automation options selected around your existing systems, team, budget, and security requirements.',
  },
  {
    title: '90-Day Roadmap',
    body: 'A clear order of operations showing what to implement first, what should follow, and what can wait.',
  },
  {
    title: 'Implementation Budget Ranges',
    body: 'Realistic estimates for the cost and complexity of executing each recommendation.',
  },
  {
    title: 'Executive Findings Presentation',
    body: 'A 60-minute session where we walk through the findings, explain the priorities, and answer questions.',
  },
  {
    title: 'Complete Written Playbook',
    body: 'The finished roadmap belongs to your business whether or not you hire SMB Automation to implement it.',
  },
];

export default function DeliverablesSection() {
  return (
    <section className={s.section} id="deliverables">
      <div className={s.inner}>
        <span className="eyebrow">YOUR BUSINESS EFFICIENCY ROADMAP</span>
        <h2 className={s.headline}>A practical plan for running a more efficient business.</h2>
        <div className={s.grid}>
          {DELIVERABLES.map((d) => (
            <div key={d.title} className={s.card}>
              <h3 className={s.title}>{d.title}</h3>
              <p className={s.body}>{d.body}</p>
            </div>
          ))}
        </div>
        <p className={s.sampleLink}>
          <Link href="/sample-audit">See a sample audit →</Link>
        </p>
      </div>
    </section>
  );
}
