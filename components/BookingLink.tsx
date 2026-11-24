'use client';

import Link from 'next/link';
import { track } from '@/lib/analytics';
import { BOOKING, type BookingFlow } from '@/lib/booking';

/* A CTA into one of the two GHL booking flows. The click is tracked as a click
   only (booking_cta_click), never as a booking: the booking itself happens inside
   GHL's calendar, which reports no completion event to this site. */
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
  return (
    <Link
      href={BOOKING[flow].path}
      className={className}
      onClick={() => track('booking_cta_click', { flow, location })}
    >
      {children}
    </Link>
  );
}
