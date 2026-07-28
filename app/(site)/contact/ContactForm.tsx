'use client';

import { useState } from 'react';
import { track } from '@/lib/analytics';
import s from './page.module.css';

export default function ContactForm() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || 'Something went wrong.');
      }
      track('contact_submit');
      setStatus('success');
    } catch (err) {
      setStatus('idle');
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
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={fields.name}
            onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div className={s.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={fields.email}
            onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
          />
        </div>
      </div>

      <div className={s.field}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          required
          rows={6}
          value={fields.message}
          onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
        />
      </div>

      {errorMsg && <div className={s.errorMsg} role="alert">{errorMsg}</div>}

      <button type="submit" className="btn-primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Send your message →'}
      </button>
    </form>
  );
}
