import Logger from '../../../logging/logger';
import ApplicationContext from '../application-context';
import ScreenData from '../devices/screen';
import SceneElement from './scene-element';
import { Container, Graphics, Text } from 'pixi.js';

export default class BouncingObject extends SceneElement {
  log = Logger.getInstance('ScreenInfo');
  info?: Text;
  obj: Graphics;
  speed = { x: 0, y: 0 };

  public constructor(container: Container, ctx: ApplicationContext, obj: Graphics) {
    super(container, ctx);
    this.obj = obj;
  }

  public start() {
    this.speed = {
      x: (0.5 - Math.random()) * 15,
      y: (0.5 - Math.random()) * 15
    };
    this.container.addChild(this.obj);
  }
  public tick(time: number) {
    const incX = this.speed.x * time;
    if (this.speed.x >= 0) {
      if (this.obj.x + this.obj.width / 2 + incX < ScreenData.width()) {
        this.obj.x += incX;
      } else {
        this.speed.x = this.speed.x * -1;
        this.obj.x = ScreenData.width() - this.obj.width / 2;
      }
    } else {
      if (this.obj.x - this.obj.width / 2 + incX >= 0) {
        this.obj.x += incX;
      } else {
        this.speed.x = this.speed.x * -1;
        this.obj.x = this.obj.width / 2;
      }
    }
    const incY = this.speed.y * time;
    if (this.speed.y >= 0) {
      if (this.obj.y + this.obj.width / 2 + incY < ScreenData.height()) {
        this.obj.y += incY;
      } else {
        this.speed.y = this.speed.y * -1;
        this.obj.y = ScreenData.height() - this.obj.height / 2;
      }
    } else {
      if (this.obj.y - this.obj.width / 2 + incY >= 0) {
        this.obj.y += incY;
      } else {
        this.speed.y = this.speed.y * -1;
        this.obj.y = this.obj.height / 2;
      }
    }
  }
}
