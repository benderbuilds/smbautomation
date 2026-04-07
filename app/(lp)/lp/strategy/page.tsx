'use client';

import Link from 'next/link';
import { useState } from 'react';
import s from './page.module.css';

const CALENDLY = 'https://calendly.com/jesse-smbautomation/30min';

function IntakeForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      company: (form.elements.namedItem('business_type') as HTMLInputElement).value,
      revenue_range: (form.elements.namedItem('revenue') as HTMLSelectElement).value,
      how_can_we_help: 'strategy',
      message: (form.elements.namedItem('challenge') as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Something went wrong.');
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Failed to submit. Please try again or email us directly.');
    }
  }

  if (status === 'success') {
    return (
      <div className={s.success}>
        We have your information. Expect an email from us within one business day.
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.field}>
        <label htmlFor="lp-name">Full Name *</label>
        <input id="lp-name" name="name" type="text" required placeholder="Jane Smith" />
      </div>
      <div className={s.field}>
        <label htmlFor="lp-email">Email *</label>
        <input id="lp-email" name="email" type="email" required placeholder="jane@company.com" />
      </div>
      <div className={s.field}>
        <label htmlFor="lp-business">Business Type</label>
        <input id="lp-business" name="business_type" type="text" placeholder="e.g. Med spa, property management..." />
      </div>
      <div className={s.field}>
        <label htmlFor="lp-revenue">Estimated Annual Revenue</label>
        <select id="lp-revenue" name="revenue">
          <option value="">Select range</option>
          <option value="under_500k">Under $500K</option>
          <option value="500k_1m">$500K to $1M</option>
          <option value="1m_5m">$1M to $5M</option>
          <option value="5m_20m">$5M to $20M</option>
          <option value="20m_plus">$20M+</option>
        </select>
      </div>
      <div className={s.field}>
        <label htmlFor="lp-challenge">Biggest business challenge right now</label>
        <textarea id="lp-challenge" name="challenge" placeholder="What is the one thing holding your business back most right now?" />
      </div>
      {status === 'error' && <p style={{ fontSize: '0.875rem', color: '#c0392b' }}>{errorMsg}</p>}
      <button type="submit" className={s.submitBtn} disabled={status === 'loading'}>
        {status === 'loading' ? 'Submitting...' : 'Claim Your Strategy Session →'}
      </button>
    </form>
  );
}

export default function LPStrategyPage() {
  return (
    <div className={s.lpWrap}>
      <nav className={s.lpNav}>
        <Link href="/" className={s.logo}>
          <span className={s.logoSmb}>SMB</span>
          <span className={s.logoAuto}> AUTOMATION</span>
        </Link>
      </nav>

      <section className={s.hero}>
        <span className="eyebrow-light">Limited Availability</span>
        <h1 className={s.headline}>
          We will find $50,000+ in hidden revenue in your business. Guaranteed.
        </h1>
        <p className={s.sub}>
          A 2-week deep analysis of your operations, competitors, and customer journey. You get a prioritized growth roadmap with dollar values attached to every recommendation.
        </p>
        <ul className={s.proofPoints}>
          {[
            'Full competitor landscape analysis',
            'Revenue leak identification with dollar estimates',
            'Prioritized roadmap you can execute immediately',
          ].map(point => (
            <li key={point} className={s.proofPoint}>
              <span className="proof-dot" style={{ marginTop: '0.45em' }} />
              {point}
            </li>
          ))}
        </ul>
        <a href="#intake" className="btn-primary">Claim Your Strategy Session →</a>
      </section>

      <section className={s.socialProof}>
        <p className={s.proofQuote}>
          &quot;The roadmap they delivered identified three revenue leaks we had no idea existed. We fixed the first one in two weeks and recovered $18,000 in the following month.&quot;
        </p>
        <p className={s.proofAttrib}>Property Management Client</p>
      </section>

      <section className={s.formSection} id="intake">
        <div className={s.formInner}>
          <h2 className={s.formTitle}>Claim your strategy session</h2>
          <p className={s.formSub}>
            Fill out the form below. We review every application and follow up within one business day.
          </p>
          <IntakeForm />
        </div>
      </section>

      <a href="#intake" className={s.ctaBanner}>
        Claim Your Strategy Session →
      </a>

      <section className={s.faq}>
        <div className={s.faqInner}>
          <h2 className={s.faqTitle}>Common questions</h2>
          {[
            {
              q: 'What is included in the strategy engagement?',
              a: 'Competitor landscape analysis, customer journey mapping, revenue leak identification, tech stack audit, and a prioritized growth roadmap with dollar values attached to every recommendation. Delivered as a recorded walkthrough and a written PDF.',
            },
            {
              q: 'How long does it take?',
              a: 'Most strategy engagements are completed within 10 business days from your kickoff call.',
            },
            {
              q: 'What does it cost?',
              a: 'Strategy engagements start at $2,500. We will confirm the investment on our call based on your business complexity.',
            },
            {
              q: 'What happens after the strategy engagement?',
              a: 'You get the roadmap. Some clients execute it independently. Others work with us to build and scale. Either way, you own the analysis.',
            },
          ].map(item => (
            <div key={item.q} className={s.faqItem}>
              <div className={s.faqQ}>{item.q}</div>
              <div className={s.faqA}>{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
