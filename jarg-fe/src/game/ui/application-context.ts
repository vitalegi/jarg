import { Application, ICanvas } from 'pixi.js';
import Observer from '../observers/observer';
import AssetLoader from './assets-loader';

export default class ApplicationContext {
  private observer: Observer;
  private app?: Application<ICanvas>;
  private assetLoader = new AssetLoader();

  public constructor(observer: Observer) {
    this.observer = observer;
  }

  setApp(app: Application<ICanvas>): void {
    this.app = app;
  }

  getApp(): Application<ICanvas> {
    if (!this.app) {
      throw Error('App is null');
    }
    return this.app;
  }

  getAssetLoader(): AssetLoader {
    return this.assetLoader;
  }

  getObserver(): Observer {
    return this.observer;
  }
}
