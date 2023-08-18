export interface Bean {
  init(): Promise<void>;
  destroy(): Promise<void>;
}
