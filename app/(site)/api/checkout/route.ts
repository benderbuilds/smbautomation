import { NextRequest, NextResponse } from 'next/server';
import { parseAttribution, ATTR_COOKIE } from '@/lib/attribution';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://smbautomation.io';

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: 'Checkout is not available yet. Email jesse@smbautomation.io to purchase.' },
      { status: 503 }
    );
  }

  try {
    const { default: Stripe } = await import('stripe');
    const stripe = new Stripe(secretKey);
    const attr = parseAttribution(req.cookies.get(ATTR_COOKIE)?.value);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: 49500,
            product_data: { name: 'Single Workflow Audit' },
          },
        },
      ],
      success_url: `${SITE_URL}/single-workflow-audit/intake?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/single-workflow-audit`,
      metadata: {
        utm_source: attr?.utm_source ?? '',
        utm_medium: attr?.utm_medium ?? '',
        utm_campaign: attr?.utm_campaign ?? '',
        utm_term: attr?.utm_term ?? '',
        utm_content: attr?.utm_content ?? '',
        landing_page: attr?.landing_page ?? '',
        first_touch_at: attr?.first_touch_at ?? '',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[checkout] Error:', err);
    return NextResponse.json(
      { error: 'Checkout is temporarily unavailable. Please try again shortly.' },
      { status: 500 }
    );
  }
}
