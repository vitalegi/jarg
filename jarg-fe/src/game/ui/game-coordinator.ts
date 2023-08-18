import { Application } from 'pixi.js';
import Observer, { EventType, Subscriber } from '../observers/observer';
import Logger from '../../logging/logger';
import { Bean } from '../core/bean';

export interface GameScene extends Bean {
  setApplication(app: Application): void;
  setObserver(observer: Observer): void;
}

export default class GameCoordinator implements Bean {
  log = Logger.getInstance('GameCoordinator');

  private _app?: Application;
  private observer?: Observer;
  private subscribers = new Array<Subscriber>();
  private _activeScene?: GameScene;

  public constructor(app: Application) {
    this._app = app;
  }

  public async init(): Promise<void> {}

  public async destroy() {
    this.getObserver().unsubscribeAll(this.subscribers);
  }

  public async startScene(scene: GameScene) {
    this.destroyActiveScene();
    scene.setApplication(this.getApp());
    scene.setObserver(this.getObserver());
    await scene.init();
    this._activeScene = scene;
  }

  private async destroyActiveScene() {
    if (this._activeScene) {
      this.log.info(`Destroy scene`);
      await this._activeScene.destroy();
    }
  }

  public setObserver(observer: Observer) {
    this.observer = observer;
  }

  private getObserver(): Observer {
    if (!this.observer) {
      throw Error(`observer is undefined`);
    }
    return this.observer;
  }

  private subscribe(name: EventType, callback: (payload: unknown) => void): void {
    const subscriber = this.getObserver().subscribe(name, callback);
    this.subscribers.push(subscriber);
  }

  private getApp(): Application {
    if (!this._app) {
      throw Error('app is null');
    }
    return this._app;
  }
}
