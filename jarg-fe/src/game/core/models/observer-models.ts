import { asString } from '../../util/converter-utils';

export class SwapModel {
  first = '';
  second = '';

  public constructor(first: string = '', second: string = '') {
    this.first = first;
    this.second = second;
  }

  public static parse(value: unknown): SwapModel {
    const out = new SwapModel();
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    if ('first' in value) {
      out.first = asString(value.first);
    }
    if ('second' in value) {
      out.second = asString(value.second);
    }
    return out;
  }
}
