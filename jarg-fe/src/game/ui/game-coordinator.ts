import { ObserverSubscribers } from '../observers/observer';
import Logger from '../../logging/logger';
import { Bean } from '../core/bean';
import { AbstractGameScene } from './scenes/abstract-scene';
import ApplicationContext from './application-context';
import SceneManager from './scene-coordinators/scene-manager';

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
    this.observer.subscribe('scene/start', (payload) => this.eventStartScene(payload));
  }

  public async destroy() {
    this.observer.unsubscribeAll();
  }

  private async eventStartScene(sceneSchema: unknown) {
    const newScene = SceneManager.createScene(this.ctx, sceneSchema);
    this.log.info(`Start scene ${newScene.name}`);
    await newScene.init();
    const oldScene = this._activeScene;
    if (oldScene) {
      await this.destroyScene(oldScene);
    }
    this._activeScene = newScene;
    await newScene.start();
  }

  private async destroyScene(scene: AbstractGameScene) {
    this.log.info(`Destroy scene ${scene.name()}`);
    await scene.destroy();
  }
}
