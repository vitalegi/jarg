import { asBoolean, asString } from '../../util/converter-utils';
import { Coordinate } from './coordinate';
import { Persona } from './persona';
import { PersonaGroup } from './persona-group';
import { PersonaPlacement } from './persona-placement';
import { Tile } from './tile';

export class BattleMap {
  id = '';
  tiles = new Array<Tile>();
  personas = new Array<Persona>();
  placements = new Array<PersonaPlacement>();
  groups = new Array<PersonaGroup>();

  public static parse(value: unknown): BattleMap {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new BattleMap();
    if ('tiles' in value && Array.isArray(value.tiles)) {
      out.tiles = value.tiles.map(Tile.parse);
    }
    if ('personas' in value && Array.isArray(value.personas)) {
      out.personas = value.personas.map(Persona.parse);
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
}
