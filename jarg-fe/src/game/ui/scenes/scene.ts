import { Application } from 'pixi.js';
import { Bean } from '../../core/bean';
import Observer from '../../observers/observer';

export interface GameScene extends Bean {
  setApplication(app: Application): void;
}
