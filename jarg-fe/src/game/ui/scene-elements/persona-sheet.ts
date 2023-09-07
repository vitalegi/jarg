import { List } from '@pixi/ui';
import Logger from '../../../logging/logger';
import { Persona } from '../../core/models/persona';
import ScreenData from '../devices/screen';
import Fonts from '../styles/fonts';
import SceneElement from './scene-element';
import { Sprite, Text } from 'pixi.js';

export default class PersonaSheet extends SceneElement {
  log = Logger.getInstance('PersonaSheet');

  persona?: Persona;
  background?: Sprite;
  sheet?: List;

  public start() {
    if (!this.persona) {
      throw Error(`Persona not initialized`);
    }
    this.sheet = new List({ type: 'vertical' });
    this.sheet.y = 150;
    this.sheet.addChild(this.text(this.persona.name));
    this.sheet.addChild(this.text(`${this.persona.level}`));
    this.sheet.addChild(this.text(this.persona.race.name));
    this.sheet.addChild(this.text(`${this.persona.hp.current} / ${this.persona.hp.max}`));
    this.sheet.addChild(this.text(`${this.persona.mp.current} / ${this.persona.mp.max}`));
    this.sheet.addChild(this.text(`ATK ${this.persona.baseStats.attack}`));
    this.sheet.addChild(this.text(`DEF ${this.persona.baseStats.defence}`));
    this.sheet.addChild(this.text(`INT ${this.persona.baseStats.intelligence}`));
    this.sheet.addChild(this.text(`RES ${this.persona.baseStats.resistance}`));
    this.container.addChild(this.sheet);
  }

  public tick(time: number) {
    if (!this.sheet) {
      return;
    }
    this.sheet.x = (ScreenData.width() - this.sheet.width) / 2;
  }

  protected text(text: string): Text {
    return new Text(text, Fonts.text());
  }
}
