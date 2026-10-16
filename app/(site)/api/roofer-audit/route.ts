import { NextRequest, NextResponse } from 'next/server';
import { sendRooferAuditEmails } from '@/lib/emails';
import { appendRow } from '@/lib/sheets';
import { parseAttribution, ATTR_COOKIE } from '@/lib/attribution';
import { validateRooferAudit } from '@/lib/rooferAudit';
import { sendCapiEvent } from '@/lib/metaCapi';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = validateRooferAudit(body);

    if (!result.ok) {
      // Bots get a fake success so they don't retry with the honeypot empty.
      if (result.spam) return NextResponse.json({ ok: true });
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const { name, company, phone, email, monthlyLeads } = result.data;
    const attr = parseAttribution(req.cookies.get(ATTR_COOKIE)?.value);
    const eventId = typeof body.eventId === 'string' ? body.eventId.slice(0, 100) : undefined;
    const [firstName, ...rest] = name.split(/\s+/);

    await appendRow('RooferAudit', [
      new Date().toISOString(),
      name,
      company,
      phone,
      email,
      monthlyLeads,
      attr?.utm_source ?? '',
      attr?.utm_medium ?? '',
      attr?.utm_campaign ?? '',
      attr?.utm_content ?? '',
      attr?.landing_page ?? '',
    ]);

    await Promise.all([
      sendRooferAuditEmails({
        name,
        company,
        phone,
        email,
        monthlyLeads,
        source: [attr?.utm_source, attr?.utm_campaign, attr?.utm_content].filter(Boolean).join(' / '),
      }),
      sendCapiEvent('Lead', {
        eventId,
        eventSourceUrl: req.headers.get('referer') ?? 'https://smbautomation.io/roofers',
        email,
        phone,
        firstName,
        lastName: rest.join(' '),
        clientIp: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
        userAgent: req.headers.get('user-agent') ?? undefined,
        fbp: req.cookies.get('_fbp')?.value,
        fbc: req.cookies.get('_fbc')?.value,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[roofer-audit] Error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Try again, or email jesse@smbautomation.io.' },
      { status: 500 }
    );
  }
}
