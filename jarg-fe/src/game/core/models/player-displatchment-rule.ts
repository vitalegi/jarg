import { asNumber } from '../../util/converter-utils';
import { Coordinate } from './coordinate';

export default class PlayerDisplacementRule {
  max = 0;
  allowedCoordinates = new Array<Coordinate>();

  public static parse(value: unknown): PlayerDisplacementRule {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new PlayerDisplacementRule();
    if ('max' in value) {
      out.max = asNumber(value.max);
    }
    if ('allowedCoordinates' in value && Array.isArray(value.allowedCoordinates)) {
      out.allowedCoordinates = value.allowedCoordinates.map(Coordinate.parse);
    }
    return out;
  }
}
