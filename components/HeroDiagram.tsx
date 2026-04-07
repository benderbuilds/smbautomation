'use client';

import { useEffect, useState } from 'react';

export default function HeroDiagram() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(v => (v + 1) % 4);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { label: 'DATA IN', sub: 'Operations, competitors, customers' },
    { label: 'INSIGHT', sub: 'Gaps, leaks, opportunities' },
    { label: 'ACTION', sub: 'Prioritized builds' },
    { label: 'REVENUE', sub: 'Measurable growth' },
  ];

  return (
    <div style={{ width: '100%', maxWidth: 380, padding: '2rem 1rem' }}>
      {nodes.map((node, i) => (
        <div key={node.label}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 1.25rem',
            background: active === i ? 'rgba(37,64,217,0.15)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${active === i ? 'rgba(37,64,217,0.5)' : 'rgba(255,255,255,0.07)'}`,
            transition: 'all 0.4s ease',
          }}>
            <div style={{
              width: 8,
              height: 8,
              background: active === i ? '#2540D9' : 'rgba(255,255,255,0.12)',
              flexShrink: 0,
              transition: 'background 0.4s ease',
            }} />
            <div>
              <div style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: active === i ? '#2540D9' : 'rgba(255,255,255,0.28)',
                textTransform: 'uppercase',
                transition: 'color 0.4s ease',
              }}>
                {node.label}
              </div>
              <div style={{
                fontSize: '0.78rem',
                color: active === i ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.18)',
                marginTop: '0.2rem',
                transition: 'color 0.4s ease',
              }}>
                {node.sub}
              </div>
            </div>
          </div>
          {i < nodes.length - 1 && (
            <div style={{
              width: 1,
              height: 24,
              background: 'rgba(255,255,255,0.07)',
              margin: '0 0 0 1.6rem',
            }} />
          )}
        </div>
      ))}
    </div>
  );
}
