import { vi, expect, test, describe, beforeEach, afterEach } from 'vitest';
import {
  ContainerWrapperMock,
  PixiAppWrapperMock,
  SpriteWrapperMock,
  TextureWrapperMock,
  TickerMock
} from './pixi/pixi-app-wrapper.mock.ts';
import Game from './game.ts';

describe('Game starter ', () => {
  beforeEach(() => {});

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('A game is correctly appended to the dom', async () => {
    const app = new PixiAppWrapperMock();
    const texture = new TextureWrapperMock();
    vi.spyOn(app.assetsMock, 'load').mockResolvedValue(texture);
    const sprite = new SpriteWrapperMock();
    vi.spyOn(app, 'createSprite').mockResolvedValue(sprite);
    vi.spyOn(app.rendererMock, 'width').mockReturnValue(800);
    vi.spyOn(app.rendererMock, 'height').mockReturnValue(600);
    const stage = new ContainerWrapperMock();
    vi.spyOn(app, 'stage').mockReturnValue(stage);
    const ticker = new TickerMock();
    vi.spyOn(app, 'ticker').mockReturnValue(ticker);

    const game = new Game(app);
    game.init();
    expect(app.initApp).toHaveBeenCalledOnce();
  });
});
