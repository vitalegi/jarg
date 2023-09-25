import { BattleAction, parseBattleActions } from '../game/core/models/battle-actions';
import { BattleMap } from '../game/core/models/battle-map';
import { Coordinate } from '../game/core/models/coordinate';
import { NewPersona } from '../game/core/models/new-persona';
import { Persona } from '../game/core/models/persona';
import User from '../game/core/models/user';
import Logger from '../logging/logger';
import Http from './http';

class PersonaApi {
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }

  public async createPersona(request: NewPersona): Promise<Persona> {
    const response = await this.http.putJson('/persona', request);
    return Persona.parse(response);
  }

  public async getMyPersonae(): Promise<Array<Persona>> {
    const response = await this.http.getJson('/persona');
    if (Array.isArray(response)) {
      return response.map(Persona.parse);
    }
    throw Error(`Received data is not an array`);
  }
}

class BattleApi {
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }

  public async createRandom(): Promise<BattleMap> {
    const response = await this.http.putJson('/battle/random', {});
    return BattleMap.parse(response);
  }

  public async addPlayerPersona(battleId: string, personaId: string, coordinate: Coordinate): Promise<BattleAction[]> {
    const response = await this.http.postJson(`/battle/${battleId}/persona`, {
      personaId: personaId,
      coordinate: coordinate
    });
    return parseBattleActions(response);
  }
  public async deletePlayerPersona(battleId: string, personaId: string): Promise<BattleAction[]> {
    const response = await this.http.deleteJson(`/battle/${battleId}/persona`, {
      personaId: personaId
    });
    return parseBattleActions(response);
  }

  public async getAvailableDisplacements(battleId: string): Promise<Coordinate[]> {
    const response = await this.http.getJson(`/battle/${battleId}/displacement/available`);
    if (!response) {
      throw new Error(`invalid element`);
    }
    if (!Array.isArray(response)) {
      throw new Error(`element is not an array`);
    }
    return response.map((e) => Coordinate.parse(e));
  }
}

export class JargBe {
  log = Logger.getInstance('JargBe');
  http: Http;

  constructor() {
    const baseUrl = import.meta.env.VITE_JARG_API;
    this.http = new Http(baseUrl);
  }

  persona(): PersonaApi {
    return new PersonaApi(this.http);
  }

  battle(): BattleApi {
    return new BattleApi(this.http);
  }

  async tokenAccess(username: string, password: string): Promise<void> {
    const basic = 'Basic ' + btoa(`${username}:${password}`);
    await this.http.post(`/token/access`, {}, { 'Content-Type': 'application/json', Authorization: basic });
  }

  async tokenRefresh(): Promise<void> {
    await this.http.post(`/token/refresh`, {});
  }

  async authIdentity(): Promise<User> {
    const response = await this.http.getJson('/auth/identity');
    return User.parse(response);
  }

  async authSignup(username: string, password: string): Promise<void> {
    await this.http.post('/auth/signup', { username: username, password: password });
  }

  async logout(): Promise<void> {
    await this.http.getJson('/auth/logout');
  }
}

const jargBe = new JargBe();
export default jargBe;
