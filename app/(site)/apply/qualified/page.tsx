import type { Metadata } from 'next';
import { Suspense } from 'react';
import CalendlyEmbed from './CalendlyEmbed';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Book Your Fit Call',
  robots: { index: false },
};

export default function QualifiedPage() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <h1 className={s.headline}>You are a fit. Book your call.</h1>
        <p className={s.sub}>
          Pick a time for a 20-minute fit call. We will confirm scope, answer questions, and get the audit started.
        </p>
        <Suspense fallback={null}>
          <CalendlyEmbed />
        </Suspense>
      </div>
    </section>
  );
}
