import { beforeEach, describe, expect, test, vi } from 'vitest';

import jargBe from './jarg-be';

beforeEach(() => {
  vi.resetAllMocks();
});

jargBe.http.post = vi.fn();
jargBe.http.get = vi.fn();
jargBe.http.getJson = vi.fn();

describe('tokenAccess', async () => {
  test('exteral call with correct params', async () => {
    const spy = vi.spyOn(jargBe.http, 'post');
    await jargBe.tokenAccess('username', 'password');
    expect(spy).toHaveBeenCalledWith(
      '/token/access',
      {},
      { 'Content-Type': 'application/json', Authorization: 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=' }
    );
  });
});

describe('tokenRefresh', async () => {
  test('exteral call with correct params', async () => {
    const spy = vi.spyOn(jargBe.http, 'post');
    await jargBe.tokenRefresh();
    expect(spy).toHaveBeenCalledWith('/token/refresh', {});
  });
});

describe('authIdentity', async () => {
  test('exteral call with correct params', async () => {
    const spy = vi.spyOn(jargBe.http, 'getJson');
    spy.mockResolvedValue({
      subject: 'user',
      expiresAt: '2023-09-03T16:17:54Z'
    });
    const identity = await jargBe.authIdentity();
    expect(spy).toHaveBeenCalledWith('/auth/identity');
    expect(identity.username).toBe('user');
  });
});

describe('logout', async () => {
  test('exteral call with correct params', async () => {
    const spy = vi.spyOn(jargBe.http, 'getJson');
    spy.mockResolvedValue({});
    await jargBe.logout();
    expect(spy).toHaveBeenCalledWith('/auth/logout');
  });
});
