import Observer, { ObserverSubscribers } from '../../observers/observer';
import { Bean } from '../bean';
import Grid, { GridEntry } from '../models/grid';
import { SwapModel } from '../models/observer-models';

export default class GameService implements Bean {
  private grid?: Grid;
  private observer: ObserverSubscribers;

  public constructor(observer: Observer) {
    this.observer = new ObserverSubscribers(observer);
  }

  public async destroy() {
    await this.observer.unsubscribeAll();
  }

  public async init(): Promise<void> {
    this.observer.subscribe('new-game-request', (payload) => this.eventNewGame(Grid.parse(payload)));
    this.observer.subscribe('swap-request', (payload) => this.eventSwap(SwapModel.parse(payload)));
  }
  public setGrid(grid: Grid) {
    this.grid = grid;
  }

  public getVerticalSize(): number {
    return this.getGrid().vertical;
  }

  public getHorizontalSize(): number {
    return this.getGrid().horizontal;
  }

  public setValue(horizontalIndex: number, verticalIndex: number, color: string): void {
    this.validateCoordinates(horizontalIndex, verticalIndex);
    this.getEntry(horizontalIndex, verticalIndex).color = color;
  }
  public getValue(horizontalIndex: number, verticalIndex: number): string {
    this.validateCoordinates(horizontalIndex, verticalIndex);
    const entry = this.getEntry(horizontalIndex, verticalIndex);
    return entry.color;
  }

  public getEntry(horizontalIndex: number, verticalIndex: number): GridEntry {
    const entries = this.getGrid()
      .entries.filter((e) => e.horizontalIndex === horizontalIndex)
      .filter((e) => e.verticalIndex === verticalIndex);
    if (entries.length === 0) {
      throw new Error(`Entry (${horizontalIndex}-${verticalIndex}) doesn't exist`);
    }
    return entries[0];
  }

  public getEntryById(id: string): GridEntry {
    const entries = this.getGrid().entries.filter((e) => e.id === id);
    if (entries.length === 0) {
      throw new Error(`Entry (${id}) doesn't exist`);
    }
    return entries[0];
  }

  public validateCoordinates(horizontalIndex: number, verticalIndex: number): void {
    if (horizontalIndex < 0 || horizontalIndex >= this.getHorizontalSize()) {
      throw Error(`horizontalIndex out of bound`);
    }
    if (verticalIndex < 0 || verticalIndex >= this.getVerticalSize()) {
      throw Error(`verticalIndex out of bound`);
    }
  }

  public getGrid(): Grid {
    if (!this.grid) {
      throw Error(`grid is undefined`);
    }
    return this.grid;
  }
  eventNewGame(grid: Grid): void {
    this.setGrid(grid);
    this.observer.publish('new-game-ready', grid);
  }
  eventSwap(swap: SwapModel): void {
    const first = this.getEntryById(swap.first);
    const second = this.getEntryById(swap.second);
    // TODO check if swap is valid
    const tmpX = first.horizontalIndex;
    const tmpY = first.verticalIndex;
    first.horizontalIndex = second.horizontalIndex;
    first.verticalIndex = second.verticalIndex;
    second.horizontalIndex = tmpX;
    second.verticalIndex = tmpY;
    this.observer.publish('swap-confirmed', swap);
  }
}
