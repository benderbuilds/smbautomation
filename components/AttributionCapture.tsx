'use client';

import { useEffect } from 'react';
import { ATTR_COOKIE, ATTR_MAX_AGE, buildAttr } from '../lib/attribution';

export default function AttributionCapture() {
  useEffect(() => {
    const hasCookie = document.cookie
      .split('; ')
      .some((c) => c.startsWith(`${ATTR_COOKIE}=`));
    if (hasCookie) return;
    const attr = buildAttr(window.location.search, window.location.pathname, new Date().toISOString());
    const value = encodeURIComponent(JSON.stringify(attr));
    document.cookie = `${ATTR_COOKIE}=${value}; path=/; max-age=${ATTR_MAX_AGE}; samesite=lax`;
  }, []);

  return null;
}
