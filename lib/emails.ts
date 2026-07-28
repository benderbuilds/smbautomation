const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://smbautomation.io';

function fromAddress(): string {
  return process.env.EMAIL_FROM || 'SMB Automation <notifications@smbautomation.io>';
}

function adminEmail(): string {
  return process.env.CONTACT_EMAIL || 'jesse@smbautomation.io';
}

interface Message {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

/**
 * Sends via Resend. Never throws: email failure must not fail a submission.
 * No-ops with a log when RESEND_API_KEY is missing.
 */
async function send(msg: Message): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`[emails] RESEND_API_KEY not set, skipping "${msg.subject}" to ${msg.to}`);
    return;
  }
  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromAddress(),
      to: msg.to,
      replyTo: msg.replyTo || adminEmail(),
      subject: msg.subject,
      html: msg.html,
      text: msg.text,
    });
    if (error) console.error(`[emails] "${msg.subject}" to ${msg.to} failed:`, error);
  } catch (err) {
    console.error(`[emails] "${msg.subject}" to ${msg.to} errored:`, err);
  }
}

/* Email-safe shell: system fonts, inline styles, zero border radius, no em dashes. */
function shell(bodyHtml: string): string {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#EDF1F7;">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#0A0E1A;font-size:15px;line-height:1.6;">
    <div style="background:#FFFFFF;border:1px solid #D4DAE8;padding:32px;">
      ${bodyHtml}
    </div>
    <p style="color:#9AA0B2;font-size:12px;margin-top:16px;">SMB Automation, Des Moines, IA. Questions? Reply to this email.</p>
  </div>
</body>
</html>`;
}

function btn(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:#2540D9;color:#FFFFFF;padding:12px 28px;font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;text-decoration:none;">${label}</a>`;
}

export interface ApplicationSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  role: string;
  industry: string;
  employees: string;
  revenue: string;
  volume: string;
  friction: string;
  software: string;
  outcome: string;
  timeline: string;
}

export async function sendApplicationEmails({
  submission,
  qualified,
}: {
  submission: ApplicationSubmission;
  qualified: boolean;
}): Promise<void> {
  const s = submission;
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  const rows = [
    ['Name', `${s.firstName} ${s.lastName}`],
    ['Email', s.email],
    ['Phone', s.phone],
    ['Company', s.company],
    ['Website', s.website],
    ['Role', s.role],
    ['Industry', s.industry],
    ['Employees', s.employees],
    ['Revenue', s.revenue],
    ['Monthly volume', s.volume],
    ['Biggest friction', s.friction],
    ['Software', s.software],
    ['What improvement makes possible', s.outcome],
    ['Timeline', s.timeline],
    ['Auto-qualified', qualified ? 'YES' : 'NO'],
  ];
  const tableHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#5A6580;vertical-align:top;white-space:nowrap;">${k}</td><td style="padding:6px 0;">${v}</td></tr>`
    )
    .join('');
  const tableText = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  const internal = send({
    to: adminEmail(),
    subject: `New application: ${s.company} - ${qualified ? 'QUALIFIED' : 'NOT QUALIFIED'}`,
    replyTo: s.email,
    html: shell(
      `<h2 style="margin:0 0 16px;font-size:18px;">New audit application</h2><table style="border-collapse:collapse;font-size:14px;">${tableHtml}</table>`
    ),
    text: `New audit application\n\n${tableText}`,
  });

  let applicant: Promise<void>;
  if (qualified) {
    const bookLine = calendlyUrl
      ? `<p style="margin:0 0 20px;">If you have not booked your fit call yet, pick a time now:</p><p style="margin:0 0 8px;">${btn(calendlyUrl, 'Book your fit call')}</p>`
      : `<p style="margin:0 0 20px;">We will send you a booking link for a 20-minute fit call within one business day.</p>`;
    applicant = send({
      to: s.email,
      subject: 'Your audit application: next step is a 20-minute fit call',
      html: shell(
        `<h2 style="margin:0 0 16px;font-size:18px;">You are a fit, ${s.firstName}.</h2>
<p style="margin:0 0 16px;">Thanks for applying for a Business Efficiency Audit for ${s.company}. Based on your answers, the audit is the right starting point.</p>
${bookLine}
<p style="margin:20px 0 0;">On the call we will confirm scope, answer questions, and get the audit started.</p>`
      ),
      text: `You are a fit, ${s.firstName}.\n\nThanks for applying for a Business Efficiency Audit for ${s.company}. Based on your answers, the audit is the right starting point.\n\n${
        calendlyUrl
          ? `Book your 20-minute fit call: ${calendlyUrl}`
          : 'We will send you a booking link for a 20-minute fit call within one business day.'
      }\n\nOn the call we will confirm scope, answer questions, and get the audit started.`,
    });
  } else {
    const swaUrl = `${SITE_URL}/single-workflow-audit`;
    applicant = send({
      to: s.email,
      subject: 'We received your audit application',
      html: shell(
        `<h2 style="margin:0 0 16px;font-size:18px;">Thank you, ${s.firstName}.</h2>
<p style="margin:0 0 16px;">We received your application and will be in touch within one business day.</p>
<p style="margin:0 0 20px;">In the meantime, if you already know which process is causing the problem, a Single Workflow Audit may be a faster and less expensive place to start. It is a focused $495 analysis of one defined workflow, delivered within five business days.</p>
<p style="margin:0;">${btn(swaUrl, 'See the Single Workflow Audit')}</p>`
      ),
      text: `Thank you, ${s.firstName}.\n\nWe received your application and will be in touch within one business day.\n\nIn the meantime, if you already know which process is causing the problem, a Single Workflow Audit may be a faster and less expensive place to start. It is a focused $495 analysis of one defined workflow, delivered within five business days.\n\nSee the Single Workflow Audit: ${swaUrl}`,
    });
  }

  await Promise.all([internal, applicant]);
}

export async function sendPurchaseEmails({
  buyer,
}: {
  buyer: { name: string; email: string; sessionId: string; amountTotal?: number };
}): Promise<void> {
  const intakeUrl = `${SITE_URL}/single-workflow-audit/intake?session_id=${encodeURIComponent(buyer.sessionId)}`;
  const firstName = buyer.name.split(' ')[0] || 'there';

  const receipt = send({
    to: buyer.email,
    subject: 'Your Single Workflow Audit: complete your intake',
    html: shell(
      `<h2 style="margin:0 0 16px;font-size:18px;">Thank you for your purchase, ${firstName}.</h2>
<p style="margin:0 0 16px;">Your $495 Single Workflow Audit is confirmed. Stripe will send your payment receipt separately.</p>
<p style="margin:0 0 20px;">Next step: complete the intake form so we know which workflow to analyze. Your audit is delivered within five business days of intake.</p>
<p style="margin:0;">${btn(intakeUrl, 'Complete your intake')}</p>`
    ),
    text: `Thank you for your purchase, ${firstName}.\n\nYour $495 Single Workflow Audit is confirmed. Stripe will send your payment receipt separately.\n\nNext step: complete the intake form so we know which workflow to analyze. Your audit is delivered within five business days of intake.\n\nComplete your intake: ${intakeUrl}`,
  });

  const internal = send({
    to: adminEmail(),
    subject: `New purchase: Single Workflow Audit - ${buyer.name}`,
    replyTo: buyer.email,
    html: shell(
      `<h2 style="margin:0 0 16px;font-size:18px;">New Single Workflow Audit purchase</h2>
<p style="margin:0;">Buyer: ${buyer.name} (${buyer.email})<br>Stripe session: ${buyer.sessionId}${
        buyer.amountTotal ? `<br>Amount: $${(buyer.amountTotal / 100).toFixed(2)}` : ''
      }</p>`
    ),
    text: `New Single Workflow Audit purchase\n\nBuyer: ${buyer.name} (${buyer.email})\nStripe session: ${buyer.sessionId}${
      buyer.amountTotal ? `\nAmount: $${(buyer.amountTotal / 100).toFixed(2)}` : ''
    }`,
  });

  await Promise.all([receipt, internal]);
}

export async function sendContactEmails({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const internal = send({
    to: adminEmail(),
    subject: `Contact form: ${name}`,
    replyTo: email,
    html: shell(
      `<h2 style="margin:0 0 16px;font-size:18px;">New contact message</h2>
<p style="margin:0 0 16px;">From: ${name} (${email})</p>
<p style="margin:0;white-space:pre-wrap;">${message}</p>`
    ),
    text: `New contact message\n\nFrom: ${name} (${email})\n\n${message}`,
  });

  const firstName = name.split(' ')[0] || 'there';
  const ack = send({
    to: email,
    subject: 'We received your message',
    html: shell(
      `<h2 style="margin:0 0 16px;font-size:18px;">Thanks, ${firstName}.</h2>
<p style="margin:0;">We received your message and will reply within one business day.</p>`
    ),
    text: `Thanks, ${firstName}.\n\nWe received your message and will reply within one business day.`,
  });

  await Promise.all([internal, ack]);
}

export async function sendSampleAuditEmail({
  name,
  email,
}: {
  name: string;
  email: string;
}): Promise<void> {
  const pdfUrl = `${SITE_URL}/assets/smb-automation-sample-audit.pdf`;
  const firstName = name.split(' ')[0] || 'there';
  await send({
    to: email,
    subject: 'Your sample Business Efficiency Audit',
    html: shell(
      `<h2 style="margin:0 0 16px;font-size:18px;">Here is your sample audit, ${firstName}.</h2>
<p style="margin:0 0 20px;">This is a real example of the deliverable, anonymized for a 22-employee property management company. It shows the workflow inventory, the ranked opportunity scorecard, and the 90-day roadmap you would receive.</p>
<p style="margin:0 0 20px;">${btn(pdfUrl, 'Download the sample audit')}</p>
<p style="margin:0;">When you are ready to see what this looks like for your business, apply for the audit at ${SITE_URL}/apply.</p>`
    ),
    text: `Here is your sample audit, ${firstName}.\n\nThis is a real example of the deliverable, anonymized for a 22-employee property management company. It shows the workflow inventory, the ranked opportunity scorecard, and the 90-day roadmap you would receive.\n\nDownload: ${pdfUrl}\n\nWhen you are ready to see what this looks like for your business, apply for the audit at ${SITE_URL}/apply.`,
  });
}
