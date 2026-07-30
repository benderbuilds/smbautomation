import type { Metadata } from 'next';
import ApplyForm from './ApplyForm';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Apply for a Business Efficiency Audit',
  description:
    'Tell us enough to understand your business and determine whether the audit is the right starting point. Takes about three minutes.',
  alternates: { canonical: 'https://smbautomation.io/apply' },
};

export default function ApplyPage() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <h1 className={s.headline}>Apply for a Business Efficiency Audit</h1>
        <p className={s.sub}>
          Tell us enough to understand your business and determine whether the audit is the right starting point. Takes about three minutes.
        </p>
        <ApplyForm />
      </div>
    </section>
  );
}
