import { describe, expect, test } from 'vitest';
import { buildAttr, parseAttribution } from './attribution';

const NOW = '2026-07-28T12:00:00.000Z';

describe('buildAttr', () => {
  test('captures utm params and landing page', () => {
    expect(
      buildAttr('?utm_source=google&utm_medium=cpc&utm_campaign=audit&utm_term=automation&utm_content=v1', '/apply', NOW)
    ).toEqual({
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'audit',
      utm_term: 'automation',
      utm_content: 'v1',
      landing_page: '/apply',
      first_touch_at: NOW,
    });
  });

  test('captures landing page even with no utm params', () => {
    expect(buildAttr('', '/blog/some-post', NOW)).toEqual({
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
      landing_page: '/blog/some-post',
      first_touch_at: NOW,
    });
  });

  test('ignores unrelated query params', () => {
    const attr = buildAttr('?gclid=abc123&utm_source=meta', '/', NOW);
    expect(attr?.utm_source).toBe('meta');
    expect(attr).not.toHaveProperty('gclid');
  });
});

describe('parseAttribution', () => {
  test('round-trips buildAttr output', () => {
    const attr = buildAttr('?utm_source=google', '/', NOW);
    expect(parseAttribution(JSON.stringify(attr))).toEqual(attr);
  });

  test('undefined cookie returns null', () => {
    expect(parseAttribution(undefined)).toBeNull();
  });

  test('bad JSON returns null', () => {
    expect(parseAttribution('not-json{')).toBeNull();
  });

  test('parses a URI-encoded cookie value', () => {
    const attr = buildAttr('?utm_source=google', '/', NOW);
    expect(parseAttribution(encodeURIComponent(JSON.stringify(attr)))).toEqual(attr);
  });

  test('JSON of wrong shape returns null', () => {
    expect(parseAttribution('"just a string"')).toBeNull();
    expect(parseAttribution('42')).toBeNull();
  });
});
