import { Coordinate } from '../core/models/coordinate';
import { Persona } from '../core/models/persona';
import { Tile } from '../core/models/tile';

export default class PixiNames {
  public static tile(obj: Tile | Coordinate): string {
    if (obj instanceof Tile) {
      return `tile_${obj.coordinate.x}_${obj.coordinate.y}`;
    }
    if (obj instanceof Coordinate) {
      return `tile_${obj.x}_${obj.y}`;
    }
    throw Error('Invalid object type');
  }
  public static persona(obj: Persona | string): string {
    if (obj instanceof String) {
      return `persona_${obj}`;
    }
    if (obj instanceof Persona) {
      return `persona_${obj.id}`;
    }
    throw Error('Invalid object type');
  }
}
