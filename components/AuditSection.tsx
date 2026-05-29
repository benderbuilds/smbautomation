import s from './AuditSection.module.css';

const ITEMS = [
  'A documented look at every workflow that costs you time or money.',
  'ROI scoring on each opportunity, with dollar projections.',
  'A prioritized 90-day plan, scoped to your size and budget.',
];

export default function AuditSection() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <span className="eyebrow">THE APPROACH</span>
        <h2 className={s.headline}>The business audit.</h2>
        <p className={s.body}>
          A deep look at your operation. We walk your workflows with you, score every bottleneck by ROI, and hand you a prioritized plan with the dollar impact of each fix. The audit is yours whether or not we build from it.
        </p>
        <ol className={s.list}>
          {ITEMS.map((text, i) => (
            <li key={i} className={s.item}>
              <span className={s.num}>{i + 1}</span>
              <span className={s.itemText}>{text}</span>
            </li>
          ))}
        </ol>
        <a href="#apply" className="btn-orange">Get your audit →</a>
      </div>
    </section>
  );
}
