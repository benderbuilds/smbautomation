import { NextRequest, NextResponse } from 'next/server';
import { appendRow } from '@/lib/sheets';
import { sendPurchaseEmails } from '@/lib/emails';
import { sendCapiEvent } from '@/lib/metaCapi';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secretKey || !webhookSecret) {
    console.warn('[stripe-webhook] env missing, ignoring event');
    return NextResponse.json({ received: true });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const { default: Stripe } = await import('stripe');
  const stripe = new Stripe(secretKey);

  let event;
  try {
    const payload = await req.text();
    event = await stripe.webhooks.constructEventAsync(payload, signature, webhookSecret);
  } catch (err) {
    console.error('[stripe-webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const name = session.customer_details?.name ?? '';
    const email = session.customer_details?.email ?? '';
    const meta = session.metadata ?? {};

    await appendRow('Purchases', [
      new Date().toISOString(),
      name,
      email,
      'Single Workflow Audit',
      (session.amount_total ?? 0) / 100,
      session.id,
      meta.utm_source ?? '',
      meta.utm_medium ?? '',
      meta.utm_campaign ?? '',
      meta.utm_term ?? '',
      meta.utm_content ?? '',
      meta.landing_page ?? '',
      meta.first_touch_at ?? '',
    ]);

    if (email) {
      await sendPurchaseEmails({
        buyer: { name, email, sessionId: session.id, amountTotal: session.amount_total ?? undefined },
      });
    }

    await sendCapiEvent('Purchase', {
      email: email || undefined,
      value: (session.amount_total ?? 49500) / 100,
      currency: 'USD',
      eventSourceUrl: 'https://smbautomation.io/single-workflow-audit',
    });
  }

  return NextResponse.json({ received: true });
}
