import Game from './game';
import { IPixiAppWrapper } from './pixi/pixi-app';

export default async function setup(element: HTMLDivElement, pixiApp: IPixiAppWrapper): Promise<void> {
  const game = new Game(pixiApp);
  await game.init();
  element.appendChild(game.getView());
}
