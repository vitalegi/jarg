import { expect, test } from 'vitest';
import User from './user';
import { BattleMap } from './battle-map';

test('given an object that is a valid battle map then should parse', () => {
  const value = BattleMap.parse({
    id: '2b9d117b-2bd5-4a18-8374-d2dfe324315c',
    tiles: [
      {
        coordinate: {
          x: 3,
          y: 4
        },
        animation: 'terrain_05/isometric_pixel_0043.png',
        walkable: true
      },
      {
        coordinate: {
          x: 0,
          y: 1
        },
        animation: 'terrain_02/isometric_pixel_0028.png',
        walkable: true
      }
    ],
    personas: [
      {
        id: 'db144740-c6e0-4462-91b4-a2977e73fad6',
        name: '???',
        skin: 'arcanine',
        level: 1,
        race: {
          id: 2,
          name: '???'
        },
        classes: [
          {
            def: {
              id: 1,
              name: '???'
            },
            level: 1
          }
        ],
        exp: 0,
        baseStats: {
          attack: 5,
          defence: 5,
          intelligence: 5,
          resistance: 5
        },
        hp: {
          max: 30,
          current: 30
        },
        mp: {
          max: 10,
          current: 10
        },
        statsGrowth: {
          hp: 5,
          mp: 5,
          attack: 5,
          defence: 5,
          intelligence: 5,
          resistance: 5
        },
        skills: []
      },
      {
        id: '552821e9-17c3-433a-b09c-a7966604b5c7',
        name: '???',
        skin: 'arcanine',
        level: 1,
        race: {
          id: 2,
          name: '???'
        },
        classes: [
          {
            def: {
              id: 1,
              name: '???'
            },
            level: 1
          }
        ],
        exp: 0,
        baseStats: {
          attack: 5,
          defence: 5,
          intelligence: 5,
          resistance: 5
        },
        hp: {
          max: 30,
          current: 30
        },
        mp: {
          max: 10,
          current: 10
        },
        statsGrowth: {
          hp: 5,
          mp: 5,
          attack: 5,
          defence: 5,
          intelligence: 5,
          resistance: 5
        },
        skills: []
      }
    ],
    placements: [
      {
        personaId: 'db144740-c6e0-4462-91b4-a2977e73fad6',
        coordinate: {
          x: 0,
          y: 1
        },
        groupId: '3565721a-c4bf-421a-8622-724c2f01529c'
      },
      {
        personaId: '552821e9-17c3-433a-b09c-a7966604b5c7',
        coordinate: {
          x: 2,
          y: 0
        },
        groupId: '3565721a-c4bf-421a-8622-724c2f01529c'
      }
    ],
    groups: [
      {
        id: 'bb18d0e7-662f-46b1-b045-e0af070006c4',
        type: 'PLAYER',
        ownerId: 2
      },
      {
        id: '3565721a-c4bf-421a-8622-724c2f01529c',
        type: 'NPC',
        ownerId: null
      }
    ]
  });
  expect(value.tiles.length).toBe(2);
  const tile1 = value.tiles[0];
  expect(tile1.coordinate.x).toBe(3);
  expect(tile1.coordinate.y).toBe(4);
  expect(tile1.animation).toBe('terrain_05/isometric_pixel_0043.png');
  expect(tile1.walkable).toBe(true);

  expect(value.personas.length).toBe(2);
  expect(value.personas[0].id).toBe('db144740-c6e0-4462-91b4-a2977e73fad6');
  expect(value.personas[1].id).toBe('552821e9-17c3-433a-b09c-a7966604b5c7');

  expect(value.placements.length).toBe(2);
  expect(value.placements[0].coordinate.x).toBe(0);
  expect(value.placements[0].coordinate.y).toBe(1);
  expect(value.placements[0].personaId).toBe('db144740-c6e0-4462-91b4-a2977e73fad6');
  expect(value.placements[0].groupId).toBe('3565721a-c4bf-421a-8622-724c2f01529c');

  expect(value.placements[1].coordinate.x).toBe(2);
  expect(value.placements[1].coordinate.y).toBe(0);
  expect(value.placements[1].personaId).toBe('552821e9-17c3-433a-b09c-a7966604b5c7');
  expect(value.placements[1].groupId).toBe('3565721a-c4bf-421a-8622-724c2f01529c');

  expect(value.groups.length).toBe(2);
  expect(value.groups[0].id).toBe('bb18d0e7-662f-46b1-b045-e0af070006c4');
  expect(value.groups[0].type).toBe('PLAYER');
  expect(value.groups[0].ownerId).toBe(2);

  expect(value.groups[1].id).toBe('3565721a-c4bf-421a-8622-724c2f01529c');
  expect(value.groups[1].type).toBe('NPC');
  expect(value.groups[1].ownerId).toBe(undefined);
});
