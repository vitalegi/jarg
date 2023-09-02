import { Application, ICanvas } from 'pixi.js';
import Observer from '../observers/observer';
import AssetLoader from './assets-loader';
import { ITicker, SequenceTicker } from './components/ticker';
import Logger from '../../logging/logger';
import UserService from '../core/services/user-service';

export default class ApplicationContext {
  log = Logger.getInstance('ApplicationContext');

  private observer: Observer;
  private app?: Application<ICanvas>;
  private assetLoader = new AssetLoader();
  private tickers = new Array<ITicker>();
  private userService?: UserService;

  public constructor(observer: Observer) {
    this.observer = observer;
  }

  setApp(app: Application<ICanvas>): void {
    this.app = app;
    this.app.ticker.add((time: number) => {
      this.tickers.forEach((t) => t.tick(time));
    });
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

  addTicker(tick: (time: number) => void): ITicker {
    const ticker = new SequenceTicker(tick);
    this.tickers.push(ticker);
    this.log.info(`Add ticker ${ticker.id()}`);
    return ticker;
  }

  removeTicker(ticker?: ITicker): void {
    if (!ticker) {
      this.log.info('ticker is null');
      return;
    }
    this.log.info(`Remove ticker ${ticker.id()}`);
    this.tickers = this.tickers.filter((t) => t.id() !== ticker.id());
  }

  public setUserService(service: UserService): void {
    this.userService = service;
  }

  public getUserService(): UserService {
    if (!this.userService) {
      throw Error(`UserService is null`);
    }
    return this.userService;
  }
}
