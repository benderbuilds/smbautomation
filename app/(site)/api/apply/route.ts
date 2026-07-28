import { NextRequest, NextResponse } from 'next/server';
import { qualifies, EMPLOYEE_OPTIONS, REVENUE_OPTIONS, VOLUME_OPTIONS, TIMELINE_OPTIONS } from '@/lib/qualify';
import { parseAttribution, ATTR_COOKIE } from '@/lib/attribution';
import { appendRow } from '@/lib/sheets';
import { sendApplicationEmails, type ApplicationSubmission } from '@/lib/emails';

function isValidEmail(email: unknown): email is string {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeWebsite(raw: string): string | null {
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(candidate);
    if (!url.hostname.includes('.')) return null;
    return url.href;
  } catch {
    return null;
  }
}

async function verifyTurnstile(token: unknown, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== 'string' || !token) return false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success;
  } catch (err) {
    console.error('[apply] Turnstile verification errored:', err);
    return true; // do not lose real applicants to a Cloudflare outage
  }
}

const REQUIRED_TEXT_FIELDS = [
  'firstName', 'lastName', 'phone', 'company', 'role', 'industry',
  'friction', 'software', 'outcome',
] as const;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot: bots fill it, humans never see it. Pretend success.
    if (typeof body.company_fax === 'string' && body.company_fax.trim() !== '') {
      return NextResponse.json({ qualified: false });
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;
    if (!(await verifyTurnstile(body.turnstileToken, ip))) {
      return NextResponse.json({ error: 'Spam check failed. Please try again.' }, { status: 400 });
    }

    for (const field of REQUIRED_TEXT_FIELDS) {
      if (typeof body[field] !== 'string' || !body[field].trim()) {
        return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
      }
    }
    if (!isValidEmail(body.email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }
    if (typeof body.website !== 'string' || !body.website.trim()) {
      return NextResponse.json({ error: 'Company website is required.' }, { status: 400 });
    }
    const website = normalizeWebsite(body.website.trim());
    if (!website) {
      return NextResponse.json({ error: 'Company website must be a valid URL.' }, { status: 400 });
    }
    if (!(EMPLOYEE_OPTIONS as readonly string[]).includes(body.employees)) {
      return NextResponse.json({ error: 'Select the number of employees.' }, { status: 400 });
    }
    if (!(REVENUE_OPTIONS as readonly string[]).includes(body.revenue)) {
      return NextResponse.json({ error: 'Select the annual revenue range.' }, { status: 400 });
    }
    if (!(VOLUME_OPTIONS as readonly string[]).includes(body.volume)) {
      return NextResponse.json({ error: 'Select the approximate monthly volume.' }, { status: 400 });
    }
    if (!(TIMELINE_OPTIONS as readonly string[]).includes(body.timeline)) {
      return NextResponse.json({ error: 'Select an implementation timeline.' }, { status: 400 });
    }

    const submission: ApplicationSubmission = {
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      company: body.company.trim(),
      website,
      role: body.role.trim(),
      industry: body.industry.trim(),
      employees: body.employees,
      revenue: body.revenue,
      volume: body.volume,
      friction: body.friction.trim(),
      software: body.software.trim(),
      outcome: body.outcome.trim(),
      timeline: body.timeline,
    };

    const qualified = qualifies(submission);
    const attr = parseAttribution(req.cookies.get(ATTR_COOKIE)?.value);
    const referrer = req.headers.get('referer') ?? '';

    await appendRow('Applications', [
      new Date().toISOString(),
      submission.firstName,
      submission.lastName,
      submission.email,
      submission.phone,
      submission.company,
      submission.website,
      submission.role,
      submission.industry,
      submission.employees,
      submission.revenue,
      submission.volume,
      submission.friction,
      submission.software,
      submission.outcome,
      submission.timeline,
      qualified ? 'QUALIFIED' : 'NOT QUALIFIED',
      attr?.utm_source ?? '',
      attr?.utm_medium ?? '',
      attr?.utm_campaign ?? '',
      attr?.utm_term ?? '',
      attr?.utm_content ?? '',
      attr?.landing_page ?? '',
      attr?.first_touch_at ?? '',
      referrer,
    ]);

    await sendApplicationEmails({ submission, qualified });

    return NextResponse.json({ qualified });
  } catch (err) {
    console.error('[apply] Error:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
