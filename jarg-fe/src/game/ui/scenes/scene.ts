import { Bean } from '../../core/bean';

export interface GameScene extends Bean {
  start(): Promise<void>;
}
