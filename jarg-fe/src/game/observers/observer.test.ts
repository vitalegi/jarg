/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi, afterEach, describe, expect, test } from 'vitest';
import Observer from './observer';

afterEach(() => {
  vi.restoreAllMocks();
});

test('given an event when more then one subscribers, all receive the event', () => {
  const payloads = new Array<any>();
  const observer = new Observer();

  observer.subscribe('test', (payload: any) => payloads.push(payload));
  observer.subscribe('test', (payload: any) => payloads.push(payload));

  observer.publish('test', { test: 'this is a test' });

  expect(payloads.length).toBe(2);
});

test('given an event when 0 subscribers, a log is written', () => {
  const payloads = new Array<any>();
  const observer = new Observer();
  observer.log.info = vi.fn();

  observer.publish('test', { test: 'this is a test' });
  expect(observer.log.info).toBeCalledWith('No subscriber for event test');
});

test("an unsubscribed subscriber doesn't receive notifications", () => {
  const payloads = new Array<any>();
  const observer = new Observer();
  observer.log.info = vi.fn();

  const s = observer.subscribe('test', (payload: any) => payloads.push(payload));
  observer.unsubscribe(s);
  observer.publish('test', { test: 'this is a test' });
  expect(payloads.length, 'No subscriber should receive the message').toBe(0);
  expect(observer.log.info).toBeCalledWith('No subscriber for event test');
});
