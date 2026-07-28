import s from './HowItWorksSection.module.css';

const STEPS = [
  {
    title: 'Apply',
    body: 'Tell us about your business, team, software, and biggest operational challenges. Three minutes.',
  },
  {
    title: 'Complete discovery',
    body: 'We walk through how work moves through the business, where employees spend their time, and where customers experience delays.',
  },
  {
    title: 'We analyze the opportunities',
    body: 'We evaluate your processes, software, handoffs, bottlenecks, risks, and missed revenue.',
  },
  {
    title: 'We calculate the impact',
    body: 'We estimate the time, labor, capacity, and potential revenue tied to each recommendation.',
  },
  {
    title: 'You receive the roadmap',
    body: 'A prioritized playbook with tools, implementation steps, budget ranges, and a 90-day plan.',
  },
  {
    title: 'You decide what happens next',
    body: 'Implement it internally, use another provider, or ask us to execute the plan.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <span className="eyebrow">THE PROCESS</span>
        <h2 className={s.headline}>From operational friction to an actionable plan.</h2>
        <ol className={s.steps}>
          {STEPS.map((step, i) => (
            <li key={step.title} className={s.step}>
              <span className={s.number}>{i + 1}</span>
              <div>
                <h3 className={s.title}>{step.title}</h3>
                <p className={s.body}>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
