import { Application } from 'pixi.js';
import { Bean } from '../../core/bean';

export interface GameScene extends Bean {
  setApplication(app: Application): void;
  start(): Promise<void>;
}
