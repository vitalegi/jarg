import { asNumber, asString } from '../../util/converter-utils';

export class PersonaGroup {
  id = '';
  type = '';
  ownerId?: number;

  public static parse(value: unknown): PersonaGroup {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new PersonaGroup();
    if ('id' in value) {
      out.id = asString(value.id);
    }
    if ('type' in value) {
      out.type = asString(value.type);
    }
    if ('ownerId' in value && value.ownerId !== undefined && value.ownerId !== null) {
      out.ownerId = asNumber(value.ownerId);
    }
    return out;
  }
}
