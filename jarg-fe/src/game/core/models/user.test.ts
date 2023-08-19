import { expect, test } from 'vitest';
import User from './user';

test('given an object that is a valid user then should parse', () => {
  const value = User.parse({
    id: '1',
    username: 'test',
    authenticated: true
  });
  expect(value.id).toBe('1');
  expect(value.username).toBe('test');
  expect(value.authenticated).toBe(true);
});

test('given a User then should parse', () => {
  const value = new User();
  value.id = '1';
  value.username = 'test';
  value.authenticated = true;

  expect(value.id).toBe('1');
  expect(value.username).toBe('test');
  expect(value.authenticated).toBe(true);
});
