import { asNumber } from '../../util/converter-utils';

export class Coordinate {
  x = 0;
  y = 0;

  public constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  public static parse(value: unknown): Coordinate {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new Coordinate();
    if ('x' in value) {
      out.x = asNumber(value.x);
    }
    if ('y' in value) {
      out.y = asNumber(value.y);
    }
    return out;
  }

  public equals(other: Coordinate): boolean {
    return this.x === other.x && this.y === other.y;
  }

  public toString(): string {
    return `(${this.x},${this.y})`;
  }
}
