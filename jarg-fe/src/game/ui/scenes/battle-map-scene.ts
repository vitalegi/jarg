import { AnimatedSprite, Container, Sprite, Text, Texture } from 'pixi.js';
import Logger from '../../../logging/logger';
import { AbstractGameScene } from './abstract-scene';
import Fonts from '../styles/fonts';
import ScreenData from '../devices/screen';
import { Button } from '@pixi/ui';
import GameSceneConstants from '../scene-coordinators/game-scene-constants';
import jargBe from '../../../api/jarg-be';
import { Tile } from '../../core/models/tile';
import { BattleMap } from '../../core/models/battle-map';
import ArrayUtil from '../../util/array-util';
import { Coordinate } from '../../core/models/coordinate';
import PixiNames from '../pixi-names';
import { Persona } from '../../core/models/persona';
import PersonaeCatalogueMenu from '../scene-elements/personae-catalogue-menu';
import { PersonaeSelectionService } from '../../core/services/personae-selection-service';
import { PersonaPlacement } from '../../core/models/persona-placement';
import { battleActionService } from '../../core/services/battle-action-service';

export default class BattleMapScene extends AbstractGameScene {
  log = Logger.getInstance('BattleMapScene');

  _battleMap?: BattleMap;

  _mapContainer?: Container;

  name(): string {
    return GameSceneConstants.BATTLE_MAP;
  }

  async start() {
    this.withRandomBackground();
    this.withScreenInfo();

    this._battleMap = await jargBe.battle().createRandom();

    const w = 100;
    const h = 100;

    this._mapContainer = new Container();
    await this.renderMap(this._battleMap, this._mapContainer);
    this.getContainer().addChild(this._mapContainer);

    const myPersonae = await jargBe.persona().getMyPersonae();

    const selectPersonaeService = new PersonaeSelectionService(
      myPersonae,
      new Array<Persona>(),
      this._battleMap,
      (p) => this.addPersona(p),
      (p) => this.removePersona(p)
    );
    const selectPersonae = new PersonaeCatalogueMenu(
      this.getContainer(),
      this.ctx,
      (p) => PixiNames.cataloguePersona(p),
      selectPersonaeService
    );

    selectPersonae.start();
    this.addTicker((time: number) => {
      selectPersonae.tick(time);
    }, 'SelectPersonae');

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
    const textures = await this.loadTileTextures(battleMap.battle.tiles);

    const maxX = ArrayUtil.max(battleMap.battle.tiles.map((t) => t.coordinate.x));
    const maxY = ArrayUtil.max(battleMap.battle.tiles.map((t) => t.coordinate.y));

    for (let i = 0; i < maxX + maxY + 1; i++) {
      // tiles
      for (let j = 0; j <= i; j++) {
        const x = i - j;
        const y = j;
        const tileEntry = battleMap.battle.findTile(new Coordinate(x, y));
        if (tileEntry === undefined) {
          continue;
        }

        const pixel_x = ((x - y) * this.getTileWidth()) / 2;
        const pixel_y = ((x + y) * this.getTileWidth()) / 4;

        this.log.debug(`Render ${x},${y} in ${pixel_x},${pixel_y}`);
        const texture = textures.get(tileEntry.animation);
        if (texture === undefined) {
          throw Error(`Texture ${tileEntry.animation} not found`);
        }
        const tile = new Sprite(texture);
        tile.name = PixiNames.tile(tileEntry);
        tile.x = pixel_x + (Math.max(maxX, maxY) * this.getTileWidth()) / 2;
        tile.y = pixel_y;
        tile.width = this.getTileWidth();
        tile.height = this.getTileHeight();
        container.addChild(tile);
      }
      // personae
      for (let j = 0; j <= i; j++) {
        const x = i - j;
        const y = j;
        const placement = this.getBattleMap().battle.findPersonaPlacementByCoordinate(new Coordinate(x, y));
        if (placement === undefined) {
          continue;
        }
        const persona = this.getBattleMap().battle.getPersona(placement.personaId);
        await this.renderPersonaOnMap(persona, placement.coordinate);
      }
    }

    container.x = (ScreenData.width() - container.width - this.getTileWidth()) / 2;
    container.y = 200;
  }

  protected async addPersona(persona: Persona): Promise<void> {
    this.log.info(`Add persona ${persona.id} to map`);
    const battleMap = this.getBattleMap();
    this.log.debug(`Add persona to backend`);
    const availableCoordinates = await jargBe.battle().getAvailableDisplacements(battleMap.battleId);
    const coordinate = availableCoordinates[0];
    const addPersona = await jargBe.battle().addPlayerPersona(battleMap.battleId, persona.id, coordinate);

    this.log.debug(`Add persona to local model`);
    await battleActionService.addPersona(persona, addPersona.personaPlacement, battleMap);

    this.log.debug(`Render persona`);
    this.renderPersonaOnMap(persona, coordinate);
  }

  protected async removePersona(persona: Persona): Promise<void> {
    this.log.info(`Remove persona ${persona.id} from map`);
    const battleMap = this.getBattleMap();

    this.log.debug(`Remove persona from backend`);
    await jargBe.battle().deletePlayerPersona(battleMap.battleId, persona.id);

    this.log.debug(`Remove persona from local model`);
    await battleActionService.removePersona(persona.id, battleMap);

    this.log.debug(`Remove persona from rendering`);
    this.removePersonaRenderingFromMap(persona);
  }

  protected async renderPersonaOnMap(persona: Persona, coordinate: Coordinate): Promise<void> {
    if (!this._mapContainer) {
      throw Error(`map container is null`);
    }
    const container = this._mapContainer;
    const animation = await this.createPersonaSprite(persona);
    const tile = container.getChildByName(PixiNames.tile(coordinate));
    if (tile === null) {
      throw Error(`Missing tile for ${coordinate.toString()}`);
    }
    if (!(tile instanceof Sprite)) {
      throw Error(`Tile ${coordinate.toString()} is not a Sprite`);
    }
    const tileSprite = tile as Sprite;
    animation.x = tile.x + (tileSprite.width - animation.width) / 2;
    animation.y = tile.y + (this.getTileHeight() / 3 - animation.height);
    this.log.info(`Persona in ${coordinate.toString()}`);
    container.addChild(animation);
  }

  protected async removePersonaRenderingFromMap(persona: Persona): Promise<void> {
    if (!this._mapContainer) {
      throw Error(`map container is null`);
    }
    const container = this._mapContainer;
    const name = PixiNames.persona(persona);
    const element = container.getChildByName(name);
    if (!element) {
      this.log.info(`Missing animation for persona ${persona.id}, skip removal`);
      return;
    }
    container.removeChild(element);
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

  protected getTileWidth(): number {
    return 120;
  }

  protected getTileHeight(): number {
    return 120;
  }
}
