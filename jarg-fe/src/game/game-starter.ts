import { Application } from 'pixi.js';
import GameSceneGrid from './ui/game-scene-grid';
import GridService from './core/services/grid-service';
import Observer from './observers/observer';
import GameCoordinator from './ui/game-coordinator';

export default async function setup(element: HTMLDivElement) {
  const app = new Application<HTMLCanvasElement>();
  element.appendChild(app.view);

  const observer = new Observer();
  const gridService = new GridService();
  const gameCoordinator = new GameCoordinator(app);

  gridService.setObserver(observer);
  gameCoordinator.setObserver(observer);

  await gameCoordinator.init();
  await gridService.init();

  const gameScene = new GameSceneGrid();
  await gameCoordinator.startScene(gameScene);
  await gameScene.newGame();
}
