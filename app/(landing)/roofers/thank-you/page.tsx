import type { Metadata } from 'next';
import { calendlyUrl } from '@/lib/calendly';
import CalendlyEmbed from './CalendlyEmbed';
import s from '../roofers.module.css';

export const metadata: Metadata = {
  title: { absolute: 'Pick a Time for Your Audit | SMB Automation' },
  robots: { index: false, follow: false },
};

export default function RoofersThankYouPage() {
  return <section className={s.booked}>
    <p>Step 2 of 2</p><h1>Pick a time for your roofing audit.</h1>
    <p>We’ll review your call volume and lead follow-up together in 20 minutes.</p>
    <CalendlyEmbed url={calendlyUrl()} />
  </section>;
}
