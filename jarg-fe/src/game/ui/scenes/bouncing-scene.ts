import { Graphics, Text } from 'pixi.js';
import Logger from '../../../logging/logger';
import { AbstractGameScene } from './abstract-scene';
import Fonts from '../styles/fonts';
import ScreenData from '../devices/screen';
import BouncingObject from '../scene-elements/bouncing-object';
import { Button } from '@pixi/ui';
import GameSceneConstants from '../scene-coordinators/game-scene-constants';
import SceneManager from '../scene-coordinators/scene-manager';

export default class BouncingScene extends AbstractGameScene {
  log = Logger.getInstance('BouncingScene');

  name(): string {
    return GameSceneConstants.BOUNCING;
  }

  async start() {
    this.withRandomBackground();
    this.withScreenInfo();

    const bouncers = new Array<BouncingObject>();

    const spawn = new Text('Spawn', Fonts.text());
    spawn.x = (ScreenData.width() - spawn.width) / 2;
    spawn.y = 120;
    this.getContainer().addChild(spawn);

    const btn = new Button(spawn);
    btn.onPress.connect(() => {
      const bouncer = new BouncingObject(this.getContainer(), this.ctx, this.randomShape());
      bouncer.start();
      bouncers.push(bouncer);
    });

    const back = new Text('Back', Fonts.text());
    back.x = (ScreenData.width() - back.width) / 2;
    back.y = spawn.y + spawn.height;
    this.getContainer().addChild(back);

    const backBtn = new Button(back);
    backBtn.onPress.connect(() => SceneManager.startGameAccess(this.observer));

    this.addTicker((time: number) => {
      bouncers.forEach((b) => b.tick(time));
    });
  }

  private randomShape(): Graphics {
    const colors = ['red', 'blue', 'yellow'];
    const circle = new Graphics();
    circle.beginFill(colors[Math.floor(Math.random() * colors.length)]);
    const r = Math.random();
    if (r < 0.9) {
      circle.drawCircle(0, 0, 5 + 40 * Math.random());
    } else {
      circle.drawCircle(0, 0, 50 + 50 * Math.random());
    }
    circle.x = ScreenData.width() / 2;
    circle.y = ScreenData.height() / 2;
    return circle;
  }
}
