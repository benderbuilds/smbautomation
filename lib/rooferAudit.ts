export const LEAD_RANGES = [
  { value: '<20', label: 'Fewer than 20' },
  { value: '20-50', label: '20 to 50' },
  { value: '50-150', label: '50 to 150' },
  { value: '150+', label: '150 or more' },
] as const;

export interface RooferAudit {
  name: string;
  company: string;
  phone: string;
  email: string;
  monthlyLeads: string;
}

export type RooferAuditResult =
  | { ok: true; data: RooferAudit }
  | { ok: false; error: string; spam?: boolean };

const MAX_LEN = 200;

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim().slice(0, MAX_LEN) : '';
}

/** Digits only, with the US country code, as Meta expects for hashed phone matching. */
export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 ? `1${digits}` : digits;
}

export function validateRooferAudit(body: Record<string, unknown>): RooferAuditResult {
  if (str(body.website)) return { ok: false, error: 'Something went wrong. Try again.', spam: true };

  const data: RooferAudit = {
    name: str(body.name),
    company: str(body.company),
    phone: str(body.phone),
    email: str(body.email),
    monthlyLeads: str(body.monthlyLeads),
  };

  if (!data.name) return { ok: false, error: 'Enter your name.' };
  if (!data.company) return { ok: false, error: 'Enter your company name.' };
  const digits = normalizePhone(data.phone);
  if (digits.length !== 11 || !digits.startsWith('1')) {
    return { ok: false, error: 'Enter a 10-digit phone number.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { ok: false, error: 'Enter a valid email address.' };
  }
  if (!LEAD_RANGES.some((r) => r.value === data.monthlyLeads)) {
    return { ok: false, error: 'Pick your approximate monthly leads.' };
  }

  return { ok: true, data };
}
