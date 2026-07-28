import type { Metadata } from 'next';
import Link from 'next/link';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Intake Received',
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <h1 className={s.headline}>Intake received. Your audit is underway.</h1>
        <p className={s.sub}>
          We will review your workflow and deliver the audit within five business days, then schedule your 30-minute findings call. If anything needs clarification, we will reach out by email.
        </p>
        <Link href="/blog" className="btn-secondary">Read the blog while you wait →</Link>
      </div>
    </section>
  );
}
