'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { utmQuery } from '@/lib/attribution';
import { track } from '@/lib/analytics';
import { BOOKING, type BookingFlow } from '@/lib/booking';

/* A CTA into one of the two GHL booking flows. The click is tracked as a click
   only (booking_cta_click), never as a booking: the booking itself happens inside
   GHL's calendar, which reports no completion event to this site.
   The current page's UTMs ride along in the href, so a returning visitor whose
   first visit was untagged still books under this landing page's campaign. A
   genuine first-touch campaign in the attribution cookie still wins on the
   booking page (see campaignParams). */
export default function BookingLink({
  flow,
  location,
  className,
  children,
}: {
  flow: BookingFlow;
  location: string;
  className?: string;
  children: React.ReactNode;
}) {
  const base = BOOKING[flow].path;
  const [href, setHref] = useState(base);
  useEffect(() => {
    const query = utmQuery(window.location.search);
    setHref(query ? `${base}?${query}` : base);
  }, [base]);

  return (
    <Link
      href={href}
      className={className}
      onClick={() => track('booking_cta_click', { flow, location })}
    >
      {children}
    </Link>
  );
}
