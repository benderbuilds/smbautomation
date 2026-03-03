'use client';

const WF_STEPS = [
  { icon: "📞", brand: "Inbound",  label: "Missed Call",      sub: "Lead calls after hours",                    trigger: true },
  { icon: "⚡", brand: "Router",   label: "Trigger Fires",    sub: "Automation detects the missed call",        badge: "< 5 sec" },
  { icon: "🤖", brand: "AI",       label: "AI Drafts SMS",    sub: "Reply written in your brand voice" },
  { icon: "💬", brand: "SMS",      label: "Text Delivered",   sub: "Lead receives message with booking link",   badge: "< 60 sec" },
  { icon: "📅", brand: "Calendar", label: "Appointment Set",  sub: "Lead self-books directly from their phone" },
  { icon: "🗂️", brand: "CRM",     label: "Lead Logged",      sub: "Contact and booking synced automatically" },
];

export default function WorkflowDiagram() {
  return (
    <section className="wf-section" id="workflow">
      <div className="wf-inner">
        <div className="wf-header">
          <div>
            <span className="label-tag lt">What Happens When a Lead Comes In</span>
            <h2 className="h2 lt" style={{ marginBottom: "0.5rem" }}>Every step runs automatically.</h2>
            <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Lead-to-Booking Pipeline &nbsp;·&nbsp; Local Services Example
            </p>
          </div>
          <a href="#contact" className="btn-primary">Build This For Me</a>
        </div>

        <div className="wf-canvas">
          <div className="wf-row">
            {WF_STEPS.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
                <div className="wf-step">
                  {step.trigger && <div className="wf-trigger">Trigger</div>}
                  <div className="wf-node">
                    {step.badge && <div className="wf-badge">{step.badge}</div>}
                    <span className="wf-icon">{step.icon}</span>
                    <span className="wf-brand">{step.brand}</span>
                  </div>
                  <div className="wf-lbl">
                    <span className="wf-lt">{step.label}</span>
                    <span className="wf-ls">{step.sub}</span>
                  </div>
                </div>
                {i < WF_STEPS.length - 1 && (
                  <div className="wf-connector">
                    <div className="wf-line-wrap">
                      <div className="wf-line" />
                      <div className="wf-dot" style={{ animationDelay: `${i * 0.35}s` }} />
                      <span className="wf-arrowhead">▶</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="wf-outcomes">
            {[
              { icon: "⚡", title: "Every lead touched in under 60 seconds",       sub: "While you're on the job or asleep" },
              { icon: "📅", title: "Qualified leads book directly on your calendar", sub: "No back and forth. No dropped balls." },
              { icon: "🔁", title: "Warm leads stay in a nurture sequence",         sub: "Follow-up runs for weeks without you" },
              { icon: "✅", title: "You only talk to people ready to buy",          sub: "Your time goes to closing, not chasing" },
            ].map((r, i) => (
              <div key={i} className="wf-outcome">
                <span className="oc-icon">{r.icon}</span>
                <span className="oc-t">{r.title}</span>
                <span className="oc-s">{r.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
