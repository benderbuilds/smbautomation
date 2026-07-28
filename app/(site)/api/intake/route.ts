import { NextRequest, NextResponse } from 'next/server';
import { appendRow } from '@/lib/sheets';

function isValidEmail(email: unknown): email is string {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, workflow, software, volume, sessionId } = body;

    for (const [key, value] of Object.entries({ name, company, workflow, software, volume })) {
      if (typeof value !== 'string' || !value.trim()) {
        return NextResponse.json({ error: `The ${key} field is required.` }, { status: 400 });
      }
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    await appendRow('Purchases', [
      new Date().toISOString(),
      'INTAKE',
      name.trim(),
      email.trim(),
      company.trim(),
      workflow.trim(),
      software.trim(),
      volume.trim(),
      typeof sessionId === 'string' ? sessionId : '',
    ]);

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'SMB Automation <notifications@smbautomation.io>',
          to: process.env.CONTACT_EMAIL || 'jesse@smbautomation.io',
          replyTo: email.trim(),
          subject: `Workflow audit intake: ${company.trim()}`,
          text: [
            `Name: ${name.trim()}`,
            `Email: ${email.trim()}`,
            `Company: ${company.trim()}`,
            `Stripe session: ${typeof sessionId === 'string' ? sessionId : 'not provided'}`,
            '',
            `Workflow: ${workflow.trim()}`,
            '',
            `Software: ${software.trim()}`,
            '',
            `Volume and owners: ${volume.trim()}`,
          ].join('\n'),
        });
      } catch (err) {
        console.error('[intake] Email failed:', err);
      }
    } else {
      console.log('[intake] RESEND_API_KEY not set, skipping email');
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[intake] Error:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
