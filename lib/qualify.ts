export const EMPLOYEE_OPTIONS = [
  '1 to 4',
  '5 to 10',
  '11 to 25',
  '26 to 50',
  '51 to 100',
  'More than 100',
] as const;

export const REVENUE_OPTIONS = [
  'Under $500,000',
  '$500,000 to $1 million',
  '$1 million to $2 million',
  '$2 million to $5 million',
  '$5 million to $10 million',
  '$10 million to $25 million',
  'More than $25 million',
] as const;

export const VOLUME_OPTIONS = [
  'Fewer than 100',
  '100 to 399',
  '400 to 999',
  '1,000 to 2,499',
  '2,500 or more',
] as const;

export const TIMELINE_OPTIONS = [
  'Immediately',
  'Within 30 days',
  'Within 90 days',
  'Within six months',
  'Researching options',
] as const;

const MIN_EMPLOYEES = EMPLOYEE_OPTIONS.indexOf('5 to 10');
const MIN_REVENUE = REVENUE_OPTIONS.indexOf('$1 million to $2 million');
const MIN_VOLUME = VOLUME_OPTIONS.indexOf('400 to 999');

export interface QualifyInput {
  employees: string;
  revenue: string;
  volume: string;
}

export function qualifies({ employees, revenue, volume }: QualifyInput): boolean {
  const e = (EMPLOYEE_OPTIONS as readonly string[]).indexOf(employees);
  const r = (REVENUE_OPTIONS as readonly string[]).indexOf(revenue);
  const v = (VOLUME_OPTIONS as readonly string[]).indexOf(volume);

  if (e < MIN_EMPLOYEES) return false;
  return (r >= 0 && r >= MIN_REVENUE) || (v >= 0 && v >= MIN_VOLUME);
}
