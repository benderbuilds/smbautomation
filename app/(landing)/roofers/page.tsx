import IndustryPage, { industryMetadata } from '@/components/IndustryPage';
import s from '@/components/FrontDesk.module.css';
import RooferAuditForm from './RooferAuditForm';

export const metadata = industryMetadata('roofers');

export default function RoofersPage() {
  return (
    <IndustryPage slug="roofers">
      <section className={s.split} id="audit" aria-labelledby="audit-title"><div>
        <h2 id="audit-title">Where are inspection requests slipping through?</h2>
        <p>Bring your monthly lead volume and an idea of how many calls you miss. In a free 20-minute audit, we’ll look at where homeowners drop off and which follow-up to fix first.</p>
      </div><RooferAuditForm /></section>
    </IndustryPage>
  );
}
