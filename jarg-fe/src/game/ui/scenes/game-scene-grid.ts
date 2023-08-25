import { FederatedPointerEvent, Resource, Sprite, Texture } from 'pixi.js';
import Grid, { GridEntry } from '../../core/models/grid';
import InteractionStore from '../interation-store';
import { createRandom } from '../../core/services/game-initializr';
import { SwapModel } from '../../core/models/observer-models';
import Logger from '../../../logging/logger';
import { AbstractGameScene } from './abstract-scene';

export default class GameSceneGrid extends AbstractGameScene {
  log = Logger.getInstance('Game');

  private textures = new Map<string, Texture<Resource>>();
  private interactionStore = new InteractionStore();

  name(): string {
    return 'GameSceneGrid';
  }

  public async destroy() {
    await this.observer.unsubscribeAll();
  }

  public async init(): Promise<void> {
    await super.init();
    await this.initTextures();
    this.observer.subscribe('new-game-ready', (payload: unknown) => this.eventNewGame(Grid.parse(payload)));
    this.observer.subscribe('swap-confirmed', (payload: unknown) => this.eventSwap(SwapModel.parse(payload)));
  }
  async start() {}

  public async newGame() {
    const grid = await createRandom(10, 8);
    this.observer.publish('new-game-request', grid);
  }

  private async initTextures() {
    const blue = await this.ctx.getAssetLoader().load('blue.png');
    const red = await this.ctx.getAssetLoader().load('red.png');
    const white = await this.ctx.getAssetLoader().load('white.png');
    this.textures.set('blue', blue);
    this.textures.set('red', red);
    this.textures.set('white', white);
  }

  protected getTexture(name?: string): Texture<Resource> {
    if (!name) {
      name = 'white';
    }
    const value = this.textures.get(name);
    if (!value) {
      throw Error(`Texture ${name} not found`);
    }
    return value;
  }

  protected async createSprite(entry: GridEntry, maxVerticalSize: number) {
    const texture = this.getTexture(entry.color);
    const sprite = new Sprite(texture);
    const id = entry.id;
    sprite.name = id;
    sprite.x = entry.horizontalIndex * 50;
    sprite.y = (maxVerticalSize - entry.verticalIndex) * 50;
    sprite.on('click', (event: FederatedPointerEvent) => {
      this.click(id);
    });
    sprite.eventMode = 'static';
    this.ctx.getApp().stage.addChild(sprite);
  }

  protected click(id: string): void {
    if (this.interactionStore.isSelected()) {
      const previousId = this.interactionStore.getSelected();
      if (previousId === id) {
        this.interactionStore.reset();
        this.log.info(`${id} deselected`);
      } else {
        this.log.info(`switch ${id} with ${previousId}`);
        this.interactionStore.reset();
        this.observer.publish('swap-request', new SwapModel(previousId, id));
      }
    } else {
      this.log.info(`${id}) selected`);
      this.interactionStore.select(id);
    }
  }

  protected async eventNewGame(grid: Grid) {
    const entries = grid.entries;
    for (const e of entries) {
      await this.createSprite(e, grid.vertical);
    }
  }

  protected async eventSwap(evt: SwapModel) {
    const e1 = this.ctx.getApp().stage.getChildByName(evt.first);
    const e2 = this.ctx.getApp().stage.getChildByName(evt.second);
    if (e1 == null || e2 == null) {
      this.interactionStore.reset();
      throw Error(`Element not found`);
    }
    const x = e1.x;
    const y = e1.y;
    e1.x = e2.x;
    e1.y = e2.y;
    e2.x = x;
    e2.y = y;
    this.log.debug('swap done', evt);
  }
}
