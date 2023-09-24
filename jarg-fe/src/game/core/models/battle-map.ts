import { asBoolean, asNumber, asString } from '../../util/converter-utils';
import { Coordinate } from './coordinate';
import { Persona } from './persona';
import { PersonaGroup } from './persona-group';
import { PersonaPlacement } from './persona-placement';
import { Tile } from './tile';

export class BattleMapPayload {
  tiles = new Array<Tile>();
  personae = new Array<Persona>();
  placements = new Array<PersonaPlacement>();
  groups = new Array<PersonaGroup>();

  public static parse(value: unknown): BattleMapPayload {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new BattleMapPayload();
    if ('tiles' in value && Array.isArray(value.tiles)) {
      out.tiles = value.tiles.map(Tile.parse);
    }
    if ('personae' in value && Array.isArray(value.personae)) {
      out.personae = value.personae.map(Persona.parse);
    }
    if ('placements' in value && Array.isArray(value.placements)) {
      out.placements = value.placements.map(PersonaPlacement.parse);
    }
    if ('groups' in value && Array.isArray(value.groups)) {
      out.groups = value.groups.map(PersonaGroup.parse);
    }
    return out;
  }

  public findTile(coordinate: Coordinate): Tile | undefined {
    const tiles = this.tiles.filter((t) => t.coordinate.equals(coordinate));
    if (tiles.length === 0) {
      return undefined;
    }
    return tiles[0];
  }

  public getPersona(personaId: string): Persona {
    const personae = this.personae.filter((e) => e.id === personaId);
    if (personae.length === 0) {
      throw Error(`Persona ${personaId} not found`);
    }
    return personae[0];
  }

  public getPersonaPlacement(personaId: string): PersonaPlacement {
    const objs = this.placements.filter((p) => p.personaId === personaId);
    if (objs.length === 0) {
      throw Error(`PersonaPlacement ${personaId} not available`);
    }
    return objs[0];
  }

  public findPersonaPlacementByCoordinate(coordinate: Coordinate): PersonaPlacement | undefined {
    const placements = this.placements.filter((p) => p.coordinate.equals(coordinate));
    if (placements.length === 0) {
      return undefined;
    }
    return placements[0];
  }
}

export class BattleMap {
  battleId = '';
  ownerId = 0;
  creationDate = '';
  lastUpdate = '';
  status = '';
  battle = new BattleMapPayload();

  public static parse(value: unknown): BattleMap {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new BattleMap();
    if ('battleId' in value) {
      out.battleId = asString(value.battleId);
    }
    if ('ownerId' in value) {
      out.ownerId = asNumber(value.ownerId);
    }
    if ('creationDate' in value) {
      out.creationDate = asString(value.creationDate);
    }
    if ('lastUpdate' in value) {
      out.lastUpdate = asString(value.lastUpdate);
    }
    if ('status' in value) {
      out.status = asString(value.status);
    }
    if ('battleId' in value) {
      out.battleId = asString(value.battleId);
    }
    if ('battle' in value) {
      out.battle = BattleMapPayload.parse(value.battle);
    }
    return out;
  }
}
