import {
  Application,
  Assets,
  Container,
  DisplayObject,
  IApplicationOptions,
  ICanvas,
  IRenderer,
  Resource,
  Sprite,
  Texture,
  Ticker
} from 'pixi.js';
import {
  IAssetsWrapper,
  IContainerWrappper,
  IDisplayObjectWrapper,
  IPixiAppWrapper,
  IRendererWrapper,
  ISpriteWrapper,
  ITextureWrapper
} from './pixi-app';

export class DisplayObjectWrapper implements IDisplayObjectWrapper {
  displayObject: DisplayObject;
  constructor(displayObject: DisplayObject) {
    this.displayObject = displayObject;
  }
}

export class ContainerWrapper implements IContainerWrappper {
  container: Container<DisplayObject>;
  constructor(container: Container<DisplayObject>) {
    this.container = container;
  }

  addChild(child: IDisplayObjectWrapper): void {
    this.container.addChild((child as DisplayObjectWrapper).displayObject);
  }
}

export class TextureWrapper implements ITextureWrapper {
  texture: Texture<Resource>;

  constructor(texture: Texture<Resource>) {
    this.texture = texture;
  }
}

export class SpriteWrapper implements ISpriteWrapper {
  sprite: Sprite;

  constructor(textureWrapper: ITextureWrapper) {
    const raw = (textureWrapper as TextureWrapper).texture;
    this.sprite = new Sprite(raw);
  }
  setX(x: number): void {
    this.sprite.x = x;
  }
  setY(y: number): void {
    this.sprite.y = y;
  }
  setAnchorX(x: number): void {
    this.sprite.anchor.x = x;
  }
  setAnchorY(y: number): void {
    this.sprite.anchor.y = y;
  }
  setRotation(rotation: number): void {
    this.sprite.rotation = rotation;
  }
  getRotation(): number {
    return this.sprite.rotation;
  }
}

export class RendererWrapper implements IRendererWrapper {
  _renderer: IRenderer<ICanvas>;

  constructor(app: Application<HTMLCanvasElement>) {
    this._renderer = app.renderer;
  }

  public width(): number {
    return this._renderer.width;
  }
  public height(): number {
    return this._renderer.height;
  }
}

export class AssetsWrapper implements IAssetsWrapper {
  public async load(url: string): Promise<ITextureWrapper> {
    const texture = await Assets.load<Texture>(url);
    return new TextureWrapper(texture);
  }
}

export class PixiAppWrapper implements IPixiAppWrapper {
  private _app?: Application<HTMLCanvasElement>;
  private _renderer?: RendererWrapper;
  private _appOptions: Partial<IApplicationOptions>;
  private _assets?: AssetsWrapper;

  constructor(options: Partial<IApplicationOptions>) {
    this._appOptions = options;
  }

  public initApp(): void {
    this._app = new Application(this._appOptions);
    this._renderer = new RendererWrapper(this._app);
    this._assets = new AssetsWrapper();
  }
  public getApp(): Application<HTMLCanvasElement> {
    if (!this._app) {
      throw Error('App not defined');
    }
    return this._app;
  }

  public getView(): HTMLCanvasElement {
    return this.getApp().view;
  }

  public assets(): AssetsWrapper {
    if (!this._assets) {
      throw Error('Asset not defined');
    }
    return this._assets;
  }

  public createSprite(texture: ITextureWrapper): ISpriteWrapper {
    return new SpriteWrapper(texture);
  }

  public renderer(): RendererWrapper {
    if (!this._renderer) {
      throw Error('Renderer not defined');
    }
    return this._renderer;
  }

  public stage(): Container<DisplayObject> {
    return this.getApp().stage;
  }

  public ticker(): Ticker {
    return this.getApp().ticker;
  }
}

export default function setup(options: Partial<IApplicationOptions>): IPixiAppWrapper {
  return new PixiAppWrapper(options);
}
