import type { Metadata } from 'next';
import Link from 'next/link';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Application Received',
  robots: { index: false },
};

export default function ReceivedPage() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <h1 className={s.headline}>Thank you. We will be in touch within one business day.</h1>
        <p className={s.sub}>
          In the meantime, if you already know which process is causing the problem, a Single Workflow Audit may be a faster and less expensive place to start.
        </p>
        <Link href="/single-workflow-audit" className="btn-primary">
          See the Single Workflow Audit →
        </Link>
      </div>
    </section>
  );
}
