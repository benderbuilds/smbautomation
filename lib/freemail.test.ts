import { describe, expect, test } from 'vitest';
import { isFreeMail } from './freemail';

describe('isFreeMail', () => {
  test('flags common free-mail domains', () => {
    expect(isFreeMail('jane@gmail.com')).toBe(true);
    expect(isFreeMail('jane@yahoo.com')).toBe(true);
    expect(isFreeMail('jane@outlook.com')).toBe(true);
    expect(isFreeMail('jane@hotmail.com')).toBe(true);
    expect(isFreeMail('jane@aol.com')).toBe(true);
    expect(isFreeMail('jane@icloud.com')).toBe(true);
    expect(isFreeMail('jane@proton.me')).toBe(true);
    expect(isFreeMail('jane@protonmail.com')).toBe(true);
  });

  test('is case-insensitive', () => {
    expect(isFreeMail('Jane@Gmail.COM')).toBe(true);
  });

  test('passes work domains', () => {
    expect(isFreeMail('jane@acmeproperties.com')).toBe(false);
  });

  test('does not flag domains that merely contain a free-mail name', () => {
    expect(isFreeMail('jane@notgmail.company.com')).toBe(false);
  });

  test('invalid emails are not flagged', () => {
    expect(isFreeMail('not-an-email')).toBe(false);
    expect(isFreeMail('')).toBe(false);
  });
});
