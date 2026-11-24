export const ATTR_COOKIE = 'sa_attr';
export const ATTR_MAX_AGE = 60 * 60 * 24 * 90;

export interface Attr {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  landing_page: string;
  first_touch_at: string;
}

export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

export function buildAttr(search: string, pathname: string, now: string): Attr {
  const params = new URLSearchParams(search);
  const attr = { landing_page: pathname, first_touch_at: now } as Attr;
  for (const key of UTM_KEYS) attr[key] = params.get(key) ?? '';
  return attr;
}

export function parseAttribution(cookieValue: string | undefined): Attr | null {
  if (!cookieValue) return null;
  try {
    const raw = cookieValue.startsWith('{') ? cookieValue : decodeURIComponent(cookieValue);
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || typeof parsed.landing_page !== 'string') {
      return null;
    }
    return parsed as Attr;
  } catch {
    return null;
  }
}

/** The campaign parameters to hand to a booking calendar so GHL records the source.
    First touch (the attribution cookie) wins when it has any UTM; otherwise the
    current page's own UTMs are used, so a tagged link straight to /start-trial
    still counts. Empty values are dropped. */
export function campaignParams(
  attr: Attr | null,
  search: Record<string, string | string[] | undefined> = {}
): URLSearchParams {
  const out = new URLSearchParams();
  const fromCookie = attr && UTM_KEYS.some((k) => attr[k]);
  for (const key of UTM_KEYS) {
    const raw = fromCookie ? attr![key] : search[key];
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (value) out.set(key, value);
  }
  return out;
}
