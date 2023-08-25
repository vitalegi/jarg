import Logger from '../../../logging/logger';
import ScreenData from '../devices/screen';
import Fonts from '../styles/fonts';
import SceneElement from './scene-element';
import { Text } from 'pixi.js';

export default class ScreenInfo extends SceneElement {
  log = Logger.getInstance('ScreenInfo');
  info?: Text;

  public start() {
    this.info = new Text(this.getInfo(), Fonts.textNote());
    this.info.x = this.getX(this.info);
    this.info.y = this.getY(this.info);
    this.container.addChild(this.info);
  }
  public tick(time: number) {
    if (!this.info) {
      return;
    }
    const newText = this.getInfo();
    if (newText !== this.info.text) {
      this.info.text = newText;
      this.info.x = this.getX(this.info);
      this.info.y = this.getY(this.info);
    }
  }
  private getInfo(): string {
    return `${ScreenData.width()}*${ScreenData.height()} (${ScreenData.isLandscape() ? 'ls' : 'v'})`;
  }

  private getX(info: Text): number {
    return ScreenData.width() - info.width - 5;
  }
  private getY(info: Text): number {
    return ScreenData.height() - info.height - 5;
  }
}
