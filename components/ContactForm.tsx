'use client';

import { useState } from 'react';
import { track } from '@/lib/analytics';
import s from './ContactForm.module.css';

const INTERESTS = [
  'Getting more leads',
  'Website / SEO',
  'Google Ads',
  'Facebook / Instagram Ads',
  'Lead follow-up automation',
  'Invoice / AR automation',
  'Review automation',
  'Not sure yet',
];

export default function ContactForm() {
  const [fields, setFields] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    message: '',
  });
  const [interests, setInterests] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  const toggleInterest = (value: string) =>
    setInterests((current) =>
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, interests }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || 'Something went wrong. Try again.');
      }
      track('contact_submit', { interests: interests.join(', ') });
      setStatus('success');
    } catch (err) {
      setStatus('idle');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className={s.form}>
        <div className={s.success}>
          <p className={s.successTitle}>Got it. Talk soon.</p>
          <p className={s.successBody}>
            We will look at what you sent and reply within one business day with where we think the
            biggest opportunities are. If something else comes to mind before then, email{' '}
            <a href="mailto:jesse@smbautomation.io">jesse@smbautomation.io</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={handleSubmit} noValidate={false}>
      <div className={s.row}>
        <div className={s.field}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            value={fields.name}
            onChange={set('name')}
          />
        </div>
        <div className={s.field}>
          <label htmlFor="business">Business name</label>
          <input
            id="business"
            name="business"
            type="text"
            autoComplete="organization"
            placeholder="Business name"
            value={fields.business}
            onChange={set('business')}
          />
        </div>
      </div>

      <div className={s.row}>
        <div className={s.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email address"
            value={fields.email}
            onChange={set('email')}
          />
        </div>
        <div className={s.field}>
          <label htmlFor="phone">
            Phone <span className={s.optional}>(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone number"
            value={fields.phone}
            onChange={set('phone')}
          />
        </div>
      </div>

      <fieldset className={s.fieldset}>
        <legend className={s.legend}>What would you like help with?</legend>
        <div className={s.options}>
          {INTERESTS.map((item) => {
            const checked = interests.includes(item);
            return (
              <label
                key={item}
                className={`${s.option} ${checked ? s.optionChecked : ''}`}
              >
                <input
                  type="checkbox"
                  name="interests"
                  value={item}
                  checked={checked}
                  onChange={() => toggleInterest(item)}
                />
                <span className={s.box} aria-hidden="true" />
                {item}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className={s.field}>
        <label htmlFor="message">Tell us a little about your business</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What you do, who you serve, and what you would like to improve."
          value={fields.message}
          onChange={set('message')}
        />
      </div>

      <div className={s.actions}>
        <button type="submit" className={`btn-orange ${s.submit}`} disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : "Let's Talk →"}
        </button>
        {errorMsg && <p className={s.error} role="alert">{errorMsg}</p>}
      </div>

      <p className={s.footnote}>
        No hard sell. We will start by understanding your business and seeing whether there is a good fit.
      </p>
    </form>
  );
}
