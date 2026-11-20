import Script from 'next/script';
import s from './HighLevelForm.module.css';

/* The homepage contact form is a HighLevel (LeadConnector) form, so every
   submission, and its SMS consent, lands on the contact in HighLevel, where
   texts are sent and STOP is enforced. The two SMS consent checkboxes, their
   wording, and the Privacy/Terms links are configured in HighLevel's form builder.

   Set HIGHLEVEL_FORM_ID (and FORM_HEIGHT to match the embed code's data-height). */
const HIGHLEVEL_FORM_ID = '';
const FORM_HEIGHT = 1100;
const FORM_NAME = 'Website Contact Form';

export default function HighLevelForm() {
  if (!HIGHLEVEL_FORM_ID) {
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
        src={`https://api.leadconnectorhq.com/widget/form/${HIGHLEVEL_FORM_ID}`}
        className={s.frame}
        style={{ height: FORM_HEIGHT }}
        id={`inline-${HIGHLEVEL_FORM_ID}`}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={FORM_NAME}
        data-height={FORM_HEIGHT}
        data-layout-iframe-id={`inline-${HIGHLEVEL_FORM_ID}`}
        data-form-id={HIGHLEVEL_FORM_ID}
        title="Contact SMB Automation"
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </div>
  );
}
