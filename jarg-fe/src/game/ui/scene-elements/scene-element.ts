import { Container, Application } from 'pixi.js';

export default class SceneElement {
  private container: Container;
  private app: Application;

  public constructor(container: Container, app: Application) {
    this.container = container;
    this.app = app;
  }

  public start() {}
  public tick(time: number) {}

  protected getContainer(): Container {
    return this.container;
  }
  protected getApp(): Application {
    return this.app;
  }
}
