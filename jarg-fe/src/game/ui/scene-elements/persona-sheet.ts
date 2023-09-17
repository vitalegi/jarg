import Logger from '../../../logging/logger';
import { Persona } from '../../core/models/persona';
import Fonts from '../styles/fonts';
import SceneElement from './scene-element';
import { Sprite, Text } from 'pixi.js';
import Menu, { OptionFactory } from './menu';

export default class PersonaSheet extends SceneElement {
  log = Logger.getInstance('PersonaSheet');

  persona?: Persona;
  background?: Sprite;
  sheet?: Menu;

  public start() {
    if (!this.persona) {
      throw Error(`Persona not initialized`);
    }

    this.sheet = new Menu(
      this.container,
      this.ctx,
      OptionFactory.text(this.persona.name),
      OptionFactory.text(`${this.persona.level}`),
      OptionFactory.text(this.persona.race.name),
      OptionFactory.text(`${this.persona.hp.current} / ${this.persona.hp.max}`),
      OptionFactory.text(`${this.persona.mp.current} / ${this.persona.mp.max}`),
      OptionFactory.text(`ATK ${this.persona.baseStats.attack}`),
      OptionFactory.text(`DEF ${this.persona.baseStats.defence}`),
      OptionFactory.text(`INT ${this.persona.baseStats.intelligence}`),
      OptionFactory.text(`RES ${this.persona.baseStats.resistance}`)
    );

    this.sheet.start();
  }

  public tick(time: number) {
    if (!this.sheet) {
      return;
    }
    this.sheet.tick(time);
  }

  protected text(text: string): Text {
    return new Text(text, Fonts.text());
  }
}
