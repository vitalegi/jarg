import { Text } from 'pixi.js';
import Logger from '../../../logging/logger';
import { AbstractGameScene } from './abstract-scene';
import Fonts from '../styles/fonts';
import ScreenData from '../devices/screen';
import { Button, List } from '@pixi/ui';
import GameSceneConstants from '../scene-coordinators/game-scene-constants';
import SceneManager from '../scene-coordinators/scene-manager';

export default class GameAccessScene extends AbstractGameScene {
  log = Logger.getInstance('GameAccessScene');

  name(): string {
    return GameSceneConstants.GAME_ACCESS;
  }

  async start() {
    this.withRandomBackground();
    this.withScreenInfo();

    const options = new List({ type: 'vertical' });
    options.y = 20;

    options.addChild(this.text('Hello, adventurer'));
    options.addChild(this.option('Persona', () => SceneManager.startPersonaBuilder(this.observer)));
    options.addChild(this.option('Battle!', () => SceneManager.startBattle(this.observer)));
    options.addChild(this.option('Bouncer', () => SceneManager.startBouncing(this.observer)));

    this.getContainer().addChild(options);

    let animation = await this.ctx.getAssetLoader().loadAnimatedSprite('arcanine');
    animation.play();
    this.getContainer().addChild(animation);

    animation = await this.ctx.getAssetLoader().loadAnimatedSprite('abra');
    animation.x = 200;
    animation.play();
    this.getContainer().addChild(animation);

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
}
