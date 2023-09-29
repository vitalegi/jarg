import { Text } from 'pixi.js';
import Logger from '../../../logging/logger';
import { AbstractGameScene } from './abstract-scene';
import Fonts from '../styles/fonts';
import { Button } from '@pixi/ui';
import GameSceneConstants from '../scene-coordinators/game-scene-constants';
import jargBe from '../../../api/jarg-be';
import { NewPersona } from '../../core/models/new-persona';
import { Persona } from '../../core/models/persona';
import PersonaSheet from '../scene-elements/persona-sheet';
import SceneManager from '../scene-coordinators/scene-manager';
import { OptionFactory } from '../scene-elements/menu';
import ArrayUtil from '../../util/array-util';

export default class PersonaBuilderScene extends AbstractGameScene {
  log = Logger.getInstance('PersonaBuilderScene');

  name(): string {
    return GameSceneConstants.PERSONA_BUILDER;
  }

  async start() {
    this.withRandomBackground();
    this.withScreenInfo();

    this.withMenu(
      OptionFactory.text('Create new Persona'),
      OptionFactory.text('Cost TODO'),
      OptionFactory.text('Name TODO'),
      OptionFactory.text('Class TODO'),
      OptionFactory.text('Race TODO'),
      OptionFactory.alwaysEnabled('Create!', () => this.createPersona()),
      OptionFactory.alwaysEnabled('Back', () => SceneManager.startGameAccess(this.observer))
    );

    this.addTicker((time: number) => {});
  }

  protected text(text: string): Text {
    return this.option(text);
  }

  protected option(text: string, onPress?: () => void): Text {
    const label = new Text(text, Fonts.text());
    if (onPress) {
      const button = new Button(label);
      button.onPress.connect(onPress);
    }
    return label;
  }

  protected async createPersona(): Promise<void> {
    const request = new NewPersona();
    request.name = 'No name ' + Math.floor(Math.random() * 100);
    request.skin = ArrayUtil.getRandomElement([
      'abra',
      'aerodactyl',
      'alakazam',
      'arbok',
      'arcanine',
      'articuno',
      'beedrill',
      'bellsprout',
      'blastoise',
      'bulbasaur'
    ]);
    const persona = await jargBe.persona().createPersona(request);
    this.withPersona(persona);
  }

  protected withPersona(persona: Persona): void {
    const element = new PersonaSheet(this.getContainer(), this.ctx);
    element.persona = persona;
    element.start();
    this.addTicker((time: number) => {
      element.tick(time);
    }, 'personaSheet');
  }
}
