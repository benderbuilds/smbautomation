import s from './PhilosophySection.module.css';

const PLAN_POINTS = [
  'What should be fully automated',
  'What should be partially automated',
  'What should remain human',
  'Where human review is required',
  'What is not worth changing',
];

export default function PhilosophySection() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <h2 className={s.headline}>We do not automate work just because we can.</h2>
        <p className={s.body}>
          Some tasks should stay human. Important customer conversations, sensitive decisions, relationship building, and work requiring real judgment should not be handed blindly to software.
        </p>
        <p className={s.lead}>A strong automation plan identifies:</p>
        <ul className={s.list}>
          {PLAN_POINTS.map((p) => (
            <li key={p} className={s.item}>
              <span className="proof-dot" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
        <p className={s.closing}>That judgment is part of the audit.</p>
      </div>
    </section>
  );
}
