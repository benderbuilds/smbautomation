'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    console.warn(`[404] ${window.location.pathname}${window.location.search}`);
    fetch('/api/log-404', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: window.location.pathname + window.location.search,
        referrer: document.referrer,
      }),
    }).catch(() => {});
  }, []);

  return (
    <main
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--bg)',
        padding: '6rem 5vw',
      }}
    >
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <span className="eyebrow">404</span>
        <h1
          style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            color: 'var(--ink)',
          }}
        >
          This page does not exist.
        </h1>
        <p
          style={{
            margin: '1rem 0 2rem',
            fontSize: '1rem',
            color: 'var(--ink-mid)',
            lineHeight: 1.75,
          }}
        >
          The page you are looking for may have moved. Here is where to go instead.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/apply" className="btn-primary">Apply for the Audit →</Link>
          <Link href="/" style={{ color: 'var(--blue)', fontWeight: 600, fontSize: '0.85rem' }}>
            Homepage
          </Link>
          <Link href="/blog" style={{ color: 'var(--blue)', fontWeight: 600, fontSize: '0.85rem' }}>
            Blog
          </Link>
        </div>
      </div>
    </main>
  );
}
