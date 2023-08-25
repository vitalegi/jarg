import { Application, Container, Graphics, ICanvas, IRenderer, Text } from 'pixi.js';
import AssetLoader from '../assets-loader';
import Observer, { ObserverSubscribers } from '../../observers/observer';
import Logger from '../../../logging/logger';
import { GameScene } from './scene';
import Fonts from '../styles/fonts';
import ScreenData from '../devices/screen';
import ScreenInfo from '../scene-elements/screen-info';
import { Button } from '@pixi/ui';
import { scene } from '../../core/models/start-scene';
import GameSceneConstants from '../../core/constants/game-scene-constants';
import ApplicationContext from '../application-context';
import { ITicker } from '../components/ticker';

export default class GameAccessScene implements GameScene {
  log = Logger.getInstance('GameAccessScene');

  private observer: ObserverSubscribers;
  private ctx: ApplicationContext;
  private container?: Container;
  private ticker?: ITicker;

  public constructor(ctx: ApplicationContext) {
    this.ctx = ctx;
    this.observer = new ObserverSubscribers(ctx.getObserver());
  }

  name(): string {
    return 'GameAccessScene';
  }

  async destroy() {
    await this.observer.unsubscribeAll();
    this.ctx.removeTicker(this.ticker);
    this.getContainer().removeAllListeners();
    this.getContainer().removeChildren();
  }

  async init() {
    this.container = new Container();
    this.ctx.getApp().stage.addChild(this.container);
  }

  async start() {
    const welcomeText = new Text('Hello, adventurer', Fonts.text());
    welcomeText.x = (ScreenData.width() - welcomeText.width) / 2;
    welcomeText.y = 120;
    this.getContainer().addChild(welcomeText);

    const info = new ScreenInfo(this.getContainer(), this.ctx);
    info.start();

    const newGame = new Text('New Game', Fonts.text());
    newGame.x = (ScreenData.width() - newGame.width) / 2;
    newGame.y = welcomeText.y + welcomeText.height;
    this.getContainer().addChild(newGame);

    const bouncer = new Text('Bouncer', Fonts.text());
    bouncer.x = (ScreenData.width() - bouncer.width) / 2;
    bouncer.y = newGame.y + newGame.height;
    this.getContainer().addChild(bouncer);

    const btn = new Button(bouncer);
    btn.onPress.connect(() => this.observer.publish('scene/start', scene(GameSceneConstants.BOUNCING).build()));

    this.ticker = this.ctx.addTicker((time: number) => {
      info.tick(time);
    });
  }

  private getContainer(): Container {
    if (!this.container) {
      throw Error('container is null');
    }
    return this.container;
  }
}
