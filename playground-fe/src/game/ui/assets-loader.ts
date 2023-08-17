import { Assets, Resource, Texture } from 'pixi.js';

export default class AssetLoader {
  public async load(url: string): Promise<Texture<Resource>> {
    const asset = await Assets.load(url);
    return asset;
  }
}
