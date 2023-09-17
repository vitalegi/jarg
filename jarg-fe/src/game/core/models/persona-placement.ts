import { asBoolean, asString } from '../../util/converter-utils';
import { Coordinate } from './coordinate';

export class PersonaPlacement {
  coordinate = new Coordinate();
  personaId = '';
  groupId = '';

  public static parse(value: unknown): PersonaPlacement {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new PersonaPlacement();
    if ('coordinate' in value) {
      out.coordinate = Coordinate.parse(value.coordinate);
    } else {
      throw Error(`Missing coordinates`);
    }
    if ('personaId' in value) {
      out.personaId = asString(value.personaId);
    }
    if ('groupId' in value) {
      out.groupId = asString(value.groupId);
    }
    return out;
  }
}
