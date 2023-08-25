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

export default class GameAccessScene implements GameScene {
  log = Logger.getInstance('GameAccessScene');

  private observer: ObserverSubscribers;
  private app?: Application;
  private assetLoader? = new AssetLoader();
  private container?: Container;

  public constructor(observer: Observer) {
    this.observer = new ObserverSubscribers(observer);
  }

  name(): string {
    return 'GameAccessScene';
  }

  async destroy() {
    await this.observer.unsubscribeAll();
    this.getContainer().removeAllListeners();
    this.getContainer().removeChildren();
  }

  async init() {}

  async start() {
    const welcomeText = new Text('Hello, adventurer', Fonts.text());
    welcomeText.x = (ScreenData.width() - welcomeText.width) / 2;
    welcomeText.y = 120;
    this.getContainer().addChild(welcomeText);

    const info = new ScreenInfo(this.getContainer(), this.getApp());
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

    this.getApp().ticker.add((time: number) => {
      info.tick(time);
    });
  }

  setApplication(app: Application<ICanvas>): void {
    this.app = app;
    this.container = new Container();
    this.app.stage.addChild(this.container);
  }

  private getApp(): Application {
    if (!this.app) {
      throw Error('app is null');
    }
    return this.app;
  }
  private getContainer(): Container {
    if (!this.container) {
      throw Error('container is null');
    }
    return this.container;
  }
}
