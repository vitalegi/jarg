import { Application, Container, Graphics, ICanvas, IRenderer, Text } from 'pixi.js';
import Observer, { ObserverSubscribers } from '../../observers/observer';
import Logger from '../../../logging/logger';
import { GameScene } from './scene';
import Fonts from '../styles/fonts';
import ScreenData from '../devices/screen';
import ScreenInfo from '../scene-elements/screen-info';
import BouncingObject from '../scene-elements/bouncing-object';
import { Button } from '@pixi/ui';
import { scene } from '../../core/models/start-scene';
import GameSceneConstants from '../../core/constants/game-scene-constants';

export default class BouncingScene implements GameScene {
  log = Logger.getInstance('BouncingScene');

  private observer: ObserverSubscribers;
  private app?: Application;
  private container?: Container;

  public constructor(observer: Observer) {
    this.observer = new ObserverSubscribers(observer);
  }

  name(): string {
    return 'BouncingScene';
  }

  async destroy() {
    await this.observer.unsubscribeAll();
    this.getContainer().removeAllListeners();
    this.getContainer().removeChildren();
  }

  async init() {}

  async start() {
    const bouncers = new Array<BouncingObject>();

    const info = new ScreenInfo(this.getContainer(), this.getApp());
    info.start();

    const spawn = new Text('Spawn', Fonts.text());
    spawn.x = (ScreenData.width() - spawn.width) / 2;
    spawn.y = 120;
    this.getContainer().addChild(spawn);

    const btn = new Button(spawn);
    btn.onPress.connect(() => {
      const bouncer = new BouncingObject(this.getContainer(), this.getApp(), this.randomShape());
      bouncer.start();
      bouncers.push(bouncer);
    });

    const back = new Text('Back', Fonts.text());
    back.x = (ScreenData.width() - back.width) / 2;
    back.y = spawn.y + spawn.height;
    this.getContainer().addChild(back);

    const backBtn = new Button(back);
    backBtn.onPress.connect(() => this.observer.publish('scene/start', scene(GameSceneConstants.GAME_ACCESS).build()));

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
}
