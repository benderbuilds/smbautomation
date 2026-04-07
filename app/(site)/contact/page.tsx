import type { Metadata } from 'next';
import ContactForm from './ContactForm';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Book a free strategy call or send us a message. We respond within one business day.',
  alternates: { canonical: 'https://smbautomation.io/contact' },
};

const CALENDLY = 'https://calendly.com/jesse-smbautomation/30min';

export default function ContactPage() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow-light">Get in Touch</span>
          <h1 className={s.headline}>Let&apos;s talk about your business.</h1>
          <p className={s.heroSub}>
            Tell us where you are and what you are trying to build. We will tell you honestly whether we can help and what that looks like.
          </p>
        </div>
      </section>

      <div className={s.body}>
        <div className={s.inner}>
          <div className={s.leftInfo}>
            <h2>Reach us directly</h2>
            <p>We respond to all inquiries within one business day. For faster scheduling, book a call directly.</p>
            <div className={s.contactLinks}>
              <a href="mailto:jesse@smbautomation.io">jesse@smbautomation.io</a>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer">Book a 30-min strategy call →</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
