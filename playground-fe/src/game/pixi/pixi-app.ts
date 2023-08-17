export interface IDisplayObjectWrapper {}

export interface IContainerWrappper {
  addChild(child: IDisplayObjectWrapper): void;
}

export interface ITextureWrapper {}

export interface IAnchor {
  x: number;
  y: number;
}

export interface ISpriteWrapper {
  setX(x: number): void;
  setY(y: number): void;
  setAnchorX(x: number): void;
  setAnchorY(y: number): void;
  setRotation(rotation: number): void;
  getRotation(): number;
}

export interface IRendererWrapper {
  width(): number;
  height(): number;
}

export interface IAssetsWrapper {
  load(url: string): Promise<ITextureWrapper>;
}

export interface ITicker {
  add(fn: () => void): void;
}

export interface IPixiAppWrapper {
  initApp(): void;
  getView(): HTMLCanvasElement;
  assets(): IAssetsWrapper;
  createSprite(texture: ITextureWrapper): ISpriteWrapper;
  renderer(): IRendererWrapper;
  stage(): IContainerWrappper;
  ticker(): ITicker;
}
