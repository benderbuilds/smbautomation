import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmails } from '@/lib/emails';
import { appendRow } from '@/lib/sheets';
import { parseAttribution, ATTR_COOKIE } from '@/lib/attribution';

function isValidEmail(email: unknown): email is string {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }
    if (typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const attr = parseAttribution(req.cookies.get(ATTR_COOKIE)?.value);

    await appendRow('Contact', [
      new Date().toISOString(),
      name.trim(),
      email.trim(),
      message.trim(),
      attr?.utm_source ?? '',
      attr?.utm_medium ?? '',
      attr?.utm_campaign ?? '',
      attr?.landing_page ?? '',
    ]);

    await sendContactEmails({ name: name.trim(), email: email.trim(), message: message.trim() });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Error:', err);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
