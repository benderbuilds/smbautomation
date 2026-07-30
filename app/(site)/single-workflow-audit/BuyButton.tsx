'use client';

import { useState } from 'react';
import { track } from '@/lib/analytics';
import s from './page.module.css';

export default function BuyButton() {
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');
  const [error, setError] = useState('');

  async function onClick() {
    setError('');
    setStatus('loading');
    track('workflow_audit_checkout_start');
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || 'Checkout is temporarily unavailable. Please email jesse@smbautomation.io.');
        setStatus('idle');
        return;
      }
      window.location.href = data.url;
    } catch {
      setError('Checkout is temporarily unavailable. Please email jesse@smbautomation.io.');
      setStatus('idle');
    }
  }

  return (
    <div>
      <button className="btn-primary" onClick={onClick} disabled={status === 'loading'}>
        {status === 'loading' ? 'Opening checkout…' : 'Buy the Workflow Audit →'}
      </button>
      {error && <p className={s.checkoutError} role="alert">{error}</p>}
    </div>
  );
}
