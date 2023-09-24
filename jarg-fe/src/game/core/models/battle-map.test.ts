import { expect, test } from 'vitest';
import User from './user';
import { BattleMap } from './battle-map';
import { Coordinate } from './coordinate';

test('given an object that is a valid battle map then should parse', () => {
  const value = BattleMap.parse({
    battleId: '1cde32e2-5fc9-4c03-9ca6-1a4493852eac',
    ownerId: 2,
    creationDate: '2023-09-24T20:40:25.794692',
    lastUpdate: '2023-09-24T20:40:25.794692',
    status: 'INIT',
    battle: {
      id: '2b9d117b-2bd5-4a18-8374-d2dfe324315c',
      tiles: [
        {
          coordinate: {
            x: 3,
            y: 4
          },
          animation: 'terrain_05/isometric_0043.png',
          walkable: true
        },
        {
          coordinate: {
            x: 0,
            y: 1
          },
          animation: 'terrain_02/isometric_0028.png',
          walkable: true
        }
      ],
      personae: [
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
      ],
      playerDisplacementRule: {
        max: 5,
        allowedCoordinates: [
          {
            x: 0,
            y: 0
          },
          {
            x: 0,
            y: 1
          },
          {
            x: 3,
            y: 2
          }
        ]
      }
    }
  });
  expect(value.battle.tiles.length).toBe(2);
  const tile1 = value.battle.tiles[0];
  expect(tile1.coordinate.x).toBe(3);
  expect(tile1.coordinate.y).toBe(4);
  expect(tile1.animation).toBe('terrain_05/isometric_0043.png');
  expect(tile1.walkable).toBe(true);

  expect(value.battle.personae.length).toBe(2);
  expect(value.battle.personae[0].id).toBe('db144740-c6e0-4462-91b4-a2977e73fad6');
  expect(value.battle.personae[1].id).toBe('552821e9-17c3-433a-b09c-a7966604b5c7');

  expect(value.battle.placements.length).toBe(2);
  expect(value.battle.placements[0].coordinate.x).toBe(0);
  expect(value.battle.placements[0].coordinate.y).toBe(1);
  expect(value.battle.placements[0].personaId).toBe('db144740-c6e0-4462-91b4-a2977e73fad6');
  expect(value.battle.placements[0].groupId).toBe('3565721a-c4bf-421a-8622-724c2f01529c');

  expect(value.battle.placements[1].coordinate.x).toBe(2);
  expect(value.battle.placements[1].coordinate.y).toBe(0);
  expect(value.battle.placements[1].personaId).toBe('552821e9-17c3-433a-b09c-a7966604b5c7');
  expect(value.battle.placements[1].groupId).toBe('3565721a-c4bf-421a-8622-724c2f01529c');

  expect(value.battle.groups.length).toBe(2);
  expect(value.battle.groups[0].id).toBe('bb18d0e7-662f-46b1-b045-e0af070006c4');
  expect(value.battle.groups[0].type).toBe('PLAYER');
  expect(value.battle.groups[0].ownerId).toBe(2);

  expect(value.battle.groups[1].id).toBe('3565721a-c4bf-421a-8622-724c2f01529c');
  expect(value.battle.groups[1].type).toBe('NPC');
  expect(value.battle.groups[1].ownerId).toBe(undefined);

  expect(value.battle.playerDisplacementRule.max).toBe(5);
  expect(value.battle.playerDisplacementRule.allowedCoordinates.length).toBe(3);
  expect(value.battle.playerDisplacementRule.allowedCoordinates[0].x).toBe(0);
  expect(value.battle.playerDisplacementRule.allowedCoordinates[0].y).toBe(0);
  expect(value.battle.playerDisplacementRule.allowedCoordinates[1].x).toBe(0);
  expect(value.battle.playerDisplacementRule.allowedCoordinates[1].y).toBe(1);
  expect(value.battle.playerDisplacementRule.allowedCoordinates[2].x).toBe(3);
  expect(value.battle.playerDisplacementRule.allowedCoordinates[2].y).toBe(2);
});
