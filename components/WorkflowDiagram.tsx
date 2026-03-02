'use client';

const WF_STEPS = [
  { icon: "📞", brand: "Inbound", label: "Missed Call", sub: "Lead calls after hours", trigger: true },
  { icon: "⚡", brand: "n8n", label: "Trigger Fires", sub: "Automation detects the missed call", badge: "< 5 sec" },
  { icon: "🤖", brand: "OpenAI", label: "AI Drafts SMS", sub: "Reply written in your brand's voice" },
  { icon: "💬", brand: "Twilio", label: "Text Delivered", sub: "Lead receives message with booking link", badge: "< 60 sec" },
  { icon: "📅", brand: "Calendly", label: "Appointment Set", sub: "Lead self-books directly from their phone" },
  { icon: "🗂️", brand: "CRM / GHL", label: "Lead Logged", sub: "Contact and booking synced automatically" },
];

export default function WorkflowDiagram() {
  return (
    <section className="wf-section" id="workflow">
      <div className="wf-inner">
        <div className="wf-header">
          <div>
            <div className="label lt">See It In Action</div>
            <h2 className="h2 lt" style={{ marginBottom: "0.4rem" }}>A missed call becomes a booked appointment</h2>
            <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.85rem", letterSpacing: "0.01em" }}>
              Missed Call Text-Back &nbsp;·&nbsp; Local Services Automation
            </p>
          </div>
          <a href="#contact" className="btn-primary" style={{ flexShrink: 0 }}>Build This For Me</a>
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
                      <div className="wf-dot" style={{ animationDelay: `${i * 0.3}s` }} />
                      <span className="wf-arrowhead">▶</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="wf-outcomes">
            {[
              { icon: "⏱️", title: "Responds in under 60 seconds", sub: "While competitors go to voicemail" },
              { icon: "📈", title: "Captures 30% more leads", sub: "From calls that would have been lost" },
              { icon: "🛌", title: "Works while you sleep", sub: "No staff needed for after-hours inquiries" },
              { icon: "🔁", title: "Runs on every missed call", sub: "Consistent follow-up, zero manual effort" },
            ].map((r, i) => (
              <div key={i} className="wf-outcome">
                <span className="oc-icon">{r.icon}</span>
                <div><span className="oc-t">{r.title}</span><span className="oc-s">{r.sub}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
