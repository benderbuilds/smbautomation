import Link from 'next/link';
import s from './IndustrySection.module.css';

export default function IndustrySection() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <span className="eyebrow">WHERE WE WORK</span>
        <h2 className={s.headline}>Built for workflow-heavy operations.</h2>
        <div className={s.grid}>
          <div className={`${s.card} ${s.featured}`}>
            <h3 className={s.title}>Property Management</h3>
            <p className={s.body}>
              Leasing lead response, tour scheduling, maintenance intake and routing, renewals, delinquency communication, resident onboarding, owner reporting, and reviews.
            </p>
            <p className={s.body}>
              This is the deepest domain expertise in the business. SMB Automation&apos;s founder ran operations across a $200 million portfolio and more than 1,400 units, including centralized leasing, maintenance, and resident support.
            </p>
            <Link href="/property-management-automation" className={s.link}>
              Property management automation →
            </Link>
          </div>
          <div className={s.card}>
            <h3 className={s.title}>Healthcare and Wellness</h3>
            <p className={s.body}>
              Patient and lead intake, onboarding, appointments and reminders, lab and refill workflows, retention and reactivation, reporting, and administrative workflows. Scoped around privacy and compliance requirements.
            </p>
            <Link href="/healthcare-automation" className={s.link}>
              Healthcare automation →
            </Link>
          </div>
          <div className={s.card}>
            <h3 className={s.title}>Home and Local Services</h3>
            <p className={s.body}>
              Call capture, lead response, estimating, scheduling, dispatch, reviews, invoicing, memberships, and customer reactivation.
            </p>
            <Link href="/home-services-automation" className={s.link}>
              Home services automation →
            </Link>
          </div>
          <div className={s.card}>
            <h3 className={s.title}>Professional Services</h3>
            <p className={s.body}>
              Client intake, document collection, scheduling, proposal follow-up, project updates, and recurring client communication.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
