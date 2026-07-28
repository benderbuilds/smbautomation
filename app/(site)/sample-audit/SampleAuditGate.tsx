'use client';

import { useState } from 'react';
import { track } from '@/lib/analytics';
import s from './page.module.css';

export default function SampleAuditGate() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setStatus('sending');
    try {
      const res = await fetch('/api/sample-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setStatus('idle');
        return;
      }
      track('sample_audit_view');
      setStatus('done');
    } catch {
      setError('Something went wrong. Please try again.');
      setStatus('idle');
    }
  }

  if (status === 'done') {
    return (
      <div className={s.gate}>
        <h2 className={s.gateTitle}>Your sample audit is ready.</h2>
        <p className={s.gateBody}>
          We also emailed you a copy so you can share it with your team.
        </p>
        <a
          href="/assets/smb-automation-sample-audit.pdf"
          className="btn-primary"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('sample_audit_view', { action: 'download' })}
        >
          Download the sample audit →
        </a>
      </div>
    );
  }

  return (
    <form className={s.gate} onSubmit={onSubmit}>
      <h2 className={s.gateTitle}>Get the sample audit</h2>
      <p className={s.gateBody}>
        Enter your name and email and we will unlock the download and send you a copy.
      </p>
      <div className={s.field}>
        <label htmlFor="sa-name">Name</label>
        <input
          id="sa-name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={s.field}>
        <label htmlFor="sa-email">Email</label>
        <input
          id="sa-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {error && <p className={s.error} role="alert">{error}</p>}
      <button type="submit" className="btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'One moment…' : 'See the sample audit →'}
      </button>
    </form>
  );
}
