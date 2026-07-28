import type { Metadata } from 'next';
import s from '@/components/ContentPage.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How SMB Automation collects, uses, and protects your information.',
  alternates: { canonical: 'https://smbautomation.io/privacy' },
  robots: { index: true },
};

export default function PrivacyPage() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow">LEGAL</span>
          <h1 className={s.headline}>Privacy Policy</h1>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.inner}>
          <p className={s.legalMeta}>Last updated July 2026</p>

          <p className={s.body}>
            This policy describes how SMB Automation (&quot;we,&quot; &quot;us&quot;) collects and uses information on smbautomation.io. Questions about this policy can be sent to jesse@smbautomation.io.
          </p>

          <h2 className={s.h3}>Information we collect</h2>
          <p className={s.body}>
            When you submit a form on this site (the audit application, the contact form, the sample audit download, or the workflow audit intake), we collect the information you provide: typically your name, email address, phone number, company details, and any answers you enter. When you purchase the Single Workflow Audit, payment is processed by Stripe; we never see or store your full card details.
          </p>
          <p className={s.body}>
            We also collect standard analytics data about how the site is used, including pages visited, referring source, and campaign parameters. We store a first-party cookie for up to 90 days that records how you first found the site so we can attribute inquiries correctly.
          </p>

          <h2 className={s.h3}>How we use it</h2>
          <ul className={s.list}>
            <li className={s.listItem}><span className="proof-dot" aria-hidden="true" />To respond to your inquiry, process your application, or deliver a purchased service.</li>
            <li className={s.listItem}><span className="proof-dot" aria-hidden="true" />To send transactional email related to your submission or purchase, delivered through Resend.</li>
            <li className={s.listItem}><span className="proof-dot" aria-hidden="true" />To understand how visitors use the site and how our marketing performs, using Google Analytics, Google Ads, and Meta tools.</li>
            <li className={s.listItem}><span className="proof-dot" aria-hidden="true" />To keep internal records of applications, purchases, and inquiries.</li>
          </ul>
          <p className={s.body}>
            We do not sell your information. We do not send marketing email you have not asked for.
          </p>

          <h2 className={s.h3}>Service providers</h2>
          <p className={s.body}>
            We rely on a small set of service providers to run this site: Railway (hosting), Cloudflare (DNS and spam protection), Resend (transactional email), Stripe (payments), Calendly (scheduling), Google (analytics, advertising, and spreadsheets), and Meta (advertising measurement). Each receives only the information needed to perform its function and handles it under its own privacy policy.
          </p>

          <h2 className={s.h3}>Cookies</h2>
          <p className={s.body}>
            The site uses cookies for analytics and for the 90-day attribution cookie described above. You can block or delete cookies in your browser settings; the site works without them.
          </p>

          <h2 className={s.h3}>Data retention and your rights</h2>
          <p className={s.body}>
            We keep submission records for as long as they are useful for serving clients and maintaining business records. You may request a copy of the information we hold about you, or ask us to correct or delete it, by emailing jesse@smbautomation.io. We respond within one business day.
          </p>

          <h2 className={s.h3}>Changes</h2>
          <p className={s.body}>
            If this policy changes, the updated version will be posted here with a new date at the top.
          </p>
        </div>
      </section>
    </>
  );
}
