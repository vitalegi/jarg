import { asNumber, asString } from '../../util/converter-utils';

export class GridEntry {
  color;
  id;
  horizontalIndex = 0;
  verticalIndex = 0;

  public constructor(color: string = '', id: string = '') {
    this.color = color;
    this.id = id;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static parse(value: any): GridEntry {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new GridEntry();
    out.id = asString(value.id);
    out.color = asString(value.color);
    out.horizontalIndex = asNumber(value.horizontalIndex);
    out.verticalIndex = asNumber(value.verticalIndex);
    return out;
  }
}

export default class Grid {
  entries = new Array<GridEntry>();
  horizontal = 0;
  vertical = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static parse(value: any): Grid {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (value instanceof Grid) {
      return value;
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new Grid();
    out.horizontal = asNumber(value.horizontal);
    out.vertical = asNumber(value.vertical);
    if (value.entries) {
      out.entries = value.entries.map(GridEntry.parse);
    }
    return out;
  }
}
