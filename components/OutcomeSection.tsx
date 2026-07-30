import s from './OutcomeSection.module.css';

const QUESTIONS = [
  {
    q: 'Where is your business losing time and money?',
    a: 'We document the workflows consuming employee time, delaying customers, causing mistakes, and letting revenue fall through the cracks.',
  },
  {
    q: 'Which opportunities should come first?',
    a: 'Every recommendation is ranked by potential impact, cost, complexity, risk, and expected payback.',
  },
  {
    q: 'What is each improvement worth?',
    a: 'We estimate the weekly time savings, annual labor value, additional capacity, and potential revenue connected to each opportunity.',
  },
  {
    q: 'How should you implement it?',
    a: 'You receive recommended tools, workflow steps, budget ranges, and a prioritized 90-day roadmap.',
  },
];

export default function OutcomeSection() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <span className="eyebrow">WHAT YOU WILL KNOW</span>
        <h2 className={s.headline}>Stop guessing what to automate next.</h2>
        <p className={s.body}>Your audit answers four questions.</p>
        <div className={s.grid}>
          {QUESTIONS.map((item) => (
            <div key={item.q} className={s.card}>
              <h3 className={s.q}>{item.q}</h3>
              <p className={s.a}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
