import { describe, expect, it } from 'vitest';
import { formatDollars, isPercentInputValid, leasesLost, rentAtRisk, toNumber } from './rentAtRisk';

const defaults = { missedCallsPerWeek: 8, conversionPercent: 5, monthlyRent: 1150 };

describe('rentAtRisk', () => {
  it('shows $1,978 for the default inputs', () => {
    expect(formatDollars(rentAtRisk(defaults))).toBe('$1,978');
  });

  it('shows 1.7 leases for the default inputs', () => {
    expect(leasesLost(defaults).toFixed(1)).toBe('1.7');
  });

  it('returns 0 when any input is 0', () => {
    expect(rentAtRisk({ ...defaults, missedCallsPerWeek: 0 })).toBe(0);
    expect(rentAtRisk({ ...defaults, conversionPercent: 0 })).toBe(0);
    expect(rentAtRisk({ ...defaults, monthlyRent: 0 })).toBe(0);
    expect(formatDollars(0)).toBe('$0');
  });

  it('recalculates for new inputs', () => {
    expect(
      formatDollars(rentAtRisk({ missedCallsPerWeek: 10, conversionPercent: 10, monthlyRent: 1000 }))
    ).toBe('$4,300');
  });
});

describe('toNumber', () => {
  it('strips currency, commas, and percent signs', () => {
    expect(toNumber('$1,150')).toBe(1150);
    expect(toNumber('5%')).toBe(5);
  });

  it('treats blank, negative, and invalid input as 0', () => {
    expect(toNumber('')).toBe(0);
    expect(toNumber('-3')).toBe(0);
    expect(toNumber('abc')).toBe(0);
  });
});

describe('isPercentInputValid', () => {
  it('accepts blank and 0 through 100', () => {
    for (const v of ['', '0', '5', '5%', '100']) expect(isPercentInputValid(v)).toBe(true);
  });

  it('rejects negative, over 100, and non-numeric input', () => {
    for (const v of ['-1', '150', 'abc']) expect(isPercentInputValid(v)).toBe(false);
  });
});
