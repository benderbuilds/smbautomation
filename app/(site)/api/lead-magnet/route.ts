import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: 'Jesse at SMB Automation <noreply@smbautomation.io>',
        to: email,
        subject: 'Your SMB Automation Audit checklist',
        html: `
          <div style="font-family: 'Barlow', 'Helvetica Neue', Helvetica, sans-serif; max-width: 600px; margin: 0 auto; background: #EDF1F7; padding: 2rem;">
            <div style="background: #2540D9; padding: 1.5rem 2rem;">
              <span style="font-size: 0.9rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #FFFFFF;">SMB Automation</span>
            </div>
            <div style="background: #FFFFFF; border: 1px solid #D4DAE8; border-top: none; padding: 2rem 2rem 2.5rem;">
              <h2 style="font-size: 1.3rem; font-weight: 500; color: #0A0E1A; margin: 0 0 1rem;">Your 12-point SMB Automation Audit</h2>
              <p style="color: #5A6580; line-height: 1.7; margin: 0 0 1.5rem; font-size: 0.95rem;">
                Thanks for requesting the checklist. You'll find the PDF attached to this email.
              </p>
              <p style="color: #5A6580; line-height: 1.7; margin: 0; font-size: 0.95rem;">
                Questions? Reply to this email or book a free strategy call.
              </p>
            </div>
          </div>`,
        attachments: [
          {
            filename: 'smb-automation-audit-checklist.pdf',
            path: path.join(process.cwd(), 'public/assets/smb-automation-audit-checklist.pdf'),
          },
        ],
      });
    } else {
      console.log('[lead-magnet] RESEND_API_KEY not set — logging lead:', email);
    }

    const dataDir = path.join(process.cwd(), 'data');
    const leadsFile = path.join(dataDir, 'leads.json');
    try {
      await fs.mkdir(dataDir, { recursive: true });
      let leads: { email: string; ts: string }[] = [];
      try {
        const raw = await fs.readFile(leadsFile, 'utf8');
        leads = JSON.parse(raw);
      } catch {
        // file doesn't exist yet
      }
      leads.push({ email, ts: new Date().toISOString() });
      await fs.writeFile(leadsFile, JSON.stringify(leads, null, 2));
    } catch (err) {
      console.error('[lead-magnet] Failed to write leads.json:', err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[lead-magnet] Error:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
