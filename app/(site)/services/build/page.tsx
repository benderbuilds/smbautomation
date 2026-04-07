import type { Metadata } from 'next';
import s from '../detail.module.css';

export const metadata: Metadata = {
  title: '0-1 MVP Builds & Custom Development',
  description: 'Custom automations, client-facing apps, AI workflows, and internal tools. Every project scoped around a measurable outcome. $5K to $25K.',
  alternates: { canonical: 'https://smbautomation.io/services/build' },
};

const CALENDLY = 'https://calendly.com/jesse-smbautomation/30min';

export default function BuildPage() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow-light">Service 02</span>
          <h1 className={s.headline}>0-1 MVP Builds & Custom Development</h1>
          <p className={s.heroSub}>
            We build the tools your business is missing. Every project starts with a defined ROI target. You know what success looks like before we write a single line of code.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Book a Strategy Call →
          </a>
        </div>
      </section>

      <div className={s.sectionBg} style={{ background: 'var(--bg)' }}>
        <div className={s.section}>
          <h2 className={s.sectionTitle}>What we build</h2>
          <div className={s.grid}>
            {[
              { title: 'Custom automation workflows', desc: 'n8n, Make, direct API integrations. Eliminate manual steps that cost you time and accuracy.' },
              { title: 'Client-facing apps and dashboards', desc: 'Portals, booking tools, reporting dashboards. Built to match your brand and your workflow.' },
              { title: 'AI-powered tools', desc: 'Chatbots, content systems, lead scoring, and document processors trained on your business.' },
              { title: 'Internal operations tools', desc: 'Job tracking, quoting systems, team dashboards. Infrastructure your team will actually use.' },
              { title: 'Data pipelines and reporting', desc: 'Automated reporting that surfaces the numbers you need without manual exports.' },
            ].map(item => (
              <div key={item.title} className={s.gridItem}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={s.sectionBg} style={{ background: 'var(--bg-white)' }}>
        <div className={s.section}>
          <h2 className={s.sectionTitle}>Our approach</h2>
          <div className={s.timeline}>
            {[
              { step: 'Discovery', title: 'Scope and ROI definition', desc: 'We agree on the outcome, the success metric, and the budget before any work begins.' },
              { step: 'Prototype', title: 'Rapid prototype', desc: 'A working prototype in 5 to 7 days so you can validate the approach before full build.' },
              { step: 'Build', title: 'Full build', desc: 'We build to production quality. No shortcuts that create technical debt you will pay for later.' },
              { step: 'Deploy', title: 'Deployment and handoff', desc: 'We deploy, document, and walk you through everything. You own the code and the infrastructure.' },
              { step: 'Measure', title: 'Results review', desc: 'Two weeks after launch, we review the numbers against the original ROI target.' },
            ].map(step => (
              <div key={step.step} className={s.timelineStep}>
                <div className={s.timelineNum}>{step.step}</div>
                <div className={s.timelineText}>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={s.investment}>
            <h3>Investment</h3>
            <p>Build projects range from $5,000 to $25,000 depending on scope. Every project includes a defined ROI target before we start.</p>
          </div>
        </div>
      </div>

      <section className={s.ctaSection}>
        <h2 className={s.ctaHeadline}>Have something specific in mind?</h2>
        <p className={s.ctaSub}>Book a call and tell us what you want to build. We will scope it and tell you what it will take.</p>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Book a Strategy Call →
        </a>
      </section>
    </>
  );
}
