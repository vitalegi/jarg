import { expect, test } from 'vitest';
import AssetIndex from './asset-index';

test('given a valid object when parse then should work', () => {
  const values = AssetIndex.parse({
    collections: [
      {
        url: '/assets/characters/characters_001_01.json',
        animations: ['a', 'b', 'c']
      },
      {
        url: '/assets/characters/characters_001_02.json',
        animations: ['d', 'e', 'f']
      }
    ]
  });
  expect(values.collections.length).toBe(2);
  const collection1 = values.collections[0];
  const collection2 = values.collections[1];
  expect(collection1.animations).toEqual(['a', 'b', 'c']);
  expect(collection2.animations).toEqual(['d', 'e', 'f']);
});
