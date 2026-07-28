import Link from 'next/link';
import s from './ImplementationSection.module.css';

const PROJECTS = [
  'Lead-response and follow-up systems',
  'CRM setup and optimization',
  'Customer onboarding',
  'Scheduling and reminders',
  'AI receptionists',
  'Reporting dashboards',
  'Data entry and document processing',
  'Invoice and payment workflows',
  'Customer retention and reactivation',
  'Internal tools and custom applications',
  'Software integrations',
  'Employee notifications and task routing',
];

export default function ImplementationSection() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <span className="eyebrow">NEED HELP EXECUTING?</span>
        <h2 className={s.headline}>Keep the roadmap or have us build it.</h2>
        <p className={s.body}>
          There is no requirement to hire SMB Automation after the audit. Use your internal team, work with another provider, or ask us to implement the plan.
        </p>
        <p className={s.body}>
          Implementation projects typically range from $5,000 to $20,000+, depending on the number of workflows, systems, users, and departments involved.
        </p>
        <p className={s.lead}>Projects commonly include:</p>
        <ul className={s.list}>
          {PROJECTS.map((p) => (
            <li key={p} className={s.item}>
              <span className="proof-dot" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
        <p className={s.closing}>
          Every implementation begins with a defined outcome and includes testing, documentation, training, and a results review.
        </p>
        <div className={s.cta}>
          <Link href="/apply" className="btn-primary">Apply for the Audit →</Link>
        </div>
      </div>
    </section>
  );
}
