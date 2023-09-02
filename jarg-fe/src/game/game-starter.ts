import { Application } from 'pixi.js';
import GameService from './core/services/game-service';
import Observer from './observers/observer';
import GameCoordinator from './ui/game-coordinator';
import UserService from './core/services/user-service';
import { scene } from './core/models/start-scene';
import GameSceneConstants from './core/constants/game-scene-constants';
import ApplicationContext from './ui/application-context';

export default async function setup(element: HTMLDivElement, window: Window) {
  const app = new Application<HTMLCanvasElement>({ resizeTo: window });
  element.appendChild(app.view);
  const observer = new Observer();
  const ctx = new ApplicationContext(observer);
  ctx.setApp(app);

  const gameService = new GameService(observer);
  await gameService.init();

  const userService = new UserService(observer);
  await userService.init();
  ctx.setUserService(userService);

  const gameCoordinator = new GameCoordinator(ctx);
  await gameCoordinator.init();
  observer.publish('scene/start', scene(GameSceneConstants.WELCOME).build());
}
