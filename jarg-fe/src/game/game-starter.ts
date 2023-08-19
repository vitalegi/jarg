import { Application } from 'pixi.js';
import GameSceneGrid from './ui/scenes/game-scene-grid';
import GameService from './core/services/game-service';
import Observer from './observers/observer';
import GameCoordinator from './ui/game-coordinator';
import UserService from './core/services/user-service';

export default async function setup(element: HTMLDivElement) {
  const app = new Application<HTMLCanvasElement>();
  element.appendChild(app.view);

  const observer = new Observer();
  const gameService = new GameService(observer);
  const userService = new UserService(observer);
  const gameCoordinator = new GameCoordinator(app, observer);

  await gameCoordinator.init();
  await gameService.init();
  await userService.isAuthenticated();

  const gameScene = new GameSceneGrid(observer);
  await gameCoordinator.startScene(gameScene);
  await gameScene.newGame();
}
