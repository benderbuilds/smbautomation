import type { Metadata } from 'next';
import Link from 'next/link';
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
          <p className={s.legalMeta}>Last updated November 24, 2026</p>

          <p className={s.body}>
            This policy describes how SMBAUTOMATION LLC, which operates SMB Automation and smbautomation.io (&quot;we,&quot; &quot;us&quot;), collects and uses information on smbautomation.io and through our text message programs. Questions about this policy can be sent to <a href="mailto:jesse@smbautomation.io">jesse@smbautomation.io</a> or (319) 255-2700.
          </p>

          <h2 className={s.h3}>Information we collect</h2>
          <p className={s.body}>
            When you submit a form on this site (including the signup forms in our free trial and demo booking calendars) or chat with us, we collect the information you provide: typically your name, email address, phone number, company details, and any answers you enter.
          </p>
          <p className={s.body}>
            If you choose to receive text messages, we also record which text message program or programs you selected, the phone number you agreed to receive texts at, and when you made the choice. See <a href="#sms">Text messaging</a> below.
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
            We rely on a small set of service providers to run this site: Railway (hosting), Cloudflare (DNS and spam protection), Resend (transactional email), Calendly (scheduling), Google (analytics, advertising, business email, and spreadsheets), Meta (advertising measurement), and HighLevel, also known as LeadConnector (our booking calendars and signup forms, website chat, contact records, and text message delivery). Each receives only the information needed to perform its function and handles it under its own privacy policy.
          </p>

          <h2 className={s.h3} id="sms">Text messaging</h2>
          <p className={s.body}>
            SMBAUTOMATION LLC offers two separate, optional text message programs. You can join either one, both, or neither by checking the boxes on our free trial signup form, which appears when you book a trial onboarding call at <Link href="/start-trial">smbautomation.io/start-trial</Link>. Each box is unchecked by default, and you do not need to check either one to start a trial, book a call, contact us, or buy our services.
          </p>
          <ul className={s.list}>
            <li className={s.listItem}><span className="proof-dot" aria-hidden="true" /><span><strong>Service texts (non-marketing):</strong> messages about our Front Desk Assistant and After Hours Answering services, such as your onboarding call and support questions.</span></li>
            <li className={s.listItem}><span className="proof-dot" aria-hidden="true" /><span><strong>Marketing texts:</strong> promotional messages, including special offers, discounts, and new product updates.</span></li>
          </ul>
          <p className={s.body}>
            Giving us your phone number, including in a booking form or in our website chat, does not by itself sign you up for text messages. We only text you about the program or programs you selected, and joining the service program does not sign you up for marketing texts. Message frequency varies. Message and data rates may apply. Reply STOP to any message to opt out, or HELP for help. Full program terms are in our <Link href="/terms#sms">Terms of Service</Link>.
          </p>
          <p className={s.body}>
            No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. Information sharing to subcontractors in support services, such as customer service, is permitted. All other use case categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
          </p>

          <h2 className={s.h3}>How we protect phone numbers and text message consent records</h2>
          <ul className={s.list}>
            <li className={s.listItem}><span className="proof-dot" aria-hidden="true" />This site and our booking forms are served only over encrypted HTTPS connections, and unencrypted HTTP requests to this site are redirected to HTTPS, so the phone number and choices you submit are encrypted in transit.</li>
            <li className={s.listItem}><span className="proof-dot" aria-hidden="true" />Our booking forms are hosted by HighLevel, the same provider that sends our text messages, so your phone number and text message choices are submitted directly to the system that sends our texts and records opt-outs.</li>
          </ul>

          <h2 className={s.h3}>Cookies</h2>
          <p className={s.body}>
            The site uses cookies for analytics and for the 90-day attribution cookie described above. You can block or delete cookies in your browser settings; the site works without them.
          </p>

          <h2 className={s.h3}>Data retention and your rights</h2>
          <p className={s.body}>
            We keep submission records for as long as they are useful for serving clients and maintaining business records. You may request a copy of the information we hold about you, or ask us to correct or delete it, by emailing <a href="mailto:jesse@smbautomation.io">jesse@smbautomation.io</a> or calling <a href="tel:+13192552700">(319) 255-2700</a>. We respond within one business day.
          </p>

          <h2 className={s.h3}>Changes</h2>
          <p className={s.body}>
            If this policy changes, the updated version will be posted here with a new date at the top.
          </p>

          <h2 className={s.h3}>Contact us</h2>
          <p className={s.body}>
            SMBAUTOMATION LLC
            <br />
            Iowa City, Iowa
            <br />
            Phone: <a href="tel:+13192552700">(319) 255-2700</a>
            <br />
            Email: <a href="mailto:jesse@smbautomation.io">jesse@smbautomation.io</a>
          </p>
        </div>
      </section>
    </>
  );
}
