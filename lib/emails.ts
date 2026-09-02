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
    <p style="color:#9AA0B2;font-size:12px;margin-top:16px;">SMB Automation. Questions? Reply to this email.</p>
  </div>
</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export interface ContactSubmission {
  name: string;
  business: string;
  email: string;
  phone: string;
  interests: string[];
  message: string;
}

export async function sendContactEmails(sub: ContactSubmission): Promise<void> {
  const interests = sub.interests.length ? sub.interests.join(', ') : 'Not specified';

  const rows: [string, string][] = [
    ['Name', sub.name],
    ['Business', sub.business || 'Not provided'],
    ['Email', sub.email],
    ['Phone', sub.phone || 'Not provided'],
    ['Wants help with', interests],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#5A6580;font-size:13px;vertical-align:top;">${label}</td><td style="padding:4px 0;font-size:14px;">${escapeHtml(value)}</td></tr>`
    )
    .join('');

  const internal = send({
    to: adminEmail(),
    subject: `New inquiry: ${sub.name}${sub.business ? ` (${sub.business})` : ''}`,
    replyTo: sub.email,
    html: shell(
      `<h2 style="margin:0 0 16px;font-size:18px;">New inquiry from the website</h2>
<table style="width:100%;border-collapse:collapse;margin:0 0 20px;">${rowsHtml}</table>
<p style="margin:0 0 6px;color:#5A6580;font-size:13px;">About the business</p>
<p style="margin:0;white-space:pre-wrap;">${escapeHtml(sub.message)}</p>`
    ),
    text: `New inquiry from the website\n\n${rows
      .map(([label, value]) => `${label}: ${value}`)
      .join('\n')}\n\nAbout the business:\n${sub.message}`,
  });

  const firstName = sub.name.split(' ')[0] || 'there';
  const ack = send({
    to: sub.email,
    subject: 'We got your message',
    html: shell(
      `<h2 style="margin:0 0 16px;font-size:18px;">Thanks, ${escapeHtml(firstName)}.</h2>
<p style="margin:0 0 16px;">We received your message and will reply within one business day.</p>
<p style="margin:0;">In the meantime, if anything else comes to mind about where your marketing or follow-up is falling short, just reply to this email.</p>`
    ),
    text: `Thanks, ${firstName}.\n\nWe received your message and will reply within one business day.\n\nIn the meantime, if anything else comes to mind about where your marketing or follow-up is falling short, just reply to this email.`,
  });

  await Promise.all([internal, ack]);
}
