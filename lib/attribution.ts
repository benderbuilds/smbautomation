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

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

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
