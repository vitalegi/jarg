import Logger from '../../../logging/logger';
import { Persona } from '../../core/models/persona';
import { Container } from 'pixi.js';
import { Button } from '@pixi/ui';
import ApplicationContext from '../application-context';
import PersonaSheetCompact from './persona-sheet-compact';

export default class PersonaSheetCompactSelectable extends PersonaSheetCompact {
  log = Logger.getInstance('PersonaSheetCompactSelectable');

  enabled: (persona: Persona) => boolean;
  onPress: (persona: Persona) => Promise<void>;
  button?: Button;

  public constructor(
    container: Container,
    ctx: ApplicationContext,
    persona: Persona,
    namingFn: (persona: Persona) => string,
    enabled: (persona: Persona) => boolean,
    onPress: (persona: Persona) => Promise<void>
  ) {
    super(container, ctx, persona, namingFn);
    this.onPress = onPress;
    this.enabled = enabled;
  }

  protected async entry(persona: Persona): Promise<Container> {
    const entry = await super.entry(persona);
    const onPress = this.onPress;
    if (onPress) {
      this.button = new Button(entry);
      this.button.onPress.connect(() => onPress(this.persona));
    }
    return entry;
  }

  public tick(time: number) {
    if (!this.button) {
      return;
    }
    const expected = this.enabled(this.persona);
    const actual = this.button.enabled;
    if (actual !== expected) {
      this.button.enabled = expected;
    }
  }
}
