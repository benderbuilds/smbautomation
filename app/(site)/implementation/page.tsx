import type { Metadata } from 'next';
import Link from 'next/link';
import s from '@/components/ContentPage.module.css';

export const metadata: Metadata = {
  title: 'Implementation',
  description:
    'Keep the audit roadmap or have SMB Automation build it. Implementation projects typically range from $5,000 to $20,000+ and include testing, documentation, training, and a results review.',
  alternates: { canonical: 'https://smbautomation.io/implementation' },
};

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

export default function ImplementationPage() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow">IMPLEMENTATION</span>
          <h1 className={s.headline}>Keep the roadmap or have us build it.</h1>
          <p className={s.heroSub}>
            There is no requirement to hire SMB Automation after the audit. Use your internal team, work with another provider, or ask us to implement the plan. This page covers what implementation looks like when we build it.
          </p>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.inner}>
          <h2 className={s.h2}>What implementation projects look like</h2>
          <p className={s.body}>
            Implementation projects typically range from $5,000 to $20,000+, depending on the number of workflows, systems, users, and departments involved. Every project is scoped from the audit roadmap, so the expected return is known before any work begins.
          </p>
          <p className={s.body}>Projects commonly include:</p>
          <ul className={s.list}>
            {PROJECTS.map((p) => (
              <li key={p} className={s.listItem}>
                <span className="proof-dot" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <p className={s.body}>
            Every implementation begins with a defined outcome and includes testing, documentation, training, and a results review. Your team learns to run what we build; nothing depends on us staying involved.
          </p>
          <p className={s.body}>
            The $1,500 audit fee is credited toward any implementation project of $7,500 or more started within 30 days.
          </p>
        </div>
      </section>

      <section className={s.sectionAlt} id="ongoing">
        <div className={s.inner}>
          <h2 className={s.h2}>Ongoing optimization</h2>
          <p className={s.body}>
            Businesses that want continued improvement after implementation can keep working down the roadmap with us on an ongoing basis: monitoring the systems already built, measuring the results, and implementing the next priorities from the opportunity scorecard quarter by quarter.
          </p>
          <p className={s.body}>
            Ongoing work is scoped per engagement after the first implementation project, so both sides know exactly what the next quarter covers and what it should return.
          </p>
        </div>
      </section>

      <section className={s.cta}>
        <div className={s.ctaInner}>
          <span className="eyebrow-light">START WITH THE AUDIT</span>
          <h2 className={s.ctaHeadline}>Implementation starts with knowing what to build.</h2>
          <p className={s.ctaSub}>
            Every project we take on is scoped from an audit, so the return is proven before the build begins.
          </p>
          <Link href="/apply" className="btn-primary">Apply for the Audit →</Link>
        </div>
      </section>
    </>
  );
}
