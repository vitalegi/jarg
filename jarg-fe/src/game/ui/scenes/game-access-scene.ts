import { Application, ICanvas, IRenderer } from 'pixi.js';
import AssetLoader from '../assets-loader';
import Observer, { ObserverSubscribers } from '../../observers/observer';
import Logger from '../../../logging/logger';
import { GameScene } from './scene';
import * as PIXI from 'pixi.js';
import Fonts from '../styles/fonts';
import ScreenData from '../devices/screen';
import ScreenInfo from '../scene-elements/screen-info';

export default class GameAccessScene implements GameScene {
  log = Logger.getInstance('GameAccessScene');

  private observer: ObserverSubscribers;
  private app?: Application;
  private assetLoader? = new AssetLoader();
  private container?: PIXI.Container;

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
    const welcomeText = new PIXI.Text('Hello, adventurer...', Fonts.text());
    welcomeText.x = (ScreenData.width() - welcomeText.width) / 2;
    welcomeText.y = 120;
    this.getContainer().addChild(welcomeText);
    const info = new ScreenInfo(this.getContainer(), this.getApp());
    info.start();

    const circle = new PIXI.Graphics();
    circle.beginFill('red');
    circle.drawCircle(0, 0, 50);
    circle.x = 50;
    circle.y = 50;
    this.getContainer().addChild(circle);
    const speed = {
      x: Math.random() * 5 + 0.01,
      y: Math.random() * 5 + 0.01
    };

    this.getApp().ticker.add((time: number) => {
      info.tick(time);
      const incX = speed.x * time;
      if (speed.x >= 0) {
        if (circle.x + circle.width / 2 + incX < ScreenData.width()) {
          circle.x += incX;
        } else {
          speed.x = speed.x * -1;
          circle.x = ScreenData.width() - circle.width / 2;
        }
      } else {
        if (circle.x - circle.width / 2 + incX >= 0) {
          circle.x += incX;
        } else {
          speed.x = speed.x * -1;
          circle.x = circle.width / 2;
        }
      }
      const incY = speed.y * time;
      if (speed.y >= 0) {
        if (circle.y + circle.width / 2 + incY < ScreenData.height()) {
          circle.y += incY;
        } else {
          speed.y = speed.y * -1;
          circle.y = ScreenData.height() - circle.height / 2;
        }
      } else {
        if (circle.y - circle.width / 2 + incY >= 0) {
          circle.y += incY;
        } else {
          speed.y = speed.y * -1;
          circle.y = circle.height / 2;
        }
      }
    });
  }

  setApplication(app: Application<ICanvas>): void {
    this.app = app;
    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
  }

  private getAssetLoader(): AssetLoader {
    if (!this.assetLoader) {
      throw Error('assetLoader is null');
    }
    return this.assetLoader;
  }

  private getApp(): Application {
    if (!this.app) {
      throw Error('app is null');
    }
    return this.app;
  }
  private getContainer(): PIXI.Container {
    if (!this.container) {
      throw Error('container is null');
    }
    return this.container;
  }

  private getRenderer(): IRenderer<ICanvas> {
    return this.getApp().renderer;
  }
}
