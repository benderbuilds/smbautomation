import Link from 'next/link';
import s from './OfferSection.module.css';

const INCLUDES = [
  'Detailed pre-audit questionnaire',
  '60- to 90-minute workflow discovery session',
  'Review of your existing software and major recurring processes',
  'Optional input from relevant employees',
  'Eight to fifteen prioritized opportunities',
  'Estimated time, labor, capacity, and revenue impact',
  'Recommended software and automation approach',
  'Opportunity scorecard',
  'Prioritized 90-day roadmap',
  'Implementation budget ranges',
  '60-minute findings presentation',
  'Complete written playbook',
  'Delivery within seven business days after discovery',
];

export default function OfferSection() {
  return (
    <section className={s.section} id="offer">
      <div className={s.inner}>
        <span className="eyebrow">THE BUSINESS EFFICIENCY AUDIT</span>
        <h2 className={s.headline}>Find your highest-value automation opportunities.</h2>
        <div className={s.offerBox}>
          <div className={s.priceBlock}>
            <p className={s.price}>$1,500 fixed fee</p>
            <p className={s.priceSub}>
              For established businesses that want a clear, company-wide view of where automation and process improvement can create the greatest return.
            </p>
          </div>
          <div className={s.includes}>
            <p className={s.includesTitle}>Your audit includes:</p>
            <ul className={s.includesList}>
              {INCLUDES.map((item) => (
                <li key={item} className={s.includesItem}>
                  <span className="proof-dot" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={s.callout}>
            <p>
              <strong>The findings guarantee.</strong> If the audit does not identify at least $15,000 in annualized time or revenue opportunity, we refund the full fee and you keep the roadmap.
            </p>
          </div>
          <p className={s.creditNote}>
            The $1,500 fee may be applied toward an implementation project of $7,500 or more started within 30 days.
          </p>
          <div className={s.ctaBlock}>
            <Link href="/apply" className="btn-primary">Apply for the Audit →</Link>
            <p className={s.supporting}>
              Applications take about three minutes. Qualified businesses can book a 20-minute fit call immediately on the next screen.
            </p>
            <p className={s.fitLine}>
              Built for companies with 5 to 100 employees and either $1 million or more in annual revenue, or 400 or more customer transactions, appointments, service calls, or units per month.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
