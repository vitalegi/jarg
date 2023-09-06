import { Text } from 'pixi.js';
import Logger from '../../../logging/logger';
import { AbstractGameScene } from './abstract-scene';
import Fonts from '../styles/fonts';
import ScreenData from '../devices/screen';
import { Button, List } from '@pixi/ui';
import { scene } from '../../core/models/start-scene';
import GameSceneConstants from '../../core/constants/game-scene-constants';
import jargBe from '../../../api/jarg-be';
import { NewPersona } from '../../core/models/new-persona';

export default class PersonaBuilderScene extends AbstractGameScene {
  log = Logger.getInstance('PersonaBuilderScene');

  name(): string {
    return GameSceneConstants.PERSONA_BUILDER;
  }

  async start() {
    this.withRandomBackground();
    this.withScreenInfo();

    const options = new List({ type: 'vertical' });
    options.y = 20;

    options.addChild(this.text('Create new Persona'));
    options.addChild(this.text('Cost TODO'));
    options.addChild(this.text('Name TODO'));
    options.addChild(this.text('Class TODO'));
    options.addChild(this.text('Race TODO'));
    options.addChild(this.option('Create!', () => this.createPersona()));
    options.addChild(this.option('Back', () => this.observer.publish('scene/start', scene(GameSceneConstants.GAME_ACCESS).build())));

    this.getContainer().addChild(options);

    this.addTicker((time: number) => {
      options.x = (ScreenData.width() - options.width) / 2;
    });
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
    await jargBe.persona().createPersona(new NewPersona());
  }
}
