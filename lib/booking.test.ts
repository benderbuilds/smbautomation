import { describe, expect, it } from 'vitest';
import { BOOKING, bookingUrl, TRIAL_START_COPY } from './booking';

describe('booking flows', () => {
  it('sends the trial CTA to the trial onboarding calendar', () => {
    expect(BOOKING.trial.path).toBe('/start-trial');
    expect(bookingUrl('trial')).toBe(
      'https://api.leadconnectorhq.com/widget/booking/szR9kB8w2VuVUb6lauyR'
    );
  });

  it('sends the demo CTA to the demo calendar', () => {
    expect(BOOKING.demo.path).toBe('/book-demo');
    expect(bookingUrl('demo')).toBe(
      'https://api.leadconnectorhq.com/widget/booking/tMFbZUST3Qm4ah8ECwlY'
    );
  });

  it('uses the approved trial timing sentence', () => {
    expect(TRIAL_START_COPY).toBe('Your 30-day free trial starts when you book your onboarding call.');
  });
});
