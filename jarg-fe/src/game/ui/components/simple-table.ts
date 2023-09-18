import { Container } from 'pixi.js';
import ArrayUtil from '../../util/array-util';

type Alignment = 'right' | 'left';

interface ColumnOption {
  horizontalAlign: Alignment;
  x?: number;
}

export default class SimpleTable {
  rows = new Array<Array<Container>>();
  horizontalPadding = 0;
  verticalPadding = 0;
  columnOptions = new Array<ColumnOption>();

  public addRow(...row: Array<Container>): void {
    this.rows.push(row);
  }

  public addOption(horizontalAlign: Alignment = 'left', x?: number) {
    this.columnOptions.push({ horizontalAlign: horizontalAlign, x: x });
  }

  public build(): Container {
    const container = new Container();
    this.alignVertically();
    this.alignHorizontally();
    this.rows.forEach((r) => r.forEach((c) => container.addChild(c)));
    return container;
  }

  protected alignVertically(): void {
    let height = 0;
    for (let r = 0; r < this.rows.length; r++) {
      const row = this.rows[r];
      for (let c = 0; c < row.length; c++) {
        row[c].y = height;
      }
      height = height + ArrayUtil.max(row.map((r) => r.height)) + this.verticalPadding;
    }
  }
  protected alignHorizontally(): void {
    const maxCols = ArrayUtil.max(this.rows.map((r) => r.length));
    let left = 0;
    for (let c = 0; c < maxCols; c++) {
      const overrideX = this.getColumnX(c);
      if (overrideX) {
        left = overrideX;
      }
      const maxColumnWidth = this.maxWidth(c);
      for (let r = 0; r < this.rows.length; r++) {
        const row = this.rows[r];
        if (this.hasColumn(row, c)) {
          if (this.isAlignRight(c)) {
            row[c].x = left + maxColumnWidth - row[c].width;
          } else {
            row[c].x = left;
          }
        }
      }
      left = left + maxColumnWidth + this.horizontalPadding;
    }
  }

  protected maxWidth(column: number): number {
    return ArrayUtil.max(this.rows.filter((r) => this.hasColumn(r, column)).map((r) => r[column].width));
  }

  protected getColumnX(column: number): number | undefined {
    const option = this.getOption(column);
    return option?.x;
  }

  protected isAlignRight(column: number): boolean {
    const option = this.getOption(column);
    return option?.horizontalAlign === 'right';
  }
  protected hasColumn(row: Container[], column: number): boolean {
    return row.length > column;
  }

  protected getOption(column: number): ColumnOption | undefined {
    if (this.columnOptions.length < column) {
      return undefined;
    }
    return this.columnOptions[column];
  }
}
