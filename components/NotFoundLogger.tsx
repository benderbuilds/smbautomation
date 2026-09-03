'use client';

import { useEffect } from 'react';

/* Split out of not-found.tsx so that route can stay a server component and
   export its own metadata; a client component cannot. */
export default function NotFoundLogger() {
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

  return null;
}
