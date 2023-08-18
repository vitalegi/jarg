import { Application } from 'pixi.js';
import Game from './ui/game';
import GridService from './core/services/grid-service';
import GridObserver from './observers/GridObserver';

export default async function setup(element: HTMLDivElement) {
  const app = new Application<HTMLCanvasElement>();
  const game = new Game(app);
  element.appendChild(app.view);

  const observer = new GridObserver();
  const gridService = new GridService();

  game.setObserver(observer);
  gridService.setObserver(observer);

  await game.init();
  gridService.init();

  await game.newGame();
}
