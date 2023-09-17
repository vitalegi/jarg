import { AnimatedSprite, Container, Sprite, Text, Texture } from 'pixi.js';
import Logger from '../../../logging/logger';
import { AbstractGameScene } from './abstract-scene';
import Fonts from '../styles/fonts';
import ScreenData from '../devices/screen';
import { Button, List } from '@pixi/ui';
import GameSceneConstants from '../scene-coordinators/game-scene-constants';
import jargBe from '../../../api/jarg-be';
import { Tile } from '../../core/models/tile';
import { BattleMap } from '../../core/models/battle-map';
import ArrayUtil from '../../util/array-util';
import { Coordinate } from '../../core/models/coordinate';
import PixiNames from '../pixi-names';
import { Persona } from '../../core/models/persona';
import { PersonaPlacement } from '../../core/models/persona-placement';

export default class BattleMapScene extends AbstractGameScene {
  log = Logger.getInstance('BattleMapScene');

  _battleMap?: BattleMap;

  name(): string {
    return GameSceneConstants.BATTLE_MAP;
  }

  async start() {
    this.withRandomBackground();
    this.withScreenInfo();

    let animation = await this.ctx.getAssetLoader().loadAnimatedSprite('arcanine');
    animation.play();
    this.getContainer().addChild(animation);

    animation = await this.ctx.getAssetLoader().loadAnimatedSprite('abra');
    animation.x = 200;
    animation.play();
    this.getContainer().addChild(animation);

    this._battleMap = await jargBe.battle().createRandom();

    const w = 100;
    const h = 100;

    const mapContainer = new Container();
    await this.renderMap(this._battleMap, mapContainer);
    this.getContainer().addChild(mapContainer);

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

  protected async renderMap(battleMap: BattleMap, container: Container): Promise<void> {
    const textures = await this.loadTileTextures(battleMap.tiles);

    const w = 120;
    const h = 120;
    const maxX = ArrayUtil.max(battleMap.tiles.map((t) => t.coordinate.x));
    const maxY = ArrayUtil.max(battleMap.tiles.map((t) => t.coordinate.y));

    for (let i = 0; i < maxX + maxY + 1; i++) {
      // tiles
      for (let j = 0; j <= i; j++) {
        const x = i - j;
        const y = j;
        const tileEntry = battleMap.findTile(new Coordinate(x, y));
        if (tileEntry === undefined) {
          continue;
        }

        const pixel_x = ((x - y) * w) / 2;
        const pixel_y = ((x + y) * w) / 4;

        this.log.debug(`Render ${x},${y} in ${pixel_x},${pixel_y}`);
        const texture = textures.get(tileEntry.animation);
        if (texture === undefined) {
          throw Error(`Texture ${tileEntry.animation} not found`);
        }
        const tile = new Sprite(texture);
        tile.name = PixiNames.tile(tileEntry);
        tile.x = pixel_x + (Math.max(maxX, maxY) * w) / 2;
        tile.y = pixel_y;
        tile.width = w;
        tile.height = h;
        container.addChild(tile);
      }
      // personas
      for (let j = 0; j <= i; j++) {
        const x = i - j;
        const y = j;
        const placement = this.getBattleMap().findPersonaPlacementByCoordinate(new Coordinate(x, y));
        if (placement === undefined) {
          continue;
        }
        const persona = this.getBattleMap().getPersona(placement.personaId);
        const animation = await this.createPersonaSprite(persona);
        const tile = container.getChildByName(PixiNames.tile(placement.coordinate));
        if (tile === null) {
          throw Error(`Missing tile for ${placement.coordinate.toString()}`);
        }
        if (!(tile instanceof Sprite)) {
          throw Error(`Tile ${placement.coordinate.toString()} is not a Sprite`);
        }
        const tileSprite = tile as Sprite;
        animation.x = tile.x + (tileSprite.width - animation.width) / 2;
        animation.y = tile.y + (h / 3 - animation.height);
        this.log.info(`Persona in ${placement.coordinate.toString()}`);
        container.addChild(animation);
      }
    }

    container.x = (ScreenData.width() - container.width - w) / 2;
    container.y = 200;
  }

  protected async loadTileTextures(tiles: Array<Tile>): Promise<Map<string, Texture>> {
    const map = new Map<string, Texture>();
    for (const tile of tiles) {
      const animation = tile.animation;
      if (!map.has(animation)) {
        const texture = await this.ctx.getAssetLoader().loadTexture(animation);
        map.set(animation, texture);
      }
    }
    return map;
  }

  protected async createPersonaSprite(persona: Persona): Promise<AnimatedSprite> {
    const animation = await this.ctx.getAssetLoader().loadAnimatedSprite(persona.skin);
    animation.name = PixiNames.persona(persona);
    animation.play();
    return animation;
  }

  protected getBattleMap(): BattleMap {
    if (this._battleMap) {
      return this._battleMap;
    }
    throw Error(`BattleMap is null`);
  }
}
