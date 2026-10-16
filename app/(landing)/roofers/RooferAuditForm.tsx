'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { newEventId, trackStandard } from '@/lib/analytics';
import { LEAD_RANGES } from '@/lib/rooferAudit';
import s from './roofers.module.css';

export const BOOKING_PREFILL_KEY = 'roofer_audit_prefill';

export default function RooferAuditForm() {
  const router = useRouter();
  const [fields, setFields] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    monthlyLeads: '',
    website: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set =
    (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    const eventId = newEventId();
    try {
      const res = await fetch('/api/roofer-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, eventId }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || 'Something went wrong. Try again.');
      }
      trackStandard(
        'Lead',
        'generate_lead',
        { content_name: 'roofer_audit', monthly_leads: fields.monthlyLeads },
        eventId
      );
      try {
        sessionStorage.setItem(
          BOOKING_PREFILL_KEY,
          JSON.stringify({ name: fields.name, email: fields.email })
        );
      } catch {
        /* booking still works, just without prefill */
      }
      router.push('/roofers/thank-you');
    } catch (err) {
      setStatus('idle');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <p className={s.formTitle}>Get your free missed-revenue audit</p>
      <div className={s.formRow}>
        <div className={s.field}>
          <label htmlFor="ra-name">Name</label>
          <input id="ra-name" name="name" autoComplete="name" required value={fields.name} onChange={set('name')} />
        </div>
        <div className={s.field}>
          <label htmlFor="ra-company">Company</label>
          <input id="ra-company" name="company" autoComplete="organization" required value={fields.company} onChange={set('company')} />
        </div>
      </div>
      <div className={s.formRow}>
        <div className={s.field}>
          <label htmlFor="ra-phone">Phone</label>
          <input id="ra-phone" name="phone" type="tel" autoComplete="tel" required value={fields.phone} onChange={set('phone')} />
        </div>
        <div className={s.field}>
          <label htmlFor="ra-email">Email</label>
          <input id="ra-email" name="email" type="email" autoComplete="email" required value={fields.email} onChange={set('email')} />
        </div>
      </div>
      <div className={s.field}>
        <label htmlFor="ra-leads">Approx. leads per month</label>
        <select id="ra-leads" name="monthlyLeads" required value={fields.monthlyLeads} onChange={set('monthlyLeads')}>
          <option value="" disabled>
            Select a range
          </option>
          {LEAD_RANGES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {/* Honeypot: hidden from people, filled by bots. */}
      <div className={s.honeypot} aria-hidden="true">
        <label htmlFor="ra-website">Website</label>
        <input id="ra-website" name="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={set('website')} />
      </div>

      {errorMsg && (
        <p className={s.formError} role="alert">
          {errorMsg}
        </p>
      )}

      <button type="submit" className={`btn-orange ${s.submit}`} disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Show me what I’m losing →'}
      </button>
      <p className={s.consent}>
        Free. 20 minutes. No pitch. By submitting, you agree SMB Automation may contact you by phone,
        text, or email about your audit. Message and data rates may apply. Reply STOP to opt out.
      </p>
    </form>
  );
}
