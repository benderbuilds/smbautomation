import type { Metadata } from 'next';
import s from '@/components/ContentPage.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms that govern use of smbautomation.io and purchases of SMB Automation services.',
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
          <p className={s.legalMeta}>Last updated July 2026</p>

          <p className={s.body}>
            These terms govern your use of smbautomation.io and your purchase of services from SMB Automation. By using the site or purchasing a service, you agree to them. Questions can be sent to jesse@smbautomation.io.
          </p>

          <h2 className={s.h3}>Services</h2>
          <p className={s.body}>
            SMB Automation provides business analysis and automation consulting services, including the Business Efficiency Audit ($1,500), the Single Workflow Audit ($495), and implementation projects scoped per engagement. Each service&apos;s scope, deliverables, and timeline are described on this site or in a written agreement.
          </p>

          <h2 className={s.h3}>Payments and refunds</h2>
          <p className={s.body}>
            The Single Workflow Audit is paid through Stripe at checkout. The Business Efficiency Audit is invoiced after the fit call. The Business Efficiency Audit carries a findings guarantee: if the audit does not identify at least $15,000 in annualized time or revenue opportunity, we refund the full fee and you keep the roadmap. Audit fees may be credited toward larger engagements as described on the relevant service page. Implementation work is governed by its own written agreement.
          </p>

          <h2 className={s.h3}>Deliverables and ownership</h2>
          <p className={s.body}>
            Audit deliverables belong to your business once the fee is paid. You may implement recommendations internally, with another provider, or with us. Recommendations are professional opinions based on the information you provide; estimates of time savings, cost, and revenue are good-faith projections, not guarantees of outcome.
          </p>

          <h2 className={s.h3}>Your responsibilities</h2>
          <p className={s.body}>
            Audits depend on accurate information about your business. You are responsible for the accuracy of what you share and for decisions made based on the deliverables. You remain responsible for compliance with laws and regulations applicable to your business.
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
        </div>
      </section>
    </>
  );
}
