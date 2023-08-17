import { vi } from 'vitest';
import {
  IAssetsWrapper,
  IContainerWrappper,
  IDisplayObjectWrapper,
  IPixiAppWrapper,
  IRendererWrapper,
  ISpriteWrapper,
  ITextureWrapper,
  ITicker
} from './pixi-app';

export class DisplayObjectWrapperMock implements IDisplayObjectWrapper {}

export class ContainerWrapperMock implements IContainerWrappper {
  addChild = vi.fn();
}

export class TextureWrapperMock implements ITextureWrapper {}

export class SpriteWrapperMock implements ISpriteWrapper {
  setX = vi.fn();
  setY = vi.fn();
  setAnchorX = vi.fn();
  setAnchorY = vi.fn();
  setRotation = vi.fn();
  getRotation = vi.fn();
}

export class RendererWrapperMock implements IRendererWrapper {
  width = vi.fn();
  height = vi.fn();
}

export class AssetsWrapperMock implements IAssetsWrapper {
  load = vi.fn();
}

export class TickerMock implements ITicker {
  add = vi.fn();
}

export class PixiAppWrapperMock implements IPixiAppWrapper {
  assetsMock = new AssetsWrapperMock();
  rendererMock = new RendererWrapperMock();

  initApp = vi.fn();
  getApp = vi.fn();
  getView = vi.fn();
  assets = () => this.assetsMock;
  createSprite = vi.fn();
  renderer = () => this.rendererMock;
  stage = vi.fn();
  ticker = vi.fn();
}
