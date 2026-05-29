import s from './ProblemSection.module.css';

export default function ProblemSection() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <span className="eyebrow">THE PROBLEM</span>
        <h2 className={s.headline}>Most people we talk to don&apos;t know where to start with AI.</h2>
        <p className={s.body}>
          We partner with you to understand your day to day and find the biggest opportunities where AI, custom software, or off-the-shelf solutions can be implemented to save time and make more money.
        </p>
      </div>
    </section>
  );
}
