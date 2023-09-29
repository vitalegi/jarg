import { beforeEach, describe, expect, test, vi } from 'vitest';

import jargBe from './jarg-be';
import { NewPersona } from '../game/core/models/new-persona';
import { Coordinate } from '../game/core/models/coordinate';
import { AddPersona, BattleActionUtil, DeletePersona } from '../game/core/models/battle-actions';

beforeEach(() => {
  vi.resetAllMocks();
});

jargBe.http.post = vi.fn();
jargBe.http.get = vi.fn();
jargBe.http.getJson = vi.fn();

describe('tokenAccess', async () => {
  test('exteral call with correct params', async () => {
    const spy = vi.spyOn(jargBe.http, 'post');
    await jargBe.tokenAccess('username', 'password');
    expect(spy).toHaveBeenCalledWith(
      '/token/access',
      {},
      { 'Content-Type': 'application/json', Authorization: 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=' }
    );
  });
});

describe('tokenRefresh', async () => {
  test('exteral call with correct params', async () => {
    const spy = vi.spyOn(jargBe.http, 'post');
    await jargBe.tokenRefresh();
    expect(spy).toHaveBeenCalledWith('/token/refresh', {});
  });
});

describe('authIdentity', async () => {
  test('exteral call with correct params', async () => {
    const spy = vi.spyOn(jargBe.http, 'getJson');
    spy.mockResolvedValue({
      subject: 'user',
      expiresAt: '2023-09-03T16:17:54Z'
    });
    const identity = await jargBe.authIdentity();
    expect(spy).toHaveBeenCalledWith('/auth/identity');
    expect(identity.username).toBe('user');
  });
});

describe('authIdentity', async () => {
  test('exteral call with correct params', async () => {
    const spy = vi.spyOn(jargBe.http, 'post');
    await jargBe.authSignup('user', 'password');
    expect(spy).toHaveBeenCalledWith('/auth/signup', { username: 'user', password: 'password' });
  });
});

describe('logout', async () => {
  test('exteral call with correct params', async () => {
    const spy = vi.spyOn(jargBe.http, 'getJson');
    spy.mockResolvedValue({});
    await jargBe.logout();
    expect(spy).toHaveBeenCalledWith('/auth/logout');
  });
});

describe('battle', async () => {
  test('create random, external call with correct params', async () => {
    const spy = vi.spyOn(jargBe.http, 'putJson');
    spy.mockResolvedValue({});
    await jargBe.battle().createRandom();
    expect(spy).toHaveBeenCalledWith('/battle/random', {});
  });

  test('addPlayerPersona, external call with correct params', async () => {
    const spy = vi.spyOn(jargBe.http, 'postJson');
    spy.mockResolvedValue({
      type: 'add-persona',
      personaPlacement: {
        personaId: '10',
        coordinate: {
          x: 1,
          y: 2
        },
        groupId: '20'
      }
    });
    const actual = await jargBe.battle().addPlayerPersona('1', '2', new Coordinate(5, 6));
    expect(spy).toHaveBeenCalledWith('/battle/1/persona', {
      personaId: '2',
      coordinate: {
        x: 5,
        y: 6
      }
    });
    expect(actual.personaPlacement.personaId).toBe('10');
    expect(actual.personaPlacement.coordinate.x).toBe(1);
    expect(actual.personaPlacement.coordinate.y).toBe(2);
    expect(actual.personaPlacement.groupId).toBe('20');
  });
  test('deletePlayerPersona, external call with correct params', async () => {
    const spy = vi.spyOn(jargBe.http, 'deleteJson');
    spy.mockResolvedValue([
      {
        type: 'delete-persona',
        personaId: '20'
      }
    ]);
    const out = await jargBe.battle().deletePlayerPersona('1', '2');
    expect(spy).toHaveBeenCalledWith('/battle/1/persona', {
      personaId: '2'
    });
    expect(out.length).toBe(1);
    expect(out[0] instanceof DeletePersona).toBe(true);
    const actual = BattleActionUtil.toDeletePersona(out[0]);
    expect(actual.personaId).toBe('20');
  });

  test('getAvailableDisplacements, external call with correct params', async () => {
    const spy = vi.spyOn(jargBe.http, 'getJson');
    spy.mockResolvedValue([
      { x: 1, y: 2 },
      { x: 3, y: 4 }
    ]);
    const out = await jargBe.battle().getAvailableDisplacements('1');
    expect(spy).toHaveBeenCalledWith('/battle/1/displacement/available');
    expect(out.length).toBe(2);
    expect(out[0].x).toBe(1);
    expect(out[0].y).toBe(2);
    expect(out[1].x).toBe(3);
    expect(out[1].y).toBe(4);
  });
  test('completeInitPhase, external call with correct params', async () => {
    const spy = vi.spyOn(jargBe.http, 'put');
    spy.mockResolvedValue('');
    await jargBe.battle().completeInitPhase('1');
    expect(spy).toHaveBeenCalledWith('/battle/1/phase/init/complete', {});
  });
});

describe('persona', async () => {
  test('create persona, external call with correct params', async () => {
    const spy = vi.spyOn(jargBe.http, 'putJson');
    spy.mockResolvedValue({});
    const r = new NewPersona();
    r.classId = 1;
    r.name = 'aa';
    r.raceId = 5;
    r.skin = 'bb';
    await jargBe.persona().createPersona(r);
    expect(spy).toHaveBeenCalledWith('/persona', {
      classId: 1,
      name: 'aa',
      raceId: 5,
      skin: 'bb'
    });
  });

  test('getMyPersonae, external call with correct params', async () => {
    const spy = vi.spyOn(jargBe.http, 'getJson');
    spy.mockResolvedValue([
      {
        id: '8a2e963b-4900-4a66-a43a-0cb6b4d4c88e',
        name: 'Aaaa',
        skin: 'test',
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
    ]);
    const out = await jargBe.persona().getMyPersonae();
    expect(spy).toHaveBeenCalledWith('/persona');
    expect(out.length).toBe(1);
    expect(out[0].id).toBe('8a2e963b-4900-4a66-a43a-0cb6b4d4c88e');
  });
});
