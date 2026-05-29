import s from './EngagementLadder.module.css';

export default function EngagementLadder() {
  return (
    <section className={s.section} id="how-we-work">
      <div className={s.inner}>
        <div className={s.header}>
          <span className="eyebrow">HOW WE WORK</span>
          <h2 className={s.headline}>Diagnosis first. Build second.</h2>
          <p className={s.intro}>
            Most automation work solves problems nobody has. We start by finding the ones that actually cost you, then build only what earns its keep.
          </p>
        </div>

        <div className={s.grid}>
          <div className={s.card}>
            <div className={s.cardTitle}>Free Automated Audit</div>
            <p className={s.cardBody}>
              A fast, automated look at where your online presence and lead intake are leaking opportunities. Delivered in 24 hours. No call. No pitch.
            </p>
            <a href="#free-audit" className={s.cardCta}>START FREE →</a>
          </div>

          <div className={`${s.card} ${s.cardFeatured}`}>
            <div className={s.cardTitle}>Operations Opportunity Map</div>
            <p className={s.cardBody}>
              The deep diagnostic. We map your workflows, score every bottleneck by ROI, and hand you a prioritized plan with the dollar impact of each fix. You own the map whether or not we build it.
            </p>
            <a href="#apply" className={s.cardCta}>REQUEST DETAILS →</a>
          </div>

          <div className={s.card}>
            <div className={s.cardTitle}>Custom Build</div>
            <p className={s.cardBody}>
              We build the automations from the map. Reliable, hosted, integrated with the tools you already run. Scoped from proven ROI, so you know the payback before we start.
            </p>
            <a href="#apply" className={s.cardCta}>REQUEST DETAILS →</a>
          </div>

          <div className={s.card}>
            <div className={s.cardTitle}>Embedded Partner</div>
            <p className={s.cardBody}>
              Ongoing. We stay embedded, maintain what we built, and work down the map quarter by quarter. For owners who want a partner, not a one-and-done project.
            </p>
            <a href="#apply" className={s.cardCta}>REQUEST DETAILS →</a>
          </div>
        </div>

        <p className={s.pricing}>
          Every engagement is scoped to the size and complexity of your operation. Tell us about your business and we will send specifics.
        </p>
      </div>
    </section>
  );
}
