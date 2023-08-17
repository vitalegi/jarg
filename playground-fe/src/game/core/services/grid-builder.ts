import { GridColors } from '../constants/grid-constants';
import Grid, { GridEntry } from '../models/grid';

const randomColor = function (): string {
  const values = GridColors.values();
  const index = Math.floor(Math.random() * values.length);
  return values[index];
};

const initEmptyGrid = function (horizontalSize: number, verticalSize: number, defaultColor: string): Grid {
  const grid = new Grid();
  grid.entries = new Array<GridEntry>();
  grid.horizontal = horizontalSize;
  grid.vertical = verticalSize;
  let COUNTER = 0;
  for (let verticalIndex = 0; verticalIndex < verticalSize; verticalIndex++) {
    for (let horizontalIndex = 0; horizontalIndex < horizontalSize; horizontalIndex++) {
      const entry = new GridEntry(defaultColor, `ge_${++COUNTER}`);
      entry.horizontalIndex = horizontalIndex;
      entry.verticalIndex = verticalIndex;
      grid.entries.push(entry);
    }
  }
  return grid;
};

export async function createRandom(horizontalSize: number, verticalSize: number): Promise<Grid> {
  const grid = initEmptyGrid(horizontalSize, verticalSize, GridColors.WHITE);
  grid.entries.forEach((e: GridEntry) => (e.color = randomColor()));
  return grid;
}
