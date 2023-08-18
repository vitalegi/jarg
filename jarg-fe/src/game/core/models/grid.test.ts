import { expect, test } from 'vitest';
import Grid, { GridEntry } from './grid';

test('given an object when valid grid then should parse', () => {
  const values = Grid.parse({
    horizontal: 1,
    vertical: 2,
    entries: [
      {
        color: 'red',
        id: '001',
        horizontalIndex: 0,
        verticalIndex: 0
      },
      {
        color: 'blue',
        id: '002',
        horizontalIndex: 2,
        verticalIndex: 1
      }
    ]
  });
  expect(values.horizontal).toBe(1);
  expect(values.vertical).toBe(2);
  expect(values.entries.length).toBe(2);
  const e1 = values.entries[0];
  expect(e1.color).toBe('red');
  expect(e1.id).toBe('001');
  expect(e1.horizontalIndex).toBe(0);
  expect(e1.verticalIndex).toBe(0);
  const e2 = values.entries[1];
  expect(e2.color).toBe('blue');
  expect(e2.id).toBe('002');
  expect(e2.horizontalIndex).toBe(2);
  expect(e2.verticalIndex).toBe(1);
});
