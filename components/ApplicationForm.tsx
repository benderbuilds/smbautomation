'use client';

import { useState } from 'react';
import s from './ApplicationForm.module.css';

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  companyWebsite: string;
  role: string;
  companySize: string;
  revenue: string;
  budget: string;
  howWeCanHelp: string;
  improvements: string[];
  anythingElse: string;
};

const EMPTY: Fields = {
  firstName: '',
  lastName: '',
  email: '',
  companyName: '',
  companyWebsite: '',
  role: '',
  companySize: '',
  revenue: '',
  budget: '',
  howWeCanHelp: '',
  improvements: [],
  anythingElse: '',
};

const IMPROVEMENT_OPTIONS = [
  'Lead generation or sales',
  'Customer support',
  'Internal operations',
  'Data processing or reporting',
  'Content or marketing workflows',
  'Not sure yet',
];

export default function ApplicationForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'apiError'>('idle');

  function set(key: keyof Fields, value: string) {
    setFields(f => ({ ...f, [key]: value }));
    setErrors(e => ({ ...e, [key]: undefined }));
  }

  function toggleImprovement(option: string) {
    setFields(f => ({
      ...f,
      improvements: f.improvements.includes(option)
        ? f.improvements.filter(i => i !== option)
        : [...f.improvements, option],
    }));
    setErrors(e => ({ ...e, improvements: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!fields.firstName.trim()) next.firstName = 'First name is required.';
    if (!fields.lastName.trim()) next.lastName = 'Last name is required.';
    if (!fields.email.trim() || !fields.email.includes('@')) next.email = 'Valid email is required.';
    if (!fields.companyName.trim()) next.companyName = 'Company name is required.';
    if (fields.companyWebsite && !/^https?:\/\/.+/.test(fields.companyWebsite)) {
      next.companyWebsite = 'Enter a valid URL starting with http:// or https://';
    }
    if (!fields.role) next.role = 'Please select your role.';
    if (!fields.companySize) next.companySize = 'Please select company size.';
    if (!fields.revenue) next.revenue = 'Please select revenue range.';
    if (!fields.budget) next.budget = 'Please select a budget range.';
    if (!fields.howWeCanHelp.trim()) next.howWeCanHelp = 'Please tell us how we can help.';
    if (fields.improvements.length === 0) next.improvements = 'Select at least one area.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('apiError');
      }
    } catch {
      setStatus('apiError');
    }
  }

  if (status === 'success') {
    return (
      <section className={s.section} id="apply">
        <div className={s.inner}>
          <span className="eyebrow">APPLICATION RECEIVED</span>
          <h2 className={s.successHeadline}>Got it. We&apos;ll review and respond within one business day.</h2>
          <p className={s.successBody}>
            If it&apos;s a fit, you&apos;ll get a Calendly link to book the strategy call. If we need more context before the call, we&apos;ll email you first.
          </p>
          <p className={s.successSub}>
            Questions in the meantime?{' '}
            <a href="mailto:jesse@smbautomation.io">jesse@smbautomation.io</a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={s.section} id="apply">
      <div className={s.inner}>
        <div className={s.scarcityBanner}>
          We work with a limited number of clients to stay embedded. Not every application is accepted. This takes about 5 minutes.
        </div>

        <span className="eyebrow">APPLY</span>
        <h2 className={s.headline}>Apply for a free strategy call.</h2>
        <p className={s.sub}>
          Tell us about your business. If it&apos;s a fit, we&apos;ll send a Calendly link within one business day. If it&apos;s not, we&apos;ll tell you straight and point you somewhere better.
        </p>

        <form onSubmit={handleSubmit} noValidate className={s.form}>
          <div className={s.row}>
            <div className={s.field}>
              <label className={s.label}>First Name<span className={s.required}>*</span></label>
              <input className={s.input} type="text" value={fields.firstName} onChange={e => set('firstName', e.target.value)} />
              {errors.firstName && <span className={s.fieldError}>{errors.firstName}</span>}
            </div>
            <div className={s.field}>
              <label className={s.label}>Last Name<span className={s.required}>*</span></label>
              <input className={s.input} type="text" value={fields.lastName} onChange={e => set('lastName', e.target.value)} />
              {errors.lastName && <span className={s.fieldError}>{errors.lastName}</span>}
            </div>
          </div>

          <div className={s.field}>
            <label className={s.label}>Email Address<span className={s.required}>*</span></label>
            <input className={s.input} type="email" placeholder="john@company.com" value={fields.email} onChange={e => set('email', e.target.value)} />
            {errors.email && <span className={s.fieldError}>{errors.email}</span>}
          </div>

          <div className={s.row}>
            <div className={s.field}>
              <label className={s.label}>Company Name<span className={s.required}>*</span></label>
              <input className={s.input} type="text" placeholder="Acme Inc." value={fields.companyName} onChange={e => set('companyName', e.target.value)} />
              {errors.companyName && <span className={s.fieldError}>{errors.companyName}</span>}
            </div>
            <div className={s.field}>
              <label className={s.label}>Company Website</label>
              <input className={s.input} type="url" placeholder="https://acme.com" value={fields.companyWebsite} onChange={e => set('companyWebsite', e.target.value)} />
              {errors.companyWebsite && <span className={s.fieldError}>{errors.companyWebsite}</span>}
            </div>
          </div>

          <div className={s.field}>
            <label className={s.label}>Your Role<span className={s.required}>*</span></label>
            <select className={s.select} value={fields.role} onChange={e => set('role', e.target.value)}>
              <option value="">Select your role</option>
              <option>Owner / Founder</option>
              <option>CEO / President</option>
              <option>COO / Operations</option>
              <option>Marketing or Growth</option>
              <option>Other</option>
            </select>
            {errors.role && <span className={s.fieldError}>{errors.role}</span>}
          </div>

          <div className={s.row}>
            <div className={s.field}>
              <label className={s.label}>Company Size<span className={s.required}>*</span></label>
              <select className={s.select} value={fields.companySize} onChange={e => set('companySize', e.target.value)}>
                <option value="">Select company size</option>
                <option>Solo</option>
                <option>2 to 10</option>
                <option>11 to 50</option>
                <option>51 to 200</option>
                <option>200+</option>
              </select>
              {errors.companySize && <span className={s.fieldError}>{errors.companySize}</span>}
            </div>
            <div className={s.field}>
              <label className={s.label}>Annual Revenue<span className={s.required}>*</span></label>
              <select className={s.select} value={fields.revenue} onChange={e => set('revenue', e.target.value)}>
                <option value="">Select revenue range</option>
                <option>Under $500K</option>
                <option>$500K to $2M</option>
                <option>$2M to $10M</option>
                <option>$10M to $20M</option>
                <option>$20M+</option>
              </select>
              {errors.revenue && <span className={s.fieldError}>{errors.revenue}</span>}
            </div>
          </div>

          <div className={s.field}>
            <label className={s.label}>Project Budget<span className={s.required}>*</span></label>
            <select className={s.select} value={fields.budget} onChange={e => set('budget', e.target.value)}>
              <option value="">Select budget range</option>
              <option>Under $5K</option>
              <option>$5K to $15K</option>
              <option>$15K to $50K</option>
              <option>$50K+</option>
              <option>Not sure yet</option>
            </select>
            {errors.budget && <span className={s.fieldError}>{errors.budget}</span>}
          </div>

          <div className={s.field}>
            <label className={s.label}>How can we help?<span className={s.required}>*</span></label>
            <textarea className={s.textarea} rows={3} placeholder="Tell us what you're looking to achieve." value={fields.howWeCanHelp} onChange={e => set('howWeCanHelp', e.target.value)} />
            {errors.howWeCanHelp && <span className={s.fieldError}>{errors.howWeCanHelp}</span>}
          </div>

          <div className={s.field}>
            <label className={s.label}>What are you hoping to improve?<span className={s.required}>*</span></label>
            <div className={s.checkboxGrid}>
              {IMPROVEMENT_OPTIONS.map(opt => (
                <label key={opt} className={s.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={s.checkbox}
                    checked={fields.improvements.includes(opt)}
                    onChange={() => toggleImprovement(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
            {errors.improvements && <span className={s.fieldError}>{errors.improvements}</span>}
          </div>

          <div className={s.field}>
            <label className={s.label}>Anything else we should know?</label>
            <textarea className={s.textarea} rows={3} placeholder="Any additional context or questions." value={fields.anythingElse} onChange={e => set('anythingElse', e.target.value)} />
          </div>

          <div className={s.submitRow}>
            {status === 'apiError' && (
              <div className={s.apiError}>
                Something went wrong. Please try again or email{' '}
                <a href="mailto:jesse@smbautomation.io">jesse@smbautomation.io</a> directly.
              </div>
            )}
            <button type="submit" disabled={status === 'sending'} className="btn-orange">
              {status === 'sending' ? 'SENDING...' : 'SUBMIT APPLICATION →'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
