import type { Metadata } from 'next';
import HighLevelCalendar from '@/components/HighLevelCalendar';
import { LandingHeader, LandingFooter } from '../LandingChrome';
import LeadConversion from './LeadConversion';
import s from '../roofers.module.css';

export const metadata: Metadata = {
  title: { absolute: 'Pick a Time for Your Audit | SMB Automation' },
  robots: { index: false, follow: false },
};

export default function RoofersThankYouPage() {
  return (
    <>
      <LandingHeader cta={false} />
      <section className={s.booked}>
        <div className={s.inner}>
          <div className={s.bookedHead}>
            <span className="eyebrow">Step 2 of 2</span>
            <h1 className={s.sectionTitle}>
              Got it. <em>Now pick a time for your audit.</em>
            </h1>
            <p className={s.bookedLede}>
              20 minutes. We walk through your call volume and lead flow and show you,
              in dollars, what missed calls cost you every month.
            </p>
          </div>
          <LeadConversion />
          <HighLevelCalendar calendar="rooferAudit" title="Book your free missed-revenue audit" />
        </div>
      </section>
      <LandingFooter />
    </>
  );
}
