import { NextRequest, NextResponse } from 'next/server';
import { appendRow } from '@/lib/sheets';
import { sendSampleAuditEmail } from '@/lib/emails';
import { parseAttribution, ATTR_COOKIE } from '@/lib/attribution';

function isValidEmail(email: unknown): email is string {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email } = body;

    if (typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    const attr = parseAttribution(req.cookies.get(ATTR_COOKIE)?.value);

    await appendRow('SampleAudit', [
      new Date().toISOString(),
      name.trim(),
      email.trim(),
      attr?.utm_source ?? '',
      attr?.utm_medium ?? '',
      attr?.utm_campaign ?? '',
      attr?.landing_page ?? '',
      req.headers.get('referer') ?? '',
    ]);

    await sendSampleAuditEmail({ name: name.trim(), email: email.trim() });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[sample-audit] Error:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
