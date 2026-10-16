import { describe, expect, test } from 'vitest';
import { createHash } from 'crypto';
import { buildUserData } from './metaCapi';

const sha = (v: string) => createHash('sha256').update(v).digest('hex');

describe('buildUserData', () => {
  test('hashes normalized email, phone, and names', () => {
    const ud = buildUserData({
      email: ' Dale@HughesRoofing.com ',
      phone: '(319) 555-0142',
      firstName: 'Dale',
      lastName: 'Hughes',
    });
    expect(ud.em).toEqual([sha('dale@hughesroofing.com')]);
    expect(ud.ph).toEqual([sha('13195550142')]);
    expect(ud.fn).toEqual([sha('dale')]);
    expect(ud.ln).toEqual([sha('hughes')]);
  });

  test('passes IP, user agent, and click ids through unhashed', () => {
    const ud = buildUserData({ clientIp: '1.2.3.4', userAgent: 'UA', fbp: 'fb.1.a', fbc: 'fb.1.b' });
    expect(ud).toEqual({
      client_ip_address: '1.2.3.4',
      client_user_agent: 'UA',
      fbp: 'fb.1.a',
      fbc: 'fb.1.b',
    });
  });

  test('omits fields that are missing', () => {
    expect(buildUserData({})).toEqual({});
  });
});
