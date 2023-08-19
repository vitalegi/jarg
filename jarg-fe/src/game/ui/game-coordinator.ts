import { Application } from 'pixi.js';
import Observer, { ObserverSubscribers } from '../observers/observer';
import Logger from '../../logging/logger';
import { Bean } from '../core/bean';
import { GameScene } from './scenes/scene';

export default class GameCoordinator implements Bean {
  log = Logger.getInstance('GameCoordinator');

  private _app?: Application;
  private observer: ObserverSubscribers;
  private _activeScene?: GameScene;

  public constructor(app: Application, observer: Observer) {
    this._app = app;
    this.observer = new ObserverSubscribers(observer);
  }

  public async init(): Promise<void> {}

  public async destroy() {
    this.observer.unsubscribeAll();
  }

  public async startScene(scene: GameScene) {
    this.destroyActiveScene();
    scene.setApplication(this.getApp());
    await scene.init();
    this._activeScene = scene;
  }

  private async destroyActiveScene() {
    if (this._activeScene) {
      this.log.info(`Destroy scene`);
      await this._activeScene.destroy();
    }
  }

  private getApp(): Application {
    if (!this._app) {
      throw Error('app is null');
    }
    return this._app;
  }
}
