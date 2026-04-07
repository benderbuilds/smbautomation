'use client';

import { useState } from 'react';
import s from './page.module.css';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      revenue_range: (form.elements.namedItem('revenue_range') as HTMLSelectElement).value,
      how_can_we_help: (form.elements.namedItem('how_can_we_help') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || 'Something went wrong.');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className={s.form}>
        <div className={s.success}>
          Got it. We will be in touch within one business day.
        </div>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.row}>
        <div className={s.field}>
          <label htmlFor="name">Name *</label>
          <input id="name" name="name" type="text" required placeholder="Jane Smith" />
        </div>
        <div className={s.field}>
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required placeholder="jane@company.com" />
        </div>
      </div>

      <div className={s.row}>
        <div className={s.field}>
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" placeholder="(555) 000-0000" />
        </div>
        <div className={s.field}>
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" placeholder="Acme Corp" />
        </div>
      </div>

      <div className={s.row}>
        <div className={s.field}>
          <label htmlFor="revenue_range">Annual Revenue</label>
          <select id="revenue_range" name="revenue_range">
            <option value="">Select range</option>
            <option value="under_500k">Under $500K</option>
            <option value="500k_1m">$500K to $1M</option>
            <option value="1m_5m">$1M to $5M</option>
            <option value="5m_20m">$5M to $20M</option>
            <option value="20m_plus">$20M+</option>
          </select>
        </div>
        <div className={s.field}>
          <label htmlFor="how_can_we_help">How can we help?</label>
          <select id="how_can_we_help" name="how_can_we_help">
            <option value="">Select one</option>
            <option value="strategy">Business Analysis & Strategy</option>
            <option value="build">Custom Build / MVP</option>
            <option value="retainer">Ongoing Retainer</option>
            <option value="not_sure">Not sure yet</option>
          </select>
        </div>
      </div>

      <div className={s.field}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Tell us what you are working on..." />
      </div>

      {status === 'error' && <div className={s.errorMsg}>{errorMsg}</div>}

      <button type="submit" className={s.submitBtn} disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send Your Message →'}
      </button>
    </form>
  );
}
