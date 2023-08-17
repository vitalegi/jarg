import { IPixiAppWrapper } from './pixi/pixi-app.ts';

export default class Game {
  app: IPixiAppWrapper;

  constructor(app: IPixiAppWrapper) {
    this.app = app;
  }

  public getView(): HTMLCanvasElement {
    return this.app.getView();
  }

  public async init() {
    this.app.initApp();
    const texture = await this.app.assets().load('image.png');

    // This creates a texture from a 'bunny.png' image
    const bunny = this.app.createSprite(texture);
    // Setup the position of the bunny
    const w = this.app.renderer().width();
    bunny.setX(w / 2);
    const h = this.app.renderer().height();
    bunny.setY(h / 2);

    // Rotate around the center
    bunny.setAnchorX(0.5);
    bunny.setAnchorY(0.5);

    // Add the bunny to the scene we are building
    this.app.stage().addChild(bunny);

    // Listen for frame updates
    this.app.ticker().add(() => {
      // each frame we spin the bunny around a bit
      bunny.setRotation(bunny.getRotation() + 0.01);
    });
  }
}
