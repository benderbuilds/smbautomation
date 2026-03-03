import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, business, bottleneck } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const to = process.env.CONTACT_EMAIL || 'hello@smbautomation.io';

    // Notify the team
    await resend.emails.send({
      from: 'SMB Automation <noreply@smbautomation.io>',
      to,
      replyTo: email,
      subject: `New Audit Request — ${name}${business ? ` (${business})` : ''}`,
      html: `
        <div style="font-family: 'Barlow', 'Helvetica Neue', Helvetica, sans-serif; max-width: 600px; margin: 0 auto; background: #EDF1F7; padding: 2rem;">
          <div style="background: #2540D9; padding: 1.5rem 2rem; margin-bottom: 0;">
            <span style="font-size: 0.9rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #FFFFFF;">SMB Automation</span>
          </div>
          <div style="background: #FFFFFF; border: 1px solid #D4DAE8; border-top: none; padding: 2rem;">
            <h2 style="font-size: 1.3rem; font-weight: 500; color: #0A0E1A; margin: 0 0 1.5rem; letter-spacing: -0.01em;">New Audit Request</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #D4DAE8;">
                <td style="padding: 0.75rem 0; font-weight: 600; color: #5A6580; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; width: 140px;">Name</td>
                <td style="padding: 0.75rem 0; color: #0A0E1A; font-size: 0.95rem;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #D4DAE8;">
                <td style="padding: 0.75rem 0; font-weight: 600; color: #5A6580; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase;">Email</td>
                <td style="padding: 0.75rem 0; font-size: 0.95rem;"><a href="mailto:${email}" style="color: #2540D9; text-decoration: none;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #D4DAE8;">
                <td style="padding: 0.75rem 0; font-weight: 600; color: #5A6580; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase;">Phone</td>
                <td style="padding: 0.75rem 0; color: #0A0E1A; font-size: 0.95rem;">${phone || '—'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #D4DAE8;">
                <td style="padding: 0.75rem 0; font-weight: 600; color: #5A6580; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase;">Business</td>
                <td style="padding: 0.75rem 0; color: #0A0E1A; font-size: 0.95rem;">${business || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem 0; font-weight: 600; color: #5A6580; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; vertical-align: top;">Bottleneck</td>
                <td style="padding: 0.75rem 0; color: #0A0E1A; font-size: 0.95rem; line-height: 1.6;">${bottleneck || '—'}</td>
              </tr>
            </table>
            <div style="margin-top: 1.75rem; padding: 1rem 1.25rem; background: #EBF0FF; border-left: 3px solid #2540D9; font-size: 0.83rem; color: #5A6580; line-height: 1.6;">
              Reply directly to this email to reach <strong style="color: #0A0E1A;">${name}</strong> at ${email}.
            </div>
          </div>
        </div>
      `,
    });

    // Auto-reply to the submitter
    await resend.emails.send({
      from: 'Jesse at SMB Automation <noreply@smbautomation.io>',
      to: email,
      subject: `Got it, ${name.split(' ')[0]} — we'll be in touch shortly`,
      html: `
        <div style="font-family: 'Barlow', 'Helvetica Neue', Helvetica, sans-serif; max-width: 600px; margin: 0 auto; background: #EDF1F7; padding: 2rem;">
          <div style="background: #2540D9; padding: 1.5rem 2rem; margin-bottom: 0;">
            <span style="font-size: 0.9rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #FFFFFF;">SMB Automation</span>
          </div>
          <div style="background: #FFFFFF; border: 1px solid #D4DAE8; border-top: none; padding: 2rem 2rem 2.5rem;">
            <h2 style="font-size: 1.3rem; font-weight: 500; color: #0A0E1A; margin: 0 0 1rem; letter-spacing: -0.01em;">We received your request.</h2>
            <p style="color: #5A6580; line-height: 1.7; margin: 0 0 1.25rem; font-size: 0.95rem;">
              Hi ${name.split(' ')[0]}, thanks for reaching out. We typically respond within a few hours during business days.
            </p>
            <p style="color: #5A6580; line-height: 1.7; margin: 0 0 2rem; font-size: 0.95rem;">
              In the meantime, if you'd like to skip the back-and-forth and get on a call right away, you can book a free 30-minute slot below.
            </p>
            <a href="https://calendly.com/jesse-curvebase/30min" style="display: inline-block; background: #E84E1A; color: #FFFFFF; padding: 0.85rem 2rem; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;">
              Book a Free Audit Call →
            </a>
          </div>
          <div style="padding: 1.25rem 0 0; font-size: 0.75rem; color: #9AA0B2; letter-spacing: 0.04em;">
            SMB Automation · smbautomation.io
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
