import type { Metadata } from 'next';
import Link from 'next/link';
import s from '@/components/ContentPage.module.css';

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'The Business Efficiency Audit process, step by step: apply, discovery, analysis, impact calculation, roadmap delivery, and your decision on implementation. Delivered in seven business days.',
  alternates: { canonical: 'https://smbautomation.io/how-it-works' },
};

const STEPS = [
  {
    title: 'Apply',
    body: 'Tell us about your business, team, software, and biggest operational challenges. Three minutes.',
    detail:
      'The application asks enough to understand your business and confirm the audit is the right starting point. Qualified businesses book a 20-minute fit call immediately on the next screen. On the fit call we confirm scope, answer questions, and schedule discovery.',
  },
  {
    title: 'Complete discovery',
    body: 'We walk through how work moves through the business, where employees spend their time, and where customers experience delays.',
    detail:
      'Discovery is a 60- to 90-minute working session, supported by a detailed pre-audit questionnaire you complete beforehand. With your permission we also gather input from the employees closest to the workflows under review. Nothing is disrupted: no software installs, no system access required.',
  },
  {
    title: 'We analyze the opportunities',
    body: 'We evaluate your processes, software, handoffs, bottlenecks, risks, and missed revenue.',
    detail:
      'Every recurring workflow gets documented and examined for repetitive manual steps, re-keyed data, follow-up gaps, single points of failure, and software you are paying for but not fully using.',
  },
  {
    title: 'We calculate the impact',
    body: 'We estimate the time, labor, capacity, and potential revenue tied to each recommendation.',
    detail:
      'Each opportunity is scored on potential impact, implementation cost, complexity, risk, and expected payback, then ranked. You see the math behind every estimate, held conservative.',
  },
  {
    title: 'You receive the roadmap',
    body: 'A prioritized playbook with tools, implementation steps, budget ranges, and a 90-day plan.',
    detail:
      'Delivery happens within seven business days after discovery and closes with a 60-minute findings presentation where we walk through the priorities and answer questions. The complete written playbook is yours to keep.',
  },
  {
    title: 'You decide what happens next',
    body: 'Implement it internally, use another provider, or ask us to execute the plan.',
    detail:
      'There is no requirement to hire SMB Automation after the audit. If you do want help executing, the $1,500 fee is credited toward any implementation project of $7,500 or more started within 30 days.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow">THE PROCESS</span>
          <h1 className={s.headline}>From operational friction to an actionable plan.</h1>
          <p className={s.heroSub}>
            The Business Efficiency Audit is a defined process with a fixed fee, a fixed timeline, and a findings guarantee. Here is exactly what happens at each step.
          </p>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.inner}>
          {STEPS.map((step, i) => (
            <div key={step.title} className={s.card} style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                <span className={s.stepNumber}>{i + 1}</span>
                <div>
                  <h2 className={s.cardTitle}>{step.title}</h2>
                  <p className={s.cardBody}>{step.body}</p>
                  <p className={s.cardBody}>{step.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={s.sectionAlt}>
        <div className={s.inner}>
          <h2 className={s.h2}>The findings guarantee</h2>
          <p className={s.body}>
            If the audit does not identify at least $15,000 in annualized time or revenue opportunity, we refund the full fee and you keep the roadmap.
          </p>
        </div>
      </section>

      <section className={s.cta}>
        <div className={s.ctaInner}>
          <span className="eyebrow-light">GET STARTED</span>
          <h2 className={s.ctaHeadline}>Start with step one.</h2>
          <p className={s.ctaSub}>
            Applications take about three minutes. Qualified businesses book a 20-minute fit call immediately.
          </p>
          <Link href="/apply" className="btn-primary">Apply for the Audit →</Link>
        </div>
      </section>
    </>
  );
}
