import { expect, test } from 'vitest';
import User from './user';

test('given an object that is a valid user then should parse', () => {
  const value = User.parse({
    subject: 'test',
    authenticated: true
  });
  expect(value.username).toBe('test');
});

test('given a User then should parse', () => {
  const value = new User();
  value.username = 'test';

  expect(value.username).toBe('test');
});
