import { Input } from '@pixi/ui';
import Logger from '../../../logging/logger';
import ScreenData from '../devices/screen';
import Fonts from '../styles/fonts';
import SceneElement from './scene-element';
import { Graphics, Text } from 'pixi.js';

export default class TextInput extends SceneElement {
  log = Logger.getInstance('TextInput');

  x = 0;
  y = 0;
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
    const width = 320;
    const height = 70;
    const radius = 8;
    const border = 4;
    this._element = new Input({
      bg: new Graphics()
        .beginFill('red')
        .drawRoundedRect(0, 0, width, height, radius + border)
        .beginFill('white')
        .drawRoundedRect(border, border, width - border * 2, height - border * 2, radius),
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
    this._element.x = this.x;
    this._element.y = this.y;

    if (this.onEnter) {
      this._element.onEnter.connect(this.onEnter);
    }

    this.container.addChild(this._element);
  }
  public tick(time: number) {}
}
