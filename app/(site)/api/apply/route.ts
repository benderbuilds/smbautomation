import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

function isValidEmail(email: string) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName, lastName, email, companyName, companyWebsite,
      role, companySize, revenue, budget, howWeCanHelp,
      improvements, anythingElse,
    } = body;

    if (typeof firstName !== 'string' || !firstName || typeof lastName !== 'string' || !lastName) {
      return NextResponse.json({ error: 'First and last name are required.' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }
    if (
      typeof companyName !== 'string' || !companyName ||
      typeof role !== 'string' || !role ||
      typeof companySize !== 'string' || !companySize ||
      typeof revenue !== 'string' || !revenue ||
      typeof budget !== 'string' || !budget ||
      typeof howWeCanHelp !== 'string' || !howWeCanHelp
    ) {
      return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 });
    }
    if (!Array.isArray(improvements) || improvements.length === 0 || !improvements.every((i: unknown) => typeof i === 'string')) {
      return NextResponse.json({ error: 'Select at least one improvement area.' }, { status: 400 });
    }

    const ts = new Date().toISOString();

    const textBody = [
      `First Name: ${firstName}`,
      `Last Name: ${lastName}`,
      `Email: ${email}`,
      `Company: ${companyName}`,
      `Website: ${companyWebsite || 'Not provided'}`,
      `Role: ${role}`,
      `Company Size: ${companySize}`,
      `Revenue: ${revenue}`,
      `Budget: ${budget}`,
      `How We Can Help: ${howWeCanHelp}`,
      `Improvements: ${improvements.join(', ')}`,
      `Anything Else: ${anythingElse || 'Not provided'}`,
      `Submitted: ${ts}`,
    ].join('\n');

    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.CONTACT_EMAIL || 'jesse@smbautomation.io';

    if (apiKey) {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: 'SMB Automation <noreply@smbautomation.io>',
        to: adminEmail,
        replyTo: email,
        subject: `New application: ${firstName} ${lastName} from ${companyName}`,
        text: textBody,
      });
    } else {
      console.log('[apply] RESEND_API_KEY not set — logging application:\n', textBody);
    }

    const dataDir = path.join(process.cwd(), 'data');
    const appsFile = path.join(dataDir, 'applications.json');
    try {
      await fs.mkdir(dataDir, { recursive: true });
      let apps: object[] = [];
      try {
        const raw = await fs.readFile(appsFile, 'utf8');
        apps = JSON.parse(raw);
      } catch {
        // file doesn't exist yet
      }
      apps.push({ ...body, ts });
      await fs.writeFile(appsFile, JSON.stringify(apps, null, 2));
    } catch (err) {
      console.error('[apply] Failed to write applications.json:', err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[apply] Error:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
