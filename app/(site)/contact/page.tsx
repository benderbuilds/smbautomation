import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from './ContactForm';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Questions about the Business Efficiency Audit or an existing engagement? Send a message and we respond within one business day.',
  alternates: { canonical: 'https://smbautomation.io/contact' },
};

export default function ContactPage() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow-light">GET IN TOUCH</span>
          <h1 className={s.headline}>Questions? Send a message.</h1>
          <p className={s.heroSub}>
            If you are ready to find out what is worth automating in your business, the fastest path is the audit application. For everything else, use the form.
          </p>
        </div>
      </section>

      <div className={s.body}>
        <div className={s.inner}>
          <div className={s.leftInfo}>
            <h2>Reach us directly</h2>
            <p>We respond to all inquiries within one business day.</p>
            <div className={s.contactLinks}>
              <a href="mailto:jesse@smbautomation.io">jesse@smbautomation.io</a>
              <Link href="/apply">Apply for the Audit →</Link>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
