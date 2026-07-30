/**
 * Server-side Meta Conversions API. No-ops without META_CAPI_TOKEN and
 * NEXT_PUBLIC_META_PIXEL_ID. Never throws.
 */
export async function sendCapiEvent(
  name: string,
  data: { email?: string; eventSourceUrl?: string; value?: number; currency?: string } = {}
): Promise<void> {
  const token = process.env.META_CAPI_TOKEN;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!token || !pixelId) {
    console.log(`[meta-capi] env missing, skipping event ${name}`);
    return;
  }
  try {
    const { createHash } = await import('crypto');
    const userData: Record<string, unknown> = {};
    if (data.email) {
      userData.em = [createHash('sha256').update(data.email.trim().toLowerCase()).digest('hex')];
    }
    const body = {
      data: [
        {
          event_name: name,
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: data.eventSourceUrl,
          user_data: userData,
          custom_data:
            data.value != null ? { value: data.value, currency: data.currency ?? 'USD' } : undefined,
        },
      ],
    };
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) console.error(`[meta-capi] event ${name} failed: ${res.status} ${await res.text()}`);
  } catch (err) {
    console.error(`[meta-capi] event ${name} errored:`, err);
  }
}
