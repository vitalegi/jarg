import { describe, expect, test } from 'vitest';
import { asBoolean, asNumber, asString } from './converter-utils';

describe('asString', () => {
  test('given a string then should parse', () => {
    expect(asString('test')).toBe('test');
  });
  test('given null then should fail', () => {
    expect(() => asString(null)).toThrowError('value is null/undefined');
  });
  test('given undefined then should fail', () => {
    expect(() => asString(undefined)).toThrowError('value is null/undefined');
  });
  test('given number then should fail', () => {
    expect(() => asString(123)).toThrowError('not a string: 123');
  });
  test('given boolean then should fail', () => {
    expect(() => asString(true)).toThrowError('not a string: true');
  });
});

describe('asNumber', () => {
  test('given a number then should parse', () => {
    expect(asNumber(1000)).toBe(1000);
  });
  test('given null then should fail', () => {
    expect(() => asNumber(null)).toThrowError('value is null/undefined');
  });
  test('given undefined then should fail', () => {
    expect(() => asNumber(undefined)).toThrowError('value is null/undefined');
  });
  test('given string then should fail', () => {
    expect(() => asNumber('test')).toThrowError('not a number: test');
  });
  test('given number represented as a string then should fail', () => {
    expect(() => asNumber('123')).toThrowError('not a number: 123');
  });
  test('given boolean then should fail', () => {
    expect(() => asNumber(true)).toThrowError('not a number: true');
  });
});

describe('asBoolean', () => {
  test('given a boolean then should parse', () => {
    expect(asBoolean(true)).toBe(true);
    expect(asBoolean(false)).toBe(false);
  });
  test('given null then should fail', () => {
    expect(() => asBoolean(null)).toThrowError('value is null/undefined');
  });
  test('given undefined then should fail', () => {
    expect(() => asBoolean(undefined)).toThrowError('value is null/undefined');
  });
  test('given string then should fail', () => {
    expect(() => asBoolean('test')).toThrowError('not a boolean: test');
  });
  test('given boolean represented as a string then should fail', () => {
    expect(() => asBoolean('true')).toThrowError('not a boolean: true');
    expect(() => asBoolean('false')).toThrowError('not a boolean: false');
  });
});
