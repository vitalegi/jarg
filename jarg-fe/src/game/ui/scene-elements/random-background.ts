import Logger from '../../../logging/logger';
import ScreenData from '../devices/screen';
import Fonts from '../styles/fonts';
import SceneElement from './scene-element';
import { Sprite, Text } from 'pixi.js';

export default class RandomBackground extends SceneElement {
  log = Logger.getInstance('RandomBackground');

  readonly images = [
    { url: 'assets/craftpix-net-800370/nature_1.png', width: 2304, height: 1296 },
    { url: 'assets/craftpix-net-800370/nature_2.png', width: 576, height: 324 },
    { url: 'assets/craftpix-net-800370/nature_3.png', width: 2304, height: 1296 },
    { url: 'assets/craftpix-net-800370/nature_4.png', width: 2304, height: 1296 },
    { url: 'assets/craftpix-net-800370/nature_5.png', width: 2304, height: 1296 },
    { url: 'assets/craftpix-net-800370/nature_6.png', width: 2304, height: 1296 },
    { url: 'assets/craftpix-net-800370/nature_7.png', width: 2304, height: 1296 },
    { url: 'assets/craftpix-net-800370/nature_8.png', width: 2304, height: 1296 }
  ];

  src?: { url: string; width: number; height: number };
  background?: Sprite;

  public start() {
    this.src = this.images[Math.floor(Math.random() * this.images.length)];
    this.background = Sprite.from(this.src.url);
    this.container.addChild(this.background);
  }

  public tick(time: number) {
    if (!this.src || !this.background) {
      return;
    }
    const w = this.src.width;
    const h = this.src.height;
    const ratio = w / h;
    let targetW = 0;
    let targetH = 0;
    if (ScreenData.isLandscape()) {
      targetW = ScreenData.width();
      targetH = targetW / ratio;
    } else {
      targetH = ScreenData.height();
      targetW = targetH * ratio;
      this.background.width = targetW;
      this.background.height = targetH;
    }
    if (this.background.width !== targetW || this.background.height !== targetH) {
      this.background.width = targetW;
      this.background.height = targetH;
    }
  }
}
