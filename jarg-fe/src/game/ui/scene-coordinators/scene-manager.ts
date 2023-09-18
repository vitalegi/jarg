import GameSceneConstants from './game-scene-constants';
import { Publisher } from '../../observers/observer';
import { asString } from '../../util/converter-utils';
import ApplicationContext from '../application-context';
import { AbstractGameScene } from '../scenes/abstract-scene';
import BattleMapScene from '../scenes/battle-map-scene';
import BouncingScene from '../scenes/bouncing-scene';
import GameAccessScene from '../scenes/game-access-scene';
import LoginScene from '../scenes/login-scene';
import PersonaBuilderScene from '../scenes/persona-builder-scene';
import PersonaeCatalogueScene from '../scenes/personae-catalogue-scene';
import { Persona } from '../../core/models/persona';

export default class SceneManager {
  public static createScene(ctx: ApplicationContext, sceneSchema: unknown): AbstractGameScene {
    if (!sceneSchema) {
      throw new Error(`invalid element`);
    }
    if (typeof sceneSchema !== 'object') {
      throw new Error(`invalid element`);
    }
    if (!('name' in sceneSchema)) {
      throw Error(`Attribute name is missing in ${sceneSchema}`);
    }
    const name = asString(sceneSchema.name);
    switch (name) {
      case GameSceneConstants.BATTLE_MAP:
        return new BattleMapScene(ctx);
    }
    if (name === GameSceneConstants.BATTLE_MAP) {
      return new BattleMapScene(ctx);
    }
    if (name === GameSceneConstants.GAME_ACCESS) {
      return new GameAccessScene(ctx);
    }
    if (name === GameSceneConstants.BOUNCING) {
      return new BouncingScene(ctx);
    }
    if (name === GameSceneConstants.LOGIN) {
      return new LoginScene(ctx);
    }
    if (name === GameSceneConstants.PERSONA_BUILDER) {
      return new PersonaBuilderScene(ctx);
    }
    if (name === GameSceneConstants.PERSONAE_CATALOGUE) {
      let personae = new Array<Persona>();
      if ('personae' in sceneSchema && Array.isArray(sceneSchema.personae)) {
        personae = sceneSchema.personae.map(Persona.parse);
      }
      return new PersonaeCatalogueScene(ctx, personae);
    }
    throw Error(`Scene ${name} is unknown`);
  }

  public static async startPersonaBuilder(publisher: Publisher) {
    SceneManager.startScene(publisher, { name: GameSceneConstants.PERSONA_BUILDER });
  }
  public static async startPersonaeCatalogue(publisher: Publisher, personae: Array<Persona>) {
    SceneManager.startScene(publisher, { name: GameSceneConstants.PERSONAE_CATALOGUE, personae: personae });
  }
  public static async startGameAccess(publisher: Publisher) {
    SceneManager.startScene(publisher, { name: GameSceneConstants.GAME_ACCESS });
  }
  public static async startLogin(publisher: Publisher) {
    SceneManager.startScene(publisher, { name: GameSceneConstants.LOGIN });
  }
  public static async startBattle(publisher: Publisher) {
    SceneManager.startScene(publisher, { name: GameSceneConstants.BATTLE_MAP });
  }
  public static async startBouncing(publisher: Publisher) {
    SceneManager.startScene(publisher, { name: GameSceneConstants.BOUNCING });
  }

  private static async startScene(publisher: Publisher, payload: unknown): Promise<void> {
    publisher.publish('scene/start', payload);
  }
}
