import { Application } from 'pixi.js';
import GameSceneGrid from './ui/scenes/game-scene-grid';
import GameService from './core/services/game-service';
import Observer from './observers/observer';
import GameCoordinator from './ui/game-coordinator';
import UserService from './core/services/user-service';
import GameAccessScene from './ui/scenes/game-access-scene';

export default async function setup(element: HTMLDivElement, window: Window) {
  const app = new Application<HTMLCanvasElement>({ resizeTo: window });
  element.appendChild(app.view);

  const observer = new Observer();

  const gameService = new GameService(observer);
  await gameService.init();

  const userService = new UserService(observer);
  await userService.isAuthenticated();

  const gameCoordinator = new GameCoordinator(app, observer);
  await gameCoordinator.init();

  const gameScene = new GameAccessScene(observer);
  await gameScene.init();
  await gameCoordinator.startScene(gameScene);
  await gameScene.start();
}
