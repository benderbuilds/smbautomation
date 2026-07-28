import type { Metadata } from 'next';
import { Suspense } from 'react';
import IntakeForm from './IntakeForm';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Single Workflow Audit Intake',
  robots: { index: false },
};

export default function IntakePage() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <h1 className={s.headline}>Tell us about the workflow.</h1>
        <p className={s.sub}>
          Thank you for your purchase. Complete this intake so we know exactly which process to analyze. Your audit is delivered within five business days.
        </p>
        <Suspense fallback={null}>
          <IntakeForm />
        </Suspense>
      </div>
    </section>
  );
}
