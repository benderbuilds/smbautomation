import { describe, expect, test } from 'vitest';
import {
  EMPLOYEE_OPTIONS,
  REVENUE_OPTIONS,
  TIMELINE_OPTIONS,
  VOLUME_OPTIONS,
  qualifies,
} from './qualify';

describe('option arrays match the spec exactly', () => {
  test('employee options', () => {
    expect(EMPLOYEE_OPTIONS).toEqual([
      '1 to 4',
      '5 to 10',
      '11 to 25',
      '26 to 50',
      '51 to 100',
      'More than 100',
    ]);
  });

  test('revenue options', () => {
    expect(REVENUE_OPTIONS).toEqual([
      'Under $500,000',
      '$500,000 to $1 million',
      '$1 million to $2 million',
      '$2 million to $5 million',
      '$5 million to $10 million',
      '$10 million to $25 million',
      'More than $25 million',
    ]);
  });

  test('volume options', () => {
    expect(VOLUME_OPTIONS).toEqual([
      'Fewer than 100',
      '100 to 399',
      '400 to 999',
      '1,000 to 2,499',
      '2,500 or more',
    ]);
  });

  test('timeline options', () => {
    expect(TIMELINE_OPTIONS).toEqual([
      'Immediately',
      'Within 30 days',
      'Within 90 days',
      'Within six months',
      'Researching options',
    ]);
  });
});

describe('qualifies', () => {
  test('qualified: enough employees and revenue at threshold', () => {
    expect(
      qualifies({ employees: '5 to 10', revenue: '$1 million to $2 million', volume: 'Fewer than 100' })
    ).toBe(true);
  });

  test('qualified via volume alone despite low revenue', () => {
    expect(
      qualifies({ employees: '5 to 10', revenue: 'Under $500,000', volume: '400 to 999' })
    ).toBe(true);
  });

  test('not qualified: too few employees even with top revenue', () => {
    expect(
      qualifies({ employees: '1 to 4', revenue: 'More than $25 million', volume: '2,500 or more' })
    ).toBe(false);
  });

  test('not qualified: enough employees but low revenue and low volume', () => {
    expect(
      qualifies({ employees: '11 to 25', revenue: 'Under $500,000', volume: '100 to 399' })
    ).toBe(false);
  });

  test('unknown strings never qualify', () => {
    expect(qualifies({ employees: 'lots', revenue: 'a bunch', volume: 'tons' })).toBe(false);
    expect(qualifies({ employees: '', revenue: '', volume: '' })).toBe(false);
  });

  test('qualified at highest tiers', () => {
    expect(
      qualifies({ employees: 'More than 100', revenue: 'More than $25 million', volume: '2,500 or more' })
    ).toBe(true);
  });
});
