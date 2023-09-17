import { asBoolean, asString } from '../../util/converter-utils';
import { Coordinate } from './coordinate';

export class Tile {
  coordinate = new Coordinate();
  animation = '';
  walkable = false;

  public static parse(value: unknown): Tile {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new Tile();
    if ('coordinate' in value) {
      out.coordinate = Coordinate.parse(value.coordinate);
    } else {
      throw Error(`Missing coordinates`);
    }
    if ('animation' in value) {
      out.animation = asString(value.animation);
    }
    if ('walkable' in value) {
      out.walkable = asBoolean(value.walkable);
    }
    return out;
  }
}
