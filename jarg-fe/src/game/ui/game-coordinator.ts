import { Application } from 'pixi.js';
import Observer, { ObserverSubscribers } from '../observers/observer';
import Logger from '../../logging/logger';
import { Bean } from '../core/bean';
import { AbstractGameScene } from './scenes/abstract-scene';
import { StartScene } from '../core/models/start-scene';
import GameAccessScene from './scenes/game-access-scene';
import GameSceneConstants from '../core/constants/game-scene-constants';
import BouncingScene from './scenes/bouncing-scene';
import ApplicationContext from './application-context';
import LoginScene from './scenes/login-scene';
import PersonaBuilderScene from './scenes/persona-builder-scene';

export default class GameCoordinator implements Bean {
  log = Logger.getInstance('GameCoordinator');

  private ctx: ApplicationContext;
  private observer: ObserverSubscribers;
  private _activeScene?: AbstractGameScene;

  public constructor(ctx: ApplicationContext) {
    this.ctx = ctx;
    this.observer = new ObserverSubscribers(ctx.getObserver());
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
    await newScene.init();
    const oldScene = this._activeScene;
    if (oldScene) {
      await this.destroyScene(oldScene);
    }
    this._activeScene = newScene;
    await newScene.start();
  }

  private createScene(sceneSchema: StartScene): AbstractGameScene {
    if (sceneSchema.name === GameSceneConstants.GAME_ACCESS) {
      return new GameAccessScene(this.ctx);
    }
    if (sceneSchema.name === GameSceneConstants.BOUNCING) {
      return new BouncingScene(this.ctx);
    }
    if (sceneSchema.name === GameSceneConstants.LOGIN) {
      return new LoginScene(this.ctx);
    }
    if (sceneSchema.name === GameSceneConstants.PERSONA_BUILDER) {
      return new PersonaBuilderScene(this.ctx);
    }
    throw Error(`Scene ${sceneSchema.name} is unknown`);
  }

  private async destroyScene(scene: AbstractGameScene) {
    this.log.info(`Destroy scene ${scene.name()}`);
    await scene.destroy();
  }
}
