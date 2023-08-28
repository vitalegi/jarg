import CollectionIndex from './collection-index';

export default class AssetIndex {
  collections = new Array<CollectionIndex>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static parse(value: any): AssetIndex {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new AssetIndex();
    if (value.collections) {
      out.collections = value.collections.map(CollectionIndex.parse);
    }
    return out;
  }
}
