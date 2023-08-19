import { Application, FederatedPointerEvent, ICanvas, IRenderer, Resource, Sprite, Texture } from 'pixi.js';
import AssetLoader from '../assets-loader';
import Grid, { GridEntry } from '../../core/models/grid';
import InteractionStore from '../interation-store';
import Observer, { ObserverSubscribers } from '../../observers/observer';
import { createRandom } from '../../core/services/game-initializr';
import { SwapModel } from '../../core/models/observer-models';
import Logger from '../../../logging/logger';
import { GameScene } from './scene';

export default class GameSceneGrid implements GameScene {
  log = Logger.getInstance('Game');

  private observer: ObserverSubscribers;
  private app?: Application;
  private assetLoader? = new AssetLoader();
  private textures = new Map<string, Texture<Resource>>();
  private interactionStore = new InteractionStore();

  public constructor(observer: Observer) {
    this.observer = new ObserverSubscribers(observer);
  }

  public async destroy() {
    await this.observer.unsubscribeAll();
  }

  public async init(): Promise<void> {
    await this.initTextures();
    this.observer.subscribe('new-game-ready', (payload: unknown) => this.eventNewGame(Grid.parse(payload)));
    this.observer.subscribe('swap-confirmed', (payload: unknown) => this.eventSwap(SwapModel.parse(payload)));
  }
  async start() {}

  setApplication(app: Application<ICanvas>): void {
    this.app = app;
  }

  public async newGame() {
    const grid = await createRandom(10, 8);
    this.observer.publish('new-game-request', grid);
  }

  private async initTextures() {
    const blue = await this.getAssetLoader().load('blue.png');
    const red = await this.getAssetLoader().load('red.png');
    const white = await this.getAssetLoader().load('white.png');
    this.textures.set('blue', blue);
    this.textures.set('red', red);
    this.textures.set('white', white);
  }

  public getAssetLoader(): AssetLoader {
    if (!this.assetLoader) {
      throw Error('assetLoader is null');
    }
    return this.assetLoader;
  }

  public getApp(): Application {
    if (!this.app) {
      throw Error('app is null');
    }
    return this.app;
  }

  public getRenderer(): IRenderer<ICanvas> {
    return this.getApp().renderer;
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
    this.getApp().stage.addChild(sprite);
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
    const e1 = this.getApp().stage.getChildByName(evt.first);
    const e2 = this.getApp().stage.getChildByName(evt.second);
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
