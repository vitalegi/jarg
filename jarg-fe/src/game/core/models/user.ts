import { asBoolean, asNumber, asString } from '../../util/converter-utils';

export default class User {
  id = '';
  username = '';
  authenticated = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static parse(value: any): User {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new User();
    out.id = asString(value.id);
    out.username = asString(value.username);
    out.authenticated = asBoolean(value.authenticated);
    return out;
  }
}
