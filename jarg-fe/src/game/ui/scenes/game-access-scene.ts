import Logger from '../../../logging/logger';
import { AbstractGameScene } from './abstract-scene';
import GameSceneConstants from '../scene-coordinators/game-scene-constants';
import SceneManager from '../scene-coordinators/scene-manager';
import { OptionFactory } from '../scene-elements/menu';
import jargBe from '../../../api/jarg-be';

export default class GameAccessScene extends AbstractGameScene {
  log = Logger.getInstance('GameAccessScene');

  name(): string {
    return GameSceneConstants.GAME_ACCESS;
  }

  async start() {
    this.withRandomBackground();
    this.withScreenInfo();

    this.withMenu(
      OptionFactory.text('Hello, adventurer'),
      OptionFactory.alwaysEnabled('New Persona', () => SceneManager.startPersonaBuilder(this.observer)),
      OptionFactory.alwaysEnabled('Personae', () => this.personaeCatalogue()),
      OptionFactory.alwaysEnabled('Battle!', () => SceneManager.startBattle(this.observer)),
      OptionFactory.alwaysEnabled('Bouncer', () => SceneManager.startBouncing(this.observer))
    );

    let animation = await this.ctx.getAssetLoader().loadAnimatedSprite('arcanine');
    animation.play();
    this.getContainer().addChild(animation);

    animation = await this.ctx.getAssetLoader().loadAnimatedSprite('abra');
    animation.x = 200;
    animation.play();
    this.getContainer().addChild(animation);

    this.addTicker((time: number) => {});
  }

  protected async personaeCatalogue(): Promise<void> {
    const personae = await jargBe.persona().getMyPersonae();
    SceneManager.startPersonaeCatalogue(this.observer, personae);
  }
}
