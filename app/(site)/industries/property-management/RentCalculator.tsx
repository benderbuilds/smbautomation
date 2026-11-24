'use client';

import { useState } from 'react';
import {
  formatDollars,
  formatPlain,
  isPercentInputValid,
  MAX_PERCENT,
  leasesLost,
  rentAtRisk,
  toNumber,
  WEEKS_PER_MONTH,
} from '@/lib/rentAtRisk';
import s from './page.module.css';

const FIELDS = [
  {
    id: 'calc-calls',
    key: 'calls',
    label: 'Missed prospect calls per week',
    prefix: '',
    suffix: '',
  },
  {
    id: 'calc-rate',
    key: 'rate',
    label: 'Share that would have signed a lease',
    prefix: '',
    suffix: '%',
  },
  {
    id: 'calc-rent',
    key: 'rent',
    label: 'Average monthly rent',
    prefix: '$',
    suffix: '',
  },
] as const;

type Key = (typeof FIELDS)[number]['key'];

export default function RentCalculator() {
  const [values, setValues] = useState<Record<Key, string>>({
    calls: '8',
    rate: '5',
    rent: '1,150',
  });

  const rateInvalid = !isPercentInputValid(values.rate);
  const inputs = {
    missedCallsPerWeek: toNumber(values.calls),
    // Out of range shows a message and calculates nothing until it is fixed.
    conversionPercent: rateInvalid ? 0 : toNumber(values.rate),
    monthlyRent: toNumber(values.rent),
  };
  const leases = leasesLost(inputs);
  const total = rentAtRisk(inputs);

  return (
    <form className={s.calc} onSubmit={(e) => e.preventDefault()} aria-label="Missed leasing call calculator">
      {FIELDS.map((f) => {
        const invalid = f.key === 'rate' && rateInvalid;
        return (
          <div key={f.key} className={s.calcRow}>
            <div className={s.calcLabelWrap}>
              <label htmlFor={f.id} className={s.calcLabel}>
                {f.label}
              </label>
              {invalid && (
                <p id={`${f.id}-error`} className={s.calcError} role="alert">
                  Enter a percentage from 0 to {MAX_PERCENT}.
                </p>
              )}
            </div>
            <div className={s.calcInputWrap}>
              {f.prefix && <span aria-hidden="true">{f.prefix}</span>}
              <input
                id={f.id}
                className={s.calcInput}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={values[f.key]}
                aria-invalid={invalid || undefined}
                aria-describedby={invalid ? `${f.id}-error` : undefined}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              />
              {f.suffix && <span aria-hidden="true">{f.suffix}</span>}
            </div>
          </div>
        );
      })}
      <div className={s.calcResult}>
        <div className={s.calcResultCopy}>
          <span className={s.calcResultLabel}>Estimated rent at risk each month</span>
          <span className={s.calcMath}>
            {formatPlain(inputs.missedCallsPerWeek)} calls × {WEEKS_PER_MONTH} weeks ×{' '}
            {formatPlain(inputs.conversionPercent)}% = {leases.toFixed(1)} leases, one month vacant each
          </span>
        </div>
        <output className={s.calcValue} htmlFor="calc-calls calc-rate calc-rent" aria-live="polite">
          {formatDollars(total)}
        </output>
      </div>
    </form>
  );
}
