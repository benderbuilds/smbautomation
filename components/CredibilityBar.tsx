import s from './CredibilityBar.module.css';

const STATS = [
  { value: '$200M', label: 'REAL ESTATE PORTFOLIO OPERATED' },
  { value: '1,400+', label: 'UNITS UNDER MANAGEMENT' },
  { value: '$24K to $25M', label: 'ARR SCALED AT A HEALTH-TECH COMPANY' },
  { value: '13 years', label: 'BUILDING AND OPERATING BUSINESSES' },
];

export default function CredibilityBar() {
  return (
    <section className={s.section}>
      <div className={s.grid}>
        {STATS.map((stat) => (
          <div key={stat.label} className={s.cell}>
            <p className={s.value}>{stat.value}</p>
            <p className={s.label}>{stat.label}</p>
          </div>
        ))}
      </div>
      <p className={s.caption}>The audit is built on operating experience, not software sales experience.</p>
    </section>
  );
}
