import { PersonaPlacement } from './persona-placement';

export interface BattleAction {}

export class AddPersona implements BattleAction {
  personaPlacement: PersonaPlacement = new PersonaPlacement();

  public static parse(value: unknown): AddPersona {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new AddPersona();
    if ('personaPlacement' in value) {
      out.personaPlacement = PersonaPlacement.parse(value.personaPlacement);
    }
    return out;
  }
}

export const parseBattleAction = (value: unknown): BattleAction => {
  if (!value) {
    throw new Error(`invalid element`);
  }
  if (typeof value !== 'object') {
    throw new Error(`invalid element`);
  }
  if (!('type' in value)) {
    throw new Error(`Missing property "type"`);
  }
  switch (value.type) {
    case 'add-persona':
      return AddPersona.parse(value);
  }
  throw Error(`Missing processor for type ${value.type}`);
};

export const parseBattleActions = (value: unknown): BattleAction[] => {
  if (!value) {
    throw new Error(`invalid element`);
  }
  if (!Array.isArray(value)) {
    throw new Error(`element is not an array`);
  }
  return value.map((v) => parseBattleAction(v));
};

export class BattleActionUtil {
  public static toAddPersona(action: BattleAction): AddPersona {
    if (action instanceof AddPersona) {
      return action;
    }
    throw Error(`Action is not of type AddPersona, ${action}`);
  }
}
