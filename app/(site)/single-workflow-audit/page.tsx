import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import BuyButton from './BuyButton';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Single Workflow Audit, $495',
  description:
    'A focused analysis of one defined process, for businesses that already know where the problem is but need a clear plan for fixing it. Fixed fee, $495, delivered within five business days.',
  alternates: { canonical: 'https://smbautomation.io/single-workflow-audit' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Single Workflow Audit',
  serviceType: 'Workflow analysis and automation consulting',
  description:
    'A focused analysis of one defined workflow: current-state process map, improvement opportunities, estimated time and financial impact, recommended software, and a written 30-day action plan.',
  provider: {
    '@type': 'Organization',
    name: 'SMB Automation',
    url: 'https://smbautomation.io',
  },
  areaServed: 'US',
  offers: {
    '@type': 'Offer',
    price: '495',
    priceCurrency: 'USD',
  },
};

const COMMON_WORKFLOWS = [
  'Lead intake and follow-up',
  'Scheduling',
  'Customer onboarding',
  'Invoice collection',
  'Reporting',
  'Review requests',
  'Estimate follow-up',
  'Document processing',
  'Maintenance requests',
  'Customer reactivation',
];

const INCLUDES = [
  'Structured intake',
  'Review of one defined workflow',
  'Current-state process map',
  'Three to five improvement opportunities',
  'Estimated time and financial impact',
  'Recommended software and automation approach',
  'Written 30-day action plan',
  '30-minute findings call',
  'Delivery within five business days',
];

export default function SingleWorkflowAuditPage() {
  const stripeEnabled = Boolean(process.env.STRIPE_SECRET_KEY);
  return (
    <>
      <Script
        id="swa-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <section className={s.section}>
        <div className={s.inner}>
          <h1 className={s.headline}>Fix one workflow that is costing your business time or money.</h1>
          <p className={s.sub}>
            A focused analysis of one defined process, for businesses that already know where the problem is but need a clear plan for fixing it.
          </p>

          <div className={s.workflows}>
            <p className={s.lead}>Common workflows:</p>
            <ul className={s.workflowList}>
              {COMMON_WORKFLOWS.map((w) => (
                <li key={w} className={s.workflowItem}>
                  <span className="proof-dot" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
          </div>

          <div className={s.offerBox}>
            <p className={s.price}>$495 fixed fee</p>
            <p className={s.lead}>Includes:</p>
            <ul className={s.includesList}>
              {INCLUDES.map((item) => (
                <li key={item} className={s.includesItem}>
                  <span className="proof-dot" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className={s.creditNote}>
              The $495 fee may be applied toward a Business Efficiency Audit or implementation project started within 30 days.
            </p>
            {stripeEnabled ? (
              <>
                <BuyButton />
                <p className={s.checkoutNote}>Direct Stripe checkout. No sales call required.</p>
              </>
            ) : (
              <>
                <Link href="/contact" className="btn-primary">Contact us to get started →</Link>
                <p className={s.checkoutNote}>
                  Send a message with the workflow you want analyzed and we will invoice you directly.
                </p>
              </>
            )}
          </div>

          <div className={s.scopeNote}>
            <p>
              This service covers one defined process. Businesses with multiple departments, disconnected systems, or several operational challenges should apply for the full Business Efficiency Audit instead.
            </p>
            <Link href="/apply" className={s.scopeLink}>Apply for the full audit →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
