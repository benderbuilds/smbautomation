import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, businessType, bottleneck } = body;

    // Basic validation
    if (!name || !email || !bottleneck) {
      return NextResponse.json(
        { error: 'Name, email, and bottleneck description are required.' },
        { status: 400 }
      );
    }

    const toEmail = process.env.CONTACT_EMAIL ?? 'hello@smbautomation.io';

    const { data, error } = await resend.emails.send({
      from: 'SMBautomation Contact Form <noreply@smbautomation.io>',
      to: [toEmail],
      replyTo: email,
      subject: `New Lead: ${name} — ${businessType ?? 'Unknown Business Type'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0a0a0a; color: #f0f0f0; border-radius: 8px;">
          <h2 style="color: #22c55e; margin-top: 0;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #999; width: 140px;">Name</td>
              <td style="padding: 8px 0; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #22c55e;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; color: #999;">Phone</td>
              <td style="padding: 8px 0;">${phone}</td>
            </tr>` : ''}
            ${businessType ? `
            <tr>
              <td style="padding: 8px 0; color: #999;">Business Type</td>
              <td style="padding: 8px 0;">${businessType}</td>
            </tr>` : ''}
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #1a1a1a; border-radius: 6px; border-left: 3px solid #22c55e;">
            <p style="color: #999; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Their Bottleneck</p>
            <p style="margin: 0; line-height: 1.6;">${bottleneck}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #666;">
            Submitted via smbautomation.io contact form · Reply directly to this email to reach ${name}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
