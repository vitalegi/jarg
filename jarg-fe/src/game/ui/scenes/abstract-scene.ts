import { Container } from 'pixi.js';
import { Bean } from '../../core/bean';
import { ObserverSubscribers } from '../../observers/observer';
import ApplicationContext from '../application-context';
import { ITicker } from '../components/ticker';
import Logger from '../../../logging/logger';

export abstract class AbstractGameScene implements Bean {
  private _log = Logger.getInstance('AbstractGameScene');

  public observer: ObserverSubscribers;
  public ctx: ApplicationContext;
  private container?: Container;
  private tickers = new Array<ITicker>();

  public constructor(ctx: ApplicationContext) {
    this.ctx = ctx;
    this.observer = new ObserverSubscribers(ctx.getObserver());
  }

  abstract name(): string;

  async init() {
    this.container = new Container();
    this.ctx.getApp().stage.addChild(this.container);
  }

  async destroy() {
    await this.observer.unsubscribeAll();
    this.tickers.forEach((t) => this.ctx.removeTicker(t));
    this.getContainer().removeAllListeners();
    this.getContainer().removeChildren();
  }

  abstract start(): Promise<void>;

  protected getContainer(): Container {
    if (!this.container) {
      throw Error('container is null');
    }
    return this.container;
  }

  protected addTicker(tick: (time: number) => void): void {
    const ticker = this.ctx.addTicker(tick);
    this.tickers.push(ticker);
    this._log.info(`Add ticker for ${this.name()}: ${ticker.id()}. # tickers on this scene: ${this.tickers.length}`);
  }
}
