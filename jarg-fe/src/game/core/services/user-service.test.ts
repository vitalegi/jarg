import { beforeEach, describe, expect, test, vi } from 'vitest';
import UserService from './user-service';
import Observer from '../../observers/observer';
import User from '../models/user';

const observer = new Observer();
const usersService = new UserService(observer);
const user1 = new User();
user1.id = '123';
user1.username = 'test1';

beforeEach(() => {
  vi.resetAllMocks();
});

describe('login', async () => {
  test('user state is updated', async () => {
    expect(usersService.isAuthenticated()).resolves.toBe(false);
    await usersService.login(user1);
    expect(usersService.isAuthenticated()).resolves.toBe(true);
  });
});

describe('logout', async () => {
  test('user state is updated', async () => {
    await usersService.login(user1);
    await expect(usersService.isAuthenticated()).resolves.toBe(true);
    await usersService.logout();
    await expect(usersService.isAuthenticated()).resolves.toBe(false);
  });
  test('multiple invocations are valid', async () => {
    await usersService.login(user1);
    await usersService.logout();
    await usersService.logout();
    await usersService.logout();
  });
});
