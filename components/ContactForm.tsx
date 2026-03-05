'use client';

import { useState } from 'react';

interface FormState {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  bottleneck: string;
}

const BUSINESS_TYPES = [
  'Property Management',
  'Med Spa / Cosmetic Surgery',
  'HVAC',
  'Roofing',
  'Dental Practice',
  'Real Estate',
  'Landscaping / Trades',
  'Other',
];

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    bottleneck: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.bottleneck) {
      setErrorMsg('Please fill in your name, email, and describe your bottleneck.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Something went wrong.');
      }

      setStatus('success');
      setForm({ name: '', email: '', phone: '', businessType: '', bottleneck: '' });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{
        padding: '48px 32px',
        textAlign: 'center',
        background: '#0f1a0f',
        border: '1px solid #22c55e',
        borderRadius: '12px',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
        <h3 style={{ color: '#22c55e', marginBottom: '8px', fontSize: '22px' }}>Got it.</h3>
        <p style={{ color: '#999', lineHeight: '1.6' }}>
          We&apos;ll review your situation and reach out within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Row 1: Name + Email */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label style={labelStyle}>Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Jesse Bender"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Email *</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@company.com"
            style={inputStyle}
          />
        </div>
      </div>

      {/* Row 2: Phone + Business Type */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label style={labelStyle}>Phone</label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="(319) 555-0100"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Business Type</label>
          <select
            name="businessType"
            value={form.businessType}
            onChange={handleChange}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            <option value="">Select one...</option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bottleneck */}
      <div>
        <label style={labelStyle}>What&apos;s your biggest bottleneck? *</label>
        <textarea
          name="bottleneck"
          value={form.bottleneck}
          onChange={handleChange}
          placeholder="e.g. We're losing leads after hours because nobody follows up until morning. We close maybe 20% of what comes in..."
          rows={5}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }}
        />
      </div>

      {status === 'error' && (
        <p style={{ color: '#ef4444', fontSize: '14px', margin: 0 }}>{errorMsg}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={status === 'loading'}
        style={{
          background: status === 'loading' ? '#166534' : '#22c55e',
          color: '#000',
          border: 'none',
          borderRadius: '8px',
          padding: '14px 28px',
          fontSize: '15px',
          fontWeight: '700',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s',
          letterSpacing: '0.3px',
        }}
      >
        {status === 'loading' ? 'Sending...' : 'Show Me Where I\'m Leaking Revenue →'}
      </button>

      <p style={{ color: '#555', fontSize: '12px', margin: 0 }}>
        No pitch decks. No fluff. We review your situation and respond within 1 business day.
      </p>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  background: '#111',
  border: '1px solid #2a2a2a',
  borderRadius: '8px',
  color: '#f0f0f0',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '13px',
  color: '#999',
  fontWeight: '500',
};
