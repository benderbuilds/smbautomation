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

    await resend.emails.send({
      from: 'SMB Automation <noreply@smbautomation.io>',
      to,
      subject: `New Consult Request — ${name}${business ? ` (${business})` : ''}`,
      html: `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 600px; margin: 0 auto; background: #FAF7F2; padding: 2rem; border-radius: 12px;">
          <h2 style="font-family: Georgia, serif; color: #1E1A16; margin-bottom: 1.5rem;">
            New Consult Request
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #E8DDD0;">
              <td style="padding: 0.75rem 0; font-weight: 600; color: #6B6358; font-size: 0.85rem; width: 140px;">Name</td>
              <td style="padding: 0.75rem 0; color: #1E1A16;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #E8DDD0;">
              <td style="padding: 0.75rem 0; font-weight: 600; color: #6B6358; font-size: 0.85rem;">Email</td>
              <td style="padding: 0.75rem 0; color: #1E1A16;"><a href="mailto:${email}" style="color: #B5622A;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #E8DDD0;">
              <td style="padding: 0.75rem 0; font-weight: 600; color: #6B6358; font-size: 0.85rem;">Phone</td>
              <td style="padding: 0.75rem 0; color: #1E1A16;">${phone || '—'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #E8DDD0;">
              <td style="padding: 0.75rem 0; font-weight: 600; color: #6B6358; font-size: 0.85rem;">Business Type</td>
              <td style="padding: 0.75rem 0; color: #1E1A16;">${business || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 0; font-weight: 600; color: #6B6358; font-size: 0.85rem; vertical-align: top;">Bottleneck</td>
              <td style="padding: 0.75rem 0; color: #1E1A16; line-height: 1.6;">${bottleneck || '—'}</td>
            </tr>
          </table>
          <div style="margin-top: 2rem; padding: 1rem; background: #F5E8DC; border-radius: 8px; font-size: 0.85rem; color: #6B6358;">
            Reply directly to this email to reach the lead at ${email}.
          </div>
        </div>
      `,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
