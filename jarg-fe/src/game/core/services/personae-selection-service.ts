import jargBe from '../../../api/jarg-be';
import Logger from '../../../logging/logger';
import { BattleMap } from '../models/battle-map';
import { Coordinate } from '../models/coordinate';
import { Persona } from '../models/persona';

export class PersonaeSelectionService {
  log = Logger.getInstance('PersonaeSelectionService');

  availablePersonae: Persona[];
  selectedPersonae: Persona[];
  battleMap: BattleMap;

  public constructor(availablePersonae: Persona[], selectedPersonae: Persona[], battleMap: BattleMap) {
    this.availablePersonae = availablePersonae;
    this.selectedPersonae = selectedPersonae;
    this.battleMap = battleMap;
  }

  public enabled(persona: Persona): boolean {
    if (this.selectedPersonae.length < this.battleMap.battle.playerDisplacementRule.max) {
      // other personae can be selected
      return true;
    }
    if (this.isSelected(persona)) {
      // a persona can be deselected
      return true;
    }
    return false;
  }
  public async onPress(persona: Persona): Promise<void> {
    if (this.isSelected(persona)) {
      this.remove(persona);
    } else {
      this.add(persona);
      const availableCoordinates = await jargBe.battle().getAvailableDisplacements(this.battleMap.battleId);
      const coordinate = availableCoordinates[0];
      const actions = await jargBe.battle().addPlayerPersona(this.battleMap.battleId, persona.id, coordinate);
    }
  }

  protected isSelected(persona: Persona): boolean {
    return this.selectedPersonae.filter((p) => p.id === persona.id).length > 0;
  }

  protected add(persona: Persona): void {
    this.selectedPersonae.push(persona);
  }
  protected remove(persona: Persona): void {
    this.selectedPersonae = this.selectedPersonae.filter((p) => p.id !== persona.id);
  }
}
