import { beforeEach, describe, expect, test, vi } from 'vitest';
import UserService from './user-service';
import Observer from '../../observers/observer';
import jargBe from '../../../api/jarg-be';

const observer = new Observer();
const userService = new UserService(observer);

beforeEach(() => {
  vi.resetAllMocks();
});

describe('login', async () => {
  test('external service is called', async () => {
    const spy = vi.spyOn(jargBe, 'tokenAccess');
    spy.mockResolvedValue();

    await userService.login('user1', 'password');
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith('user1', 'password');
  });
});

describe('tokenRefresh', async () => {
  test('external service is called', async () => {
    const spy = vi.spyOn(jargBe, 'tokenRefresh');
    spy.mockResolvedValue();

    await userService.tokenRefresh();
    expect(spy).toHaveBeenCalledOnce();
  });
});

describe('getIdentity', async () => {
  test('external service is called', async () => {
    const spy = vi.spyOn(jargBe, 'authIdentity');
    spy.mockResolvedValue({ username: 'user1' });

    const out = await userService.getIdentity();
    expect(spy).toHaveBeenCalledOnce();
    expect(out.username).toBe('user1');
  });
});

describe('isAuthenticated', async () => {
  test('external service is called', async () => {
    const spy = vi.spyOn(jargBe, 'authIdentity');
    spy.mockResolvedValue({ username: 'user1' });

    const out = await userService.isAuthenticated();
    expect(spy).toHaveBeenCalledOnce();
    expect(out).toBe(true);
  });

  test('external service is called and fails', async () => {
    const spy = vi.spyOn(jargBe, 'authIdentity');
    spy.mockRejectedValue({});

    const out = await userService.isAuthenticated();
    expect(spy).toHaveBeenCalledOnce();
    expect(out).toBe(false);
  });
});

describe('logout', async () => {
  test('external service is called', async () => {
    const spy = vi.spyOn(jargBe, 'logout');
    spy.mockResolvedValue();

    await userService.logout();
    expect(spy).toHaveBeenCalledOnce();
  });
});
