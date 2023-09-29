import { BattleMap } from '../models/battle-map';
import { Persona } from '../models/persona';
import { PersonaPlacement } from '../models/persona-placement';

export class BattleActionService {
  public async addPersona(persona: Persona, placement: PersonaPlacement, battleMap: BattleMap): Promise<void> {
    battleMap.battle.personae.push(persona);
    battleMap.battle.placements.push(placement);
  }

  public async removePersona(personaId: string, battleMap: BattleMap): Promise<void> {
    battleMap.battle.personae = battleMap.battle.personae.filter((p) => p.id !== personaId);
    battleMap.battle.placements = battleMap.battle.placements.filter((p) => p.personaId !== personaId);
  }
}

export const battleActionService = new BattleActionService();
