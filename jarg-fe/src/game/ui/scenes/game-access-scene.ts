import { Text } from 'pixi.js';
import Logger from '../../../logging/logger';
import { AbstractGameScene } from './abstract-scene';
import Fonts from '../styles/fonts';
import ScreenData from '../devices/screen';
import ScreenInfo from '../scene-elements/screen-info';
import { Button } from '@pixi/ui';
import { scene } from '../../core/models/start-scene';
import GameSceneConstants from '../../core/constants/game-scene-constants';

export default class GameAccessScene extends AbstractGameScene {
  log = Logger.getInstance('GameAccessScene');

  name(): string {
    return 'GameAccessScene';
  }

  async start() {
    const welcomeText = new Text('Hello, adventurer', Fonts.text());
    welcomeText.x = (ScreenData.width() - welcomeText.width) / 2;
    welcomeText.y = 120;
    this.getContainer().addChild(welcomeText);

    const info = new ScreenInfo(this.getContainer(), this.ctx);
    info.start();

    const newGame = new Text('New Game', Fonts.text());
    newGame.x = (ScreenData.width() - newGame.width) / 2;
    newGame.y = welcomeText.y + welcomeText.height;
    this.getContainer().addChild(newGame);

    const bouncer = new Text('Bouncer', Fonts.text());
    bouncer.x = (ScreenData.width() - bouncer.width) / 2;
    bouncer.y = newGame.y + newGame.height;
    this.getContainer().addChild(bouncer);

    const btn = new Button(bouncer);
    btn.onPress.connect(() => this.observer.publish('scene/start', scene(GameSceneConstants.BOUNCING).build()));

    let animation = await this.ctx.getAssetLoader().loadAnimatedSprite('arcanine');
    animation.play();
    this.getContainer().addChild(animation);

    animation = await this.ctx.getAssetLoader().loadAnimatedSprite('abra');
    animation.x = 200;
    animation.play();
    this.getContainer().addChild(animation);

    this.addTicker((time: number) => {
      info.tick(time);
    });
  }
}
