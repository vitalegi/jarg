import { Container, Application } from 'pixi.js';
import ApplicationContext from '../application-context';

export default class SceneElement {
  public container: Container;
  public readonly ctx: ApplicationContext;

  public constructor(container: Container, ctx: ApplicationContext) {
    this.container = container;
    this.ctx = ctx;
  }

  public start() {}
  public tick(time: number) {}
}
