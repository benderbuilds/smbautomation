import Script from 'next/script';
import s from './HighLevelForm.module.css';

/* HighLevel (LeadConnector) forms. Submissions, and their SMS consent, land on
   the contact in HighLevel, where texts are sent and STOP is enforced. Fields,
   the two SMS consent checkboxes, their wording, the Privacy/Terms links, and
   what happens on submit are all configured in HighLevel's form builder.

   Each form's id and height come from its embed code (Forms > Integrate):
   the id is the last segment of the iframe src, the height is data-height. */
export const HIGHLEVEL_FORMS = {
  homepageContact: { id: '', height: 1100, name: 'Website Contact Form' },
  rooferAudit: { id: '', height: 900, name: 'Roofer Audit Form' },
} as const;

type FormKey = keyof typeof HIGHLEVEL_FORMS;

export default function HighLevelForm({ form, title }: { form: FormKey; title: string }) {
  const { id, height, name } = HIGHLEVEL_FORMS[form];

  if (!id) {
    // Not configured yet: never show a dead form, offer direct contact instead.
    return (
      <div className={s.wrap}>
        <p className={s.fallback}>
          Email <a href="mailto:jesse@smbautomation.io">jesse@smbautomation.io</a> or call{' '}
          <a href="tel:+13192552700">(319) 255-2700</a> and we will reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <div className={s.wrap}>
      <iframe
        src={`https://api.leadconnectorhq.com/widget/form/${id}`}
        className={s.frame}
        style={{ height }}
        id={`inline-${id}`}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={name}
        data-height={height}
        data-layout-iframe-id={`inline-${id}`}
        data-form-id={id}
        title={title}
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </div>
  );
}
