'use client';

const ROW1 = [
  { icon: "🌐", brand: "Any Source", label: "Web / Form Lead", sub: "Any inbound channel", badge: "Trigger" },
  { icon: "⚡", brand: "n8n", label: "n8n Router", sub: "Automation detects lead", badge: "< 2 sec" },
  { icon: "🤖", brand: "OpenAI", label: "AI Qualifier", sub: "Lead intent analyzed", badge: "GPT-4o" },
  { icon: "📊", brand: "CRM", label: "Lead Scored", sub: "Priority assigned automatically", badge: "Auto-logged" },
];

const ROW2 = [
  { icon: "💬", brand: "Twilio", label: "Personalized SMS", sub: "Sent in your brand voice", badge: "< 60 sec" },
  { icon: "📅", brand: "Calendly", label: "Auto-Book", sub: "Lead self-schedules", badge: "No back-forth" },
  { icon: "📋", brand: "Gmail", label: "Job Brief Sent", sub: "Pre-meeting prep delivered", badge: "Pre-meeting" },
  { icon: "✅", brand: "CRM", label: "Deal Tracked", sub: "Pipeline updated automatically", badge: "Auto-updated" },
];

const OUTCOMES = [
  { icon: "✅", title: "Every lead touched in under 60 seconds", sub: "No manual intervention required" },
  { icon: "📈", title: "30-50% more leads convert to meetings", sub: "Speed-to-lead is the biggest variable" },
  { icon: "🔁", title: "Warm leads nurtured automatically", sub: "60-90 day sequences, not one-and-done" },
  { icon: "🎯", title: "You only talk to qualified prospects", sub: "Your time goes to closing, not chasing" },
];

function WFRow({ steps }: { steps: typeof ROW1 }) {
  return (
    <div className="wf-row">
      {steps.map((step, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
          <div className="wf-step">
            {step.badge === "Trigger" && <div className="wf-trigger">Trigger</div>}
            <div className="wf-node">
              {step.badge && step.badge !== "Trigger" && <div className="wf-badge">{step.badge}</div>}
              <span className="wf-icon">{step.icon}</span>
              <span className="wf-brand">{step.brand}</span>
            </div>
            <div className="wf-lbl">
              <span className="wf-lt">{step.label}</span>
              <span className="wf-ls">{step.sub}</span>
            </div>
          </div>
          {i < steps.length - 1 && (
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
  );
}

export default function WorkflowDiagram() {
  return (
    <section className="wf-section" id="workflow">
      <div className="wf-inner">
        <div className="wf-header">
          <div>
            <div className="label lt">See It In Action</div>
            <h2 className="h2 lt" style={{ marginBottom: "0.4rem" }}>From First Touch to Closed Deal — Automated</h2>
            <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.85rem", letterSpacing: "0.01em" }}>
              Lead-to-Revenue Pipeline &nbsp;·&nbsp; Multi-System Automation
            </p>
          </div>
          <a href="#contact" className="btn-primary" style={{ flexShrink: 0 }}>Build This For Me</a>
        </div>

        <div className="wf-canvas">
          {/* Row 1: Capture & Qualify */}
          <div className="wf-row-label">Capture &amp; Qualify</div>
          <WFRow steps={ROW1} />

          {/* Branch connector */}
          <div className="wf-branch-wrap">
            <div className="wf-branch-center">
              <div className="wf-branch-line">
                <div className="wf-branch-dot-v" />
              </div>
              <span className="wf-hot-badge-v">HOT LEAD ↓</span>
            </div>
            <div className="wf-nurture-label">
              WARM / COLD <span>→</span> Nurture Sequence <span style={{ opacity: 0.5 }}>(60-90 day)</span>
            </div>
          </div>

          {/* Row 2: Convert & Close */}
          <div className="wf-row-label" style={{ marginTop: "0.5rem" }}>Convert &amp; Close</div>
          <WFRow steps={ROW2} />

          {/* Outcome cards */}
          <div className="wf-outcomes">
            {OUTCOMES.map((r, i) => (
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
