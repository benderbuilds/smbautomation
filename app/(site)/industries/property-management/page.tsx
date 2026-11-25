import IndustryPage, { industryMetadata } from '@/components/IndustryPage';
import s from '@/components/FrontDesk.module.css';
import RentCalculator from './RentCalculator';

export const metadata = industryMetadata('property-management');

export default function PropertyManagementPage() {
  return (
    <IndustryPage slug="property-management">
      <section className={s.split} aria-labelledby="calc-title"><div>
        <h2 id="calc-title">What could missed leasing calls cost you?</h2>
        <p>Enter your call volume, conversion rate, and rent to estimate one month of vacancy for each missed lease.</p>
      </div><RentCalculator /></section>
    </IndustryPage>
  );
}
