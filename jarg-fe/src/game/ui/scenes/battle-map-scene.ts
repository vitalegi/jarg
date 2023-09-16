import { Container, Sprite, Text } from 'pixi.js';
import Logger from '../../../logging/logger';
import { AbstractGameScene } from './abstract-scene';
import Fonts from '../styles/fonts';
import ScreenData from '../devices/screen';
import { Button, List } from '@pixi/ui';
import GameSceneConstants from '../scene-coordinators/game-scene-constants';

export default class BattleMapScene extends AbstractGameScene {
  log = Logger.getInstance('BattleMapScene');

  name(): string {
    return GameSceneConstants.BATTLE_MAP;
  }

  async start() {
    this.withRandomBackground();
    this.withScreenInfo();

    const options = new List({ type: 'vertical' });
    options.y = 20;

    options.addChild(this.text('Battle'));

    this.getContainer().addChild(options);

    let animation = await this.ctx.getAssetLoader().loadAnimatedSprite('arcanine');
    animation.play();
    this.getContainer().addChild(animation);

    animation = await this.ctx.getAssetLoader().loadAnimatedSprite('abra');
    animation.x = 200;
    animation.play();
    this.getContainer().addChild(animation);

    const texture = await this.ctx.getAssetLoader().loadTexture('terrain_01/isometric_pixel_0014.png');

    const w = 100;
    const h = 100;

    const maxX = 5;
    const maxY = 7;
    const mapContainer = new Container();

    for (let i = 0; i < Math.max(maxX, maxY); i++) {
      for (let j = 0; j <= i; j++) {
        const x = i - j;
        const y = j;

        const pixel_x = ((x - y) * w) / 2;
        const pixel_y = (i * w) / 4;

        this.log.info(`Render ${x},${y} in ${pixel_x},${pixel_y}`);

        const tile = new Sprite(texture);
        tile.x = pixel_x + (Math.max(maxX, maxY) * w) / 2;
        tile.y = pixel_y;
        tile.width = w;
        tile.height = h;
        mapContainer.addChild(tile);
      }
    }
    mapContainer.x = (ScreenData.width() - mapContainer.width - w) / 2;
    mapContainer.y = 200;
    this.log.info(`w : ${mapContainer.width}`);
    this.getContainer().addChild(mapContainer);

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
