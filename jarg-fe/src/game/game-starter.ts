import { Application } from 'pixi.js';
import GameService from './core/services/game-service';
import Observer from './observers/observer';
import GameCoordinator from './ui/game-coordinator';
import UserService from './core/services/user-service';
import { scene } from './core/models/start-scene';
import GameSceneConstants from './core/constants/game-scene-constants';

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
  observer.publish('scene/start', scene(GameSceneConstants.GAME_ACCESS).build());
}
