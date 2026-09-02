import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmails } from '@/lib/emails';
import { appendRow } from '@/lib/sheets';
import { parseAttribution, ATTR_COOKIE } from '@/lib/attribution';

const MAX_LEN = 5000;

function isValidEmail(email: unknown): email is string {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim().slice(0, MAX_LEN) : '';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = str(body.name);
    const business = str(body.business);
    const email = str(body.email);
    const phone = str(body.phone);
    const message = str(body.message);
    const interests = Array.isArray(body.interests)
      ? body.interests.filter((i: unknown) => typeof i === 'string').slice(0, 12).map(str)
      : [];

    if (!name) {
      return NextResponse.json({ error: 'Enter your name.' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ error: 'Tell us a little about your business.' }, { status: 400 });
    }

    const attr = parseAttribution(req.cookies.get(ATTR_COOKIE)?.value);

    await appendRow('Contact', [
      new Date().toISOString(),
      name,
      business,
      email,
      phone,
      interests.join(', '),
      message,
      attr?.utm_source ?? '',
      attr?.utm_medium ?? '',
      attr?.utm_campaign ?? '',
      attr?.landing_page ?? '',
    ]);

    await sendContactEmails({ name, business, email, phone, interests, message });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Error:', err);
    return NextResponse.json({ error: 'Something went wrong. Try again, or email jesse@smbautomation.io.' }, { status: 500 });
  }
}
