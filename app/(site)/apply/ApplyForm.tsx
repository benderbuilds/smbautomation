'use client';

import { useRef, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { EMPLOYEE_OPTIONS, REVENUE_OPTIONS, VOLUME_OPTIONS, TIMELINE_OPTIONS } from '@/lib/qualify';
import { isFreeMail } from '@/lib/freemail';
import { track } from '@/lib/analytics';
import s from './ApplyForm.module.css';

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const INDUSTRY_OPTIONS = [
  'Property management',
  'Healthcare and wellness',
  'Home and local services',
  'Professional services',
  'Other',
];

const EMPTY = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  website: '',
  role: '',
  industry: '',
  employees: '',
  revenue: '',
  volume: '',
  friction: '',
  software: '',
  outcome: '',
  timeline: '',
};

type Fields = typeof EMPTY;

export default function ApplyForm() {
  const router = useRouter();
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'sending'>('idle');
  const [error, setError] = useState('');
  const startedRef = useRef(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof Fields>(key: K, value: string) {
    if (!startedRef.current) {
      startedRef.current = true;
      track('application_start');
    }
    setFields((f) => ({ ...f, [key]: value }));
  }

  const freeMailWarning = isFreeMail(fields.email);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setStatus('sending');
    try {
      const turnstileToken =
        (document.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement | null)
          ?.value ?? '';
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...fields,
          company_fax: honeypotRef.current?.value ?? '',
          turnstileToken,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setStatus('idle');
        return;
      }
      track('application_submit');
      track(data.qualified ? 'application_qualified' : 'application_unqualified');
      if (data.qualified) {
        const params = new URLSearchParams({
          name: `${fields.firstName} ${fields.lastName}`,
          email: fields.email,
          company: fields.company,
        });
        router.push(`/apply/qualified?${params.toString()}`);
      } else {
        router.push('/apply/received');
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setStatus('idle');
    }
  }

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <div className={s.row}>
        <div className={s.field}>
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            type="text"
            required
            autoComplete="given-name"
            value={fields.firstName}
            onChange={(e) => update('firstName', e.target.value)}
          />
        </div>
        <div className={s.field}>
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            type="text"
            required
            autoComplete="family-name"
            value={fields.lastName}
            onChange={(e) => update('lastName', e.target.value)}
          />
        </div>
      </div>

      <div className={s.row}>
        <div className={s.field}>
          <label htmlFor="email">Work email</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={fields.email}
            onChange={(e) => update('email', e.target.value)}
          />
          {freeMailWarning && (
            <p className={s.warning}>
              A work email helps us research your business before the call. You can still submit with this address.
            </p>
          )}
        </div>
        <div className={s.field}>
          <label htmlFor="phone">Phone number</label>
          <input
            id="phone"
            type="tel"
            required
            autoComplete="tel"
            value={fields.phone}
            onChange={(e) => update('phone', e.target.value)}
          />
        </div>
      </div>

      <div className={s.row}>
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
          <label htmlFor="website">Company website</label>
          <input
            id="website"
            type="text"
            required
            inputMode="url"
            placeholder="yourcompany.com"
            value={fields.website}
            onChange={(e) => update('website', e.target.value)}
          />
        </div>
      </div>

      <div className={s.row}>
        <div className={s.field}>
          <label htmlFor="role">Your role</label>
          <input
            id="role"
            type="text"
            required
            value={fields.role}
            onChange={(e) => update('role', e.target.value)}
          />
        </div>
        <div className={s.field}>
          <label htmlFor="industry">Primary industry</label>
          <select
            id="industry"
            required
            value={fields.industry}
            onChange={(e) => update('industry', e.target.value)}
          >
            <option value="" disabled>Select one</option>
            {INDUSTRY_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={s.row}>
        <div className={s.field}>
          <label htmlFor="employees">Number of employees</label>
          <select
            id="employees"
            required
            value={fields.employees}
            onChange={(e) => update('employees', e.target.value)}
          >
            <option value="" disabled>Select one</option>
            {EMPLOYEE_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className={s.field}>
          <label htmlFor="revenue">Annual revenue range</label>
          <select
            id="revenue"
            required
            value={fields.revenue}
            onChange={(e) => update('revenue', e.target.value)}
          >
            <option value="" disabled>Select one</option>
            {REVENUE_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={s.field}>
        <label htmlFor="volume">
          Approximate monthly transactions, appointments, service calls, or units under management
        </label>
        <select
          id="volume"
          required
          value={fields.volume}
          onChange={(e) => update('volume', e.target.value)}
        >
          <option value="" disabled>Select one</option>
          {VOLUME_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <div className={s.field}>
        <label htmlFor="friction">Which part of the business creates the most friction?</label>
        <textarea
          id="friction"
          required
          rows={3}
          value={fields.friction}
          onChange={(e) => update('friction', e.target.value)}
        />
      </div>

      <div className={s.field}>
        <label htmlFor="software">Which software systems does your team use?</label>
        <textarea
          id="software"
          required
          rows={3}
          value={fields.software}
          onChange={(e) => update('software', e.target.value)}
        />
      </div>

      <div className={s.field}>
        <label htmlFor="outcome">What would improving this make possible?</label>
        <textarea
          id="outcome"
          required
          rows={3}
          value={fields.outcome}
          onChange={(e) => update('outcome', e.target.value)}
        />
      </div>

      <div className={s.field}>
        <label htmlFor="timeline">When would you want to begin implementation?</label>
        <select
          id="timeline"
          required
          value={fields.timeline}
          onChange={(e) => update('timeline', e.target.value)}
        >
          <option value="" disabled>Select one</option>
          {TIMELINE_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      {/* Honeypot: hidden from humans, tempting to bots */}
      <div className={s.honeypot} aria-hidden="true">
        <label htmlFor="company_fax">Company fax</label>
        <input id="company_fax" name="company_fax" type="text" tabIndex={-1} autoComplete="off" ref={honeypotRef} />
      </div>

      {TURNSTILE_SITE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} />
        </>
      )}

      {error && <p className={s.error} role="alert">{error}</p>}

      <button type="submit" className="btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Submitting…' : 'Apply for the Audit →'}
      </button>
    </form>
  );
}
