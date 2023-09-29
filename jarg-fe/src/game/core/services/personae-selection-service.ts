import Logger from '../../../logging/logger';
import { BattleMap } from '../models/battle-map';
import { Persona } from '../models/persona';

export class PersonaeSelectionService {
  log = Logger.getInstance('PersonaeSelectionService');

  availablePersonae: Persona[];
  selectedPersonae: Persona[];
  battleMap: BattleMap;
  onPersonaSelect: (persona: Persona) => Promise<void>;
  onPersonaDeselect: (persona: Persona) => Promise<void>;

  public constructor(
    availablePersonae: Persona[],
    selectedPersonae: Persona[],
    battleMap: BattleMap,
    onPersonaSelect: (persona: Persona) => Promise<void>,
    onPersonaDeselect: (persona: Persona) => Promise<void>
  ) {
    this.availablePersonae = availablePersonae;
    this.selectedPersonae = selectedPersonae;
    this.battleMap = battleMap;
    this.onPersonaSelect = onPersonaSelect;
    this.onPersonaDeselect = onPersonaDeselect;
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
      await this.onPersonaDeselect(persona);
      this.remove(persona);
    } else {
      await this.onPersonaSelect(persona);
      this.add(persona);
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
