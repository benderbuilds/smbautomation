import type { Metadata } from 'next';
import Link from 'next/link';
import s from '@/components/ContentPage.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms that govern use of smbautomation.io and SMB Automation services.',
  alternates: { canonical: 'https://smbautomation.io/terms' },
};

export default function TermsPage() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow">LEGAL</span>
          <h1 className={s.headline}>Terms of Service</h1>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.inner}>
          <p className={s.legalMeta}>Last updated November 24, 2026</p>

          <p className={s.body}>
            These terms govern your use of smbautomation.io and your purchase of services from SMBAUTOMATION LLC, which operates SMB Automation. By using the site or purchasing a service, you agree to them. Questions can be sent to <a href="mailto:jesse@smbautomation.io">jesse@smbautomation.io</a> or (319) 255-2700.
          </p>

          <h2 className={s.h3}>Services</h2>
          <p className={s.body}>
            SMB Automation provides the Front Desk Assistant (AI phone answering and website chat) along with marketing, business analysis, and automation services, including audits, implementation projects, and ongoing engagements. Each engagement&apos;s scope, deliverables, timeline, and fees are described in a written agreement.
          </p>

          <h2 className={s.h3}>Payments and refunds</h2>
          <p className={s.body}>
            Front Desk Assistant plans are billed monthly as described in the free trial and billing section below. For other engagements, fees, payment schedule, and any refund terms are set out in the written agreement for each engagement. Implementation work is governed by its own written agreement.
          </p>

          <h2 className={s.h3}>Deliverables and ownership</h2>
          <p className={s.body}>
            Deliverables belong to your business once the applicable fee is paid. You may implement recommendations internally, with another provider, or with us. Recommendations are professional opinions based on the information you provide; estimates of time savings, cost, and revenue are good-faith projections, not guarantees of outcome.
          </p>

          <h2 className={s.h3}>Your responsibilities</h2>
          <p className={s.body}>
            Audits depend on accurate information about your business. You are responsible for the accuracy of what you share and for decisions made based on the deliverables. You remain responsible for compliance with laws and regulations applicable to your business.
          </p>

          <h2 className={s.h3} id="free-trial">Front Desk Assistant free trial and billing</h2>
          <ul className={s.list}>
            <li className={s.listItem}><span className="proof-dot" aria-hidden="true" /><span><strong>When it starts.</strong> Your 30-day free trial starts when you book your onboarding call at <Link href="/start-trial">smbautomation.io/start-trial</Link>. You add a payment card during onboarding.</span></li>
            <li className={s.listItem}><span className="proof-dot" aria-hidden="true" /><span><strong>After day 30.</strong> Unless you cancel, your plan is billed monthly at its listed price: Answer (voice or chat) $397 per month, or Front Desk (voice and chat) $797 per month. Current prices are listed in the <Link href="/#pricing">pricing section of our homepage</Link>. Multi-location and custom plans are priced in a written agreement.</span></li>
            <li className={s.listItem}><span className="proof-dot" aria-hidden="true" /><span><strong>How to cancel.</strong> Call <a href="tel:+13192552700">(319) 255-2700</a> or email <a href="mailto:jesse@smbautomation.io">jesse@smbautomation.io</a>. If you cancel before your trial ends, you will not be charged. After that, you can cancel anytime.</span></li>
          </ul>

          <h2 className={s.h3} id="sms">Text messaging terms</h2>
          <p className={s.body}>
            SMBAUTOMATION LLC offers two separate, optional text message programs:
          </p>
          <ul className={s.list}>
            <li className={s.listItem}><span className="proof-dot" aria-hidden="true" /><span><strong>Service texts (non-marketing):</strong> messages about our Front Desk Assistant and After Hours Answering services, such as your onboarding call and support questions.</span></li>
            <li className={s.listItem}><span className="proof-dot" aria-hidden="true" /><span><strong>Marketing texts:</strong> promotional messages, including special offers, discounts, and new product updates.</span></li>
          </ul>
          <p className={s.body}>
            <strong>Eligibility.</strong> You must be at least 18 years old to enroll in SMBAUTOMATION LLC text messages.
          </p>
          <p className={s.body}>
            <strong>How to join.</strong> Check the box for either program, or both, on the free trial signup form that appears when you book a trial onboarding call at <Link href="/start-trial">smbautomation.io/start-trial</Link>, and enter your mobile number. The boxes are optional and unchecked by default. Consent is not a condition of purchase or of starting a trial. Giving us a phone number without checking a box, including in our website chat, does not sign you up, and joining the service program does not sign you up for marketing texts.
          </p>
          <p className={s.body}>
            <strong>Message frequency and cost.</strong> Message frequency varies. Message and data rates may apply, according to your mobile plan.
          </p>
          <p className={s.body}>
            <strong>How to stop.</strong> You can cancel the SMS service at any time. Just reply STOP to any text message from us. After you opt out, you will no longer receive text messages from us. Replying STOP opts you out of both programs.
          </p>
          <p className={s.body}>
            <strong>Help.</strong> Reply HELP to any text message for help, or contact us at <a href="tel:+13192552700">(319) 255-2700</a> or <a href="mailto:jesse@smbautomation.io">jesse@smbautomation.io</a>.
          </p>
          <p className={s.body}>
            <strong>How to rejoin.</strong> If you opted out and want to receive text messages again, reply START to our text number, or contact us at <a href="tel:+13192552700">(319) 255-2700</a> or <a href="mailto:jesse@smbautomation.io">jesse@smbautomation.io</a> and tell us which program you want to rejoin.
          </p>
          <p className={s.body}>
            <strong>Delivery.</strong> Carriers are not liable for delayed or undelivered messages.
          </p>
          <p className={s.body}>
            <strong>Privacy.</strong> If you have any questions regarding privacy, please read our <Link href="/privacy">Privacy Policy</Link>, including its <Link href="/privacy#sms">text messaging section</Link>.
          </p>

          <h2 className={s.h3}>Limitation of liability</h2>
          <p className={s.body}>
            To the maximum extent permitted by law, SMB Automation&apos;s total liability arising from any service or use of this site is limited to the amount you paid for the service in question. We are not liable for indirect, incidental, or consequential damages.
          </p>

          <h2 className={s.h3}>Site content</h2>
          <p className={s.body}>
            Content on this site is provided for general information and may change without notice. The sample audit is an illustrative document describing a fictional company.
          </p>

          <h2 className={s.h3}>Changes</h2>
          <p className={s.body}>
            We may update these terms from time to time. The current version is always posted here with the date at the top. Continued use of the site after a change constitutes acceptance.
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
