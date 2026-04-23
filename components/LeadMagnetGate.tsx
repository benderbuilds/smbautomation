'use client';

import { useState } from 'react';
import s from './LeadMagnetGate.module.css';

export default function LeadMagnetGate() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className={s.gate}>
      <div className={s.inner}>
        <span className="eyebrow">FREE CHECKLIST</span>
        <h2 className={s.headline}>Not ready for a call? Start here.</h2>
        <p className={s.sub}>
          The 12-point SMB Automation Audit. The same framework we run in every paid strategy session. It&apos;s the fastest way to see where your business is leaking time and revenue. Free. No credit card. No call required.
        </p>

        {status === 'success' ? (
          <div className={s.success}>
            <div className={s.successLine}>
              <span className={s.successDot} />
              Checklist sent. Check your inbox in the next 60 seconds.
            </div>
            <p className={s.successSub}>
              Didn&apos;t get it?{' '}
              <a href="mailto:jesse@smbautomation.io">Email jesse@smbautomation.io</a>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={s.form}>
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={s.input}
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-orange"
            >
              {status === 'sending' ? 'SENDING...' : 'SEND ME THE CHECKLIST →'}
            </button>
          </form>
        )}

        {status !== 'success' && (
          <p className={s.disclaimer}>We send it immediately. Unsubscribe with one click.</p>
        )}
      </div>
    </section>
  );
}
