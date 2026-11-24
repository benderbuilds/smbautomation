export const WEEKS_PER_MONTH = 4.3;

export interface RentInputs {
  /** Missed prospect calls per week. */
  missedCallsPerWeek: number;
  /** Share of those callers who would have signed a lease, as a percent (5 means 5%). */
  conversionPercent: number;
  /** Average monthly rent in dollars. */
  monthlyRent: number;
}

/** Turns a raw input string into a non-negative finite number. Blank or invalid input counts as 0. */
export function toNumber(raw: string): number {
  const n = Number(raw.replace(/[$,%\s]/g, ''));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/** A conversion share above 100% would mean more signed leases than missed callers. */
export const MAX_PERCENT = 100;

export function isPercentInRange(n: number): boolean {
  return n >= 0 && n <= MAX_PERCENT;
}

/** Leases lost per month: calls per week x 4.3 weeks x conversion rate. */
export function leasesLost({ missedCallsPerWeek, conversionPercent }: RentInputs): number {
  return missedCallsPerWeek * WEEKS_PER_MONTH * (conversionPercent / 100);
}

/** Monthly rent at risk: leases lost x average monthly rent (one month vacant each). */
export function rentAtRisk(inputs: RentInputs): number {
  return leasesLost(inputs) * inputs.monthlyRent;
}

export function formatDollars(n: number): string {
  return `$${Math.round(n).toLocaleString('en-US')}`;
}

/** Up to 2 decimals, trailing zeros dropped: 0.05 -> "0.05", 5 -> "5", 1.72 -> "1.72". */
export function formatPlain(n: number): string {
  return String(Math.round(n * 100) / 100);
}
