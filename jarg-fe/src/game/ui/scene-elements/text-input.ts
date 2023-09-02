import { Input } from '@pixi/ui';
import Logger from '../../../logging/logger';
import ScreenData from '../devices/screen';
import Fonts from '../styles/fonts';
import SceneElement from './scene-element';
import { Graphics, Text } from 'pixi.js';

export default class TextInput extends SceneElement {
  log = Logger.getInstance('TextInput');

  x: number | 'center' = 'center';
  y = 0;
  width = 320;
  height = 70;
  placeholder = '';
  initialValue = '';
  onEnter?: (val: string) => void;
  _element?: Input;

  public getElement(): Input {
    if (!this._element) {
      throw Error('Element is null');
    }
    return this._element;
  }

  public start() {
    const radius = 8;
    const border = 4;
    this._element = new Input({
      bg: new Graphics()
        .beginFill('red')
        .drawRoundedRect(0, 0, this.width, this.height, radius + border)
        .beginFill('white')
        .drawRoundedRect(border, border, this.width - border * 2, this.height - border * 2, radius),
      textStyle: {
        fill: 'black',
        fontSize: 24,
        fontWeight: 'bold'
      },
      maxLength: 10,
      align: 'center',
      placeholder: this.placeholder,
      value: this.initialValue,
      padding: [0, 0, 0, 0]
    });
    if (this.x === 'center') {
      this._element.x = (ScreenData.width() - this._element.width) / 2;
    } else {
      this._element.x = this.x;
    }
    this._element.y = this.y;

    if (this.onEnter) {
      this._element.onEnter.connect(this.onEnter);
    }

    this.container.addChild(this._element);
  }
  public tick(time: number) {}
}
