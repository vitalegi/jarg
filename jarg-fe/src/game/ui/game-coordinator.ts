import { Application } from 'pixi.js';
import Observer, { ObserverSubscribers } from '../observers/observer';
import Logger from '../../logging/logger';
import { Bean } from '../core/bean';
import { GameScene } from './scenes/scene';
import { StartScene } from '../core/models/start-scene';
import GameAccessScene from './scenes/game-access-scene';
import GameSceneConstants from '../core/constants/game-scene-constants';
import BouncingScene from './scenes/bouncing-scene';

export default class GameCoordinator implements Bean {
  log = Logger.getInstance('GameCoordinator');

  private _app?: Application;
  private observer: ObserverSubscribers;
  private _activeScene?: GameScene;

  public constructor(app: Application, observer: Observer) {
    this._app = app;
    this.observer = new ObserverSubscribers(observer);
  }

  name(): string {
    return 'GameCoordinator';
  }

  public async init(): Promise<void> {
    this.observer.subscribe('scene/start', (payload) => this.eventStartScene(StartScene.parse(payload)));
  }

  public async destroy() {
    this.observer.unsubscribeAll();
  }

  private async eventStartScene(sceneSchema: StartScene) {
    this.log.info(`Start scene ${sceneSchema.name}`);
    const newScene = this.createScene(sceneSchema);
    newScene.setApplication(this.getApp());
    await newScene.init();
    const oldScene = this._activeScene;
    if (oldScene) {
      await this.destroyScene(oldScene);
    }
    this._activeScene = newScene;
    await newScene.start();
  }

  private createScene(sceneSchema: StartScene): GameScene {
    if (sceneSchema.name === GameSceneConstants.GAME_ACCESS) {
      return new GameAccessScene(this.observer.observer);
    }
    if (sceneSchema.name === GameSceneConstants.BOUNCING) {
      return new BouncingScene(this.observer.observer);
    }
    throw Error(`Scene ${sceneSchema.name} is unknown`);
  }

  private async destroyScene(scene: GameScene) {
    this.log.info(`Destroy scene ${scene.name()}`);
    await scene.destroy();
  }

  private getApp(): Application {
    if (!this._app) {
      throw Error('app is null');
    }
    return this._app;
  }
}
