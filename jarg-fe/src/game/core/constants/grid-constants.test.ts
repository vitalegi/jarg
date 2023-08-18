import { expect, test } from 'vitest';
import { GridColors } from './grid-constants';

test('GridColors contains expected colors', () => {
  const values = GridColors.values();
  expect(values.length).toBe(3);
});
