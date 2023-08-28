import { asString } from '../../../util/converter-utils';

export default class CollectionIndex {
  url = '';
  animations = new Array<string>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static parse(value: any): CollectionIndex {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new CollectionIndex();
    out.url = asString(value.url);
    if (value.animations) {
      out.animations = value.animations.map(asString);
    }
    return out;
  }
}
