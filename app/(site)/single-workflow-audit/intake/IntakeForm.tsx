'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import s from './page.module.css';

const EMPTY = {
  name: '',
  email: '',
  company: '',
  workflow: '',
  software: '',
  volume: '',
};

export default function IntakeForm() {
  const router = useRouter();
  const params = useSearchParams();
  const sessionId = params.get('session_id') ?? '';
  const [fields, setFields] = useState(EMPTY);
  const [status, setStatus] = useState<'idle' | 'sending'>('idle');
  const [error, setError] = useState('');

  function update<K extends keyof typeof EMPTY>(key: K, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setStatus('sending');
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, sessionId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setStatus('idle');
        return;
      }
      router.push('/single-workflow-audit/thank-you');
    } catch {
      setError('Something went wrong. Please try again.');
      setStatus('idle');
    }
  }

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <div className={s.row}>
        <div className={s.field}>
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={fields.name}
            onChange={(e) => update('name', e.target.value)}
          />
        </div>
        <div className={s.field}>
          <label htmlFor="email">Email used at checkout</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={fields.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </div>
      </div>

      <div className={s.field}>
        <label htmlFor="company">Company name</label>
        <input
          id="company"
          type="text"
          required
          autoComplete="organization"
          value={fields.company}
          onChange={(e) => update('company', e.target.value)}
        />
      </div>

      <div className={s.field}>
        <label htmlFor="workflow">
          Describe the workflow you want analyzed, from start to finish
        </label>
        <textarea
          id="workflow"
          required
          rows={5}
          value={fields.workflow}
          onChange={(e) => update('workflow', e.target.value)}
        />
      </div>

      <div className={s.field}>
        <label htmlFor="software">Which software is involved in this workflow?</label>
        <textarea
          id="software"
          required
          rows={3}
          value={fields.software}
          onChange={(e) => update('software', e.target.value)}
        />
      </div>

      <div className={s.field}>
        <label htmlFor="volume">
          Roughly how many times does this workflow run per month, and who runs it?
        </label>
        <textarea
          id="volume"
          required
          rows={3}
          value={fields.volume}
          onChange={(e) => update('volume', e.target.value)}
        />
      </div>

      {error && <p className={s.error} role="alert">{error}</p>}

      <button type="submit" className="btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Submitting…' : 'Submit intake →'}
      </button>
    </form>
  );
}
