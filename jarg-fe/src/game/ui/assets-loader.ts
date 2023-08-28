import { AnimatedSprite, Assets, BaseTexture, Resource, Spritesheet, Texture } from 'pixi.js';
import Http from '../../api/http';
import Logger from '../../logging/logger';
import AssetIndex from '../core/models/ui/asset-index';
import CollectionIndex from '../core/models/ui/collection-index';

const cache = new Map<string, unknown>();
const spritesheetCache = new Map<string, Spritesheet>();

export default class AssetLoader {
  http = new Http();
  log = Logger.getInstance('AssetLoader');

  public async load(url: string): Promise<Texture<Resource>> {
    const asset = await Assets.load(url);
    return asset;
  }

  public async loadAnimatedSprite(name: string): Promise<AnimatedSprite> {
    const collection = await this.getAnimationCollection(name);
    const spritesheet = await this.loadSpritesheet(collection);
    const animation = new AnimatedSprite(spritesheet.animations[name]);
    animation.animationSpeed = 0.1666;
    return animation;
  }

  public async getAnimationNames(): Promise<string[]> {
    const index = await this.getAssetIndex();
    return index.collections.flatMap((collection) => collection.animations);
  }

  public async loadSpritesheet(collection: CollectionIndex): Promise<Spritesheet> {
    const cached = spritesheetCache.get(collection.url);
    if (cached !== undefined) {
      this.log.debug(`Spritesheet ${collection.url} cached`);
      return cached;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = (await this.getCacheable(collection.url)) as any;
    const spritesheet = new Spritesheet(BaseTexture.from(payload.meta.image), payload);
    await spritesheet.parse();
    spritesheetCache.set(collection.url, spritesheet);
    this.log.debug(`Put in cache spritesheet ${collection.url}`);
    return spritesheet;
  }

  protected async getAnimationCollection(name: string): Promise<CollectionIndex> {
    const index = await this.getAssetIndex();
    const collections = index.collections.filter((c) => c.animations.indexOf(name) !== -1);
    if (collections.length === 0) {
      throw Error(`Can't find animation ${name}`);
    }
    if (collections.length > 1) {
      throw Error(`Data error, ${collections.length} collections with ${name}`);
    }
    const url = collections[0].url;
    this.log.debug(`Animation ${name}'s source is ${url}`);
    return collections[0];
  }

  protected async getAssetIndex(): Promise<AssetIndex> {
    const value = await this.getCacheable('/assets/characters/characters_001.json');
    return AssetIndex.parse(value);
  }

  protected async getCacheable(url: string): Promise<unknown> {
    if (cache.has(url)) {
      this.log.debug(`Resource ${url} already available.`);
      return cache.get(url);
    }
    const data = await this.http.get(url);
    this.log.debug(`Put in cache ${url}`);
    cache.set(url, data);
    return data;
  }
}
