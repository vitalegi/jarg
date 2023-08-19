import { Application, Container, Graphics, ICanvas, IRenderer, Text } from 'pixi.js';
import AssetLoader from '../assets-loader';
import Observer, { ObserverSubscribers } from '../../observers/observer';
import Logger from '../../../logging/logger';
import { GameScene } from './scene';
import Fonts from '../styles/fonts';
import ScreenData from '../devices/screen';
import ScreenInfo from '../scene-elements/screen-info';
import BouncingObject from '../scene-elements/bouncing-object';
import { Button } from '@pixi/ui';

export default class GameAccessScene implements GameScene {
  log = Logger.getInstance('GameAccessScene');

  private observer: ObserverSubscribers;
  private app?: Application;
  private assetLoader? = new AssetLoader();
  private container?: Container;

  public constructor(observer: Observer) {
    this.observer = new ObserverSubscribers(observer);
  }
  async destroy() {
    await this.observer.unsubscribeAll();
    this.getContainer().removeAllListeners();
    this.getContainer().removeChildren();
  }

  async init() {}

  async start() {
    const bouncers = new Array<BouncingObject>();

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

    const spawn = new Text('Spawn', Fonts.text());
    spawn.x = (ScreenData.width() - spawn.width) / 2;
    spawn.y = newGame.y + newGame.height;
    this.getContainer().addChild(spawn);

    const btn = new Button(spawn);
    btn.onPress.connect(() => {
      const bouncer = new BouncingObject(this.getContainer(), this.getApp(), this.randomShape());
      bouncer.start();
      bouncers.push(bouncer);
    });

    this.getApp().ticker.add((time: number) => {
      info.tick(time);
      bouncers.forEach((b) => b.tick(time));
    });
  }

  setApplication(app: Application<ICanvas>): void {
    this.app = app;
    this.container = new Container();
    this.app.stage.addChild(this.container);
  }

  private getAssetLoader(): AssetLoader {
    if (!this.assetLoader) {
      throw Error('assetLoader is null');
    }
    return this.assetLoader;
  }

  private randomShape(): Graphics {
    const colors = ['red', 'blue', 'yellow'];
    const circle = new Graphics();
    circle.beginFill(colors[Math.floor(Math.random() * colors.length)]);
    const r = Math.random();
    if (r < 0.9) {
      circle.drawCircle(0, 0, 5 + 40 * Math.random());
    } else {
      circle.drawCircle(0, 0, 50 + 50 * Math.random());
    }
    circle.x = ScreenData.width() / 2;
    circle.y = ScreenData.height() / 2;
    return circle;
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

  private getRenderer(): IRenderer<ICanvas> {
    return this.getApp().renderer;
  }
}
