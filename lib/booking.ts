/* The two GoHighLevel booking flows. Each calendar has its signup form attached
   inside GHL, so the visitor enters their details once, inside the calendar.
   GHL owns the contact record, SMS consent, the appointment, and the trial dates.
   formId is the form already attached inside GHL; it is listed here for reference only. */

export type BookingFlow = 'trial' | 'demo';

export const BOOKING: Record<
  BookingFlow,
  { path: string; calendarId: string; formId: string; frameTitle: string }
> = {
  trial: {
    path: '/start-trial',
    calendarId: 'szR9kB8w2VuVUb6lauyR',
    formId: 'IcPf4XFFfhpNwakkq3iG',
    frameTitle: 'Start your free trial: enter your details and book your onboarding call',
  },
  demo: {
    path: '/book-demo',
    calendarId: 'tMFbZUST3Qm4ah8ECwlY',
    formId: 'FoZ7NYiLZeRhZKxp0ErG',
    frameTitle: 'Book a demo: enter your details and pick a demo time',
  },
};

/** The GHL calendar URL, with campaign parameters appended when there are any. */
export function bookingUrl(flow: BookingFlow, params?: URLSearchParams): string {
  const base = `https://api.leadconnectorhq.com/widget/booking/${BOOKING[flow].calendarId}`;
  const query = params?.toString();
  return query ? `${base}?${query}` : base;
}

/** Approved wording for when the trial clock starts. Use it everywhere trial timing is explained. */
export const TRIAL_START_COPY = 'Your 30-day free trial starts when you book your onboarding call.';

export const PHONE_DISPLAY = '(319) 255-2700';
export const PHONE_TEL = 'tel:+13192552700';
export const EMAIL = 'jesse@smbautomation.io';
/** Public inbox for prospects (the founder section and other "talk to our team" spots). */
export const HELLO_EMAIL = 'hello@smbautomation.io';
/* PHONE_DISPLAY rings the Voice Agent demo line. The Voice Agent answers first and can
   transfer the caller to Jesse, so label it as a Voice Agent demo where the point is to
   show the product. */
