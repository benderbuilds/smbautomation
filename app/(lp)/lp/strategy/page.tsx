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
      website: (form.elements.namedItem('website') as HTMLInputElement).value,
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
        <label htmlFor="lp-website">Website URL</label>
        <input id="lp-website" name="website" type="url" placeholder="https://yourbusiness.com" />
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
          We&apos;ll show you exactly where your business is invisible online.
        </h1>
        <p className={s.sub}>
          A 1-hour SEO, Google Business Profile, and social media analysis. You get a specific, prioritized action plan showing exactly where you&apos;re losing to competitors — and what to fix first.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <ul className={s.proofPoints}>
            {[
              'SEO audit: where you rank, where you don\'t, and what\'s costing you traffic',
              'Google Business Profile teardown with specific fixes',
              'Social media gap analysis against your top 3 competitors',
            ].map(point => (
              <li key={point} className={s.proofPoint}>
                <span className="proof-dot" style={{ marginTop: '0.45em' }} />
                {point}
              </li>
            ))}
          </ul>
          <a href="#intake" className="btn-primary">Claim Your Strategy Session →</a>
        </div>
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
            Fill out the form below. We review every submission and follow up within one business day to schedule your session.
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
              q: 'What exactly do you analyze?',
              a: 'Your search engine rankings and keyword gaps, your Google Business Profile (completeness, reviews, visibility), and your social media presence compared to your top 3 competitors. You get a specific, prioritized action plan for each.',
            },
            {
              q: 'How long does the session take?',
              a: 'The live session is 1 hour. You will receive a written summary of findings and action items within 48 hours.',
            },
            {
              q: 'Is this just a sales pitch?',
              a: 'No. You will receive real analysis with specific findings about your business. Whether you hire us after or not is entirely up to you.',
            },
            {
              q: 'What should I prepare?',
              a: 'Nothing beyond your website URL and the names of 2-3 competitors. We do the research before the session so we can spend the hour on findings and action steps.',
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
