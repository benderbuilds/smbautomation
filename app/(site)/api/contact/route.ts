import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, company, revenue_range, how_can_we_help, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const to = process.env.CONTACT_EMAIL || 'jesse@smbautomation.io';

    const revenueLabels: Record<string, string> = {
      under_500k: 'Under $500K',
      '500k_1m': '$500K to $1M',
      '1m_5m': '$1M to $5M',
      '5m_20m': '$5M to $20M',
      '20m_plus': '$20M+',
    };

    const helpLabels: Record<string, string> = {
      strategy: 'Business Analysis & Strategy',
      build: 'Custom Build / MVP',
      retainer: 'Ongoing Retainer',
      not_sure: 'Not sure yet',
    };

    const row = (label: string, value: string) => `
      <tr style="border-bottom: 1px solid #D4DAE8;">
        <td style="padding: 0.75rem 0; font-weight: 600; color: #5A6580; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; width: 160px;">${label}</td>
        <td style="padding: 0.75rem 0; color: #0A0E1A; font-size: 0.95rem;">${value || 'Not provided'}</td>
      </tr>`;

    await resend.emails.send({
      from: 'SMB Automation <noreply@smbautomation.io>',
      to,
      replyTo: email,
      subject: `New Contact — ${name}${company ? ` (${company})` : ''}`,
      html: `
        <div style="font-family: 'Barlow', 'Helvetica Neue', Helvetica, sans-serif; max-width: 600px; margin: 0 auto; background: #EDF1F7; padding: 2rem;">
          <div style="background: #2540D9; padding: 1.5rem 2rem;">
            <span style="font-size: 0.9rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #FFFFFF;">SMB Automation</span>
          </div>
          <div style="background: #FFFFFF; border: 1px solid #D4DAE8; border-top: none; padding: 2rem;">
            <h2 style="font-size: 1.3rem; font-weight: 500; color: #0A0E1A; margin: 0 0 1.5rem;">New Contact Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${row('Name', name)}
              ${row('Email', `<a href="mailto:${email}" style="color: #2540D9; text-decoration: none;">${email}</a>`)}
              ${row('Phone', phone)}
              ${row('Company', company)}
              ${row('Revenue', revenueLabels[revenue_range] || revenue_range || '')}
              ${row('How we can help', helpLabels[how_can_we_help] || how_can_we_help || '')}
              <tr>
                <td style="padding: 0.75rem 0; font-weight: 600; color: #5A6580; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; vertical-align: top;">Message</td>
                <td style="padding: 0.75rem 0; color: #0A0E1A; font-size: 0.95rem; line-height: 1.6;">${message || 'Not provided'}</td>
              </tr>
            </table>
            <div style="margin-top: 1.75rem; padding: 1rem 1.25rem; background: #EBF0FF; border-left: 3px solid #2540D9; font-size: 0.83rem; color: #5A6580; line-height: 1.6;">
              Reply directly to this email to reach <strong style="color: #0A0E1A;">${name}</strong>.
            </div>
          </div>
        </div>`,
    });

    await resend.emails.send({
      from: 'Jesse at SMB Automation <noreply@smbautomation.io>',
      to: email,
      subject: `Got it, ${name.split(' ')[0]} — we will be in touch shortly`,
      html: `
        <div style="font-family: 'Barlow', 'Helvetica Neue', Helvetica, sans-serif; max-width: 600px; margin: 0 auto; background: #EDF1F7; padding: 2rem;">
          <div style="background: #2540D9; padding: 1.5rem 2rem;">
            <span style="font-size: 0.9rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #FFFFFF;">SMB Automation</span>
          </div>
          <div style="background: #FFFFFF; border: 1px solid #D4DAE8; border-top: none; padding: 2rem 2rem 2.5rem;">
            <h2 style="font-size: 1.3rem; font-weight: 500; color: #0A0E1A; margin: 0 0 1rem;">We received your message.</h2>
            <p style="color: #5A6580; line-height: 1.7; margin: 0 0 1.25rem; font-size: 0.95rem;">
              Hi ${name.split(' ')[0]}, thanks for reaching out. We respond within one business day.
            </p>
            <p style="color: #5A6580; line-height: 1.7; margin: 0 0 2rem; font-size: 0.95rem;">
              If you would like to get on a call right away, book a free 30-minute slot below.
            </p>
            <a href="https://calendly.com/jesse-smbautomation/30min" style="display: inline-block; background: #E84E1A; color: #FFFFFF; padding: 0.85rem 2rem; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;">
              Book a Free Strategy Call →
            </a>
          </div>
          <div style="padding: 1.25rem 0 0; font-size: 0.75rem; color: #9AA0B2;">
            SMB Automation · smbautomation.io
          </div>
        </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
