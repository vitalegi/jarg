import { Container } from 'pixi.js';
import { Bean } from '../../core/bean';
import { ObserverSubscribers } from '../../observers/observer';
import ApplicationContext from '../application-context';
import { ITicker } from '../components/ticker';
import Logger from '../../../logging/logger';
import RandomBackground from '../scene-elements/random-background';
import ScreenInfo from '../scene-elements/screen-info';
import Menu, { Option } from '../scene-elements/menu';

export abstract class AbstractGameScene implements Bean {
  private _log = Logger.getInstance('AbstractGameScene');

  protected observer: ObserverSubscribers;
  protected ctx: ApplicationContext;
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

  protected addTicker(tick: (time: number) => void, description?: string): void {
    const ticker = this.ctx.addTicker(tick);
    this.tickers.push(ticker);
    const desc = description ? '(' + description + ')' : '';
    this._log.info(`Add ticker for ${this.name()}: ${ticker.id()} ${desc}. # tickers on this scene: ${this.tickers.length}`);
  }
  protected withMenu(...entries: Array<Option>): Menu {
    const menu = new Menu(this.getContainer(), this.ctx, ...entries);
    menu.start();
    this.addTicker((time: number) => {
      menu.tick(time);
    }, 'Menu');
    return menu;
  }
  protected withRandomBackground(): void {
    const bg = new RandomBackground(this.getContainer(), this.ctx);
    bg.start();
    this.addTicker((time: number) => {
      bg.tick(time);
    }, 'randomBackground');
  }
  protected withScreenInfo(): void {
    const info = new ScreenInfo(this.getContainer(), this.ctx);
    info.start();
    this.addTicker((time: number) => {
      info.tick(time);
    }, 'ScreenInfo');
  }
}
