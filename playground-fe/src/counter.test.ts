import { expect, test } from 'vitest';
import { setupCounter } from './counter';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

test('Given counter=0 when click once then counter=1', () => {
  const element = {
    innerHTML: '',
    addEventListener: (event: string, fn: () => void): void => {
      if (event === 'click') {
        element.click = fn;
      }
    }
  } as HTMLButtonElement;

  setupCounter(element);
  element.click();
  expect(element.innerHTML).toBe('count is 1');
});

test('Given counter=0 when click twice then counter=2', () => {
  const dom = new JSDOM('<!DOCTYPE html><button id="counter" type="button"></button>');
  const element = dom.window.document.querySelector('#counter') as HTMLButtonElement;
  setupCounter(element);
  element.click();
  element.click();
  expect(element.innerHTML).toBe('count is 2');
});
