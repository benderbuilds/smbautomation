import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmails } from '@/lib/emails';
import { appendRow } from '@/lib/sheets';
import { parseAttribution, ATTR_COOKIE } from '@/lib/attribution';
import { handleContact } from '@/lib/contact';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await handleContact(
      body && typeof body === 'object' ? body : {},
      {
        attribution: parseAttribution(req.cookies.get(ATTR_COOKIE)?.value),
        referer: req.headers.get('referer'),
        now: new Date(),
      },
      { appendRow, sendContactEmails }
    );
    return NextResponse.json(result.body, { status: result.status });
  } catch (err) {
    console.error('[contact] Error:', err);
    return NextResponse.json({ error: 'Something went wrong. Try again, or email jesse@smbautomation.io.' }, { status: 500 });
  }
}
