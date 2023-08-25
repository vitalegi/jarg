import { uniqueId } from '../../util/id-utils';

export interface ITicker {
  id(): number;
  tick(time: number): void;
}

export class SequenceTicker implements ITicker {
  private _id = uniqueId();
  private _tick: (time: number) => void;

  public constructor(tick: (time: number) => void) {
    this._tick = tick;
  }

  id(): number {
    return this._id;
  }
  tick(time: number): void {
    this._tick(time);
  }
}
