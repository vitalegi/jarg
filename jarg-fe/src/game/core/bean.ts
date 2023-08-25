export interface Bean {
  name(): string;
  init(): Promise<void>;
  destroy(): Promise<void>;
}
