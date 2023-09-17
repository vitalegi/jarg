import { Button, List } from '@pixi/ui';
import Logger from '../../../logging/logger';
import ScreenData from '../devices/screen';
import Fonts from '../styles/fonts';
import SceneElement from './scene-element';
import { Container, Text } from 'pixi.js';
import ApplicationContext from '../application-context';
import PixiNames from '../pixi-names';

export class OptionFactory {
  public static alwaysEnabled(label: string, onClick: () => Promise<void>): Option {
    return new Option(label, () => true, onClick);
  }

  public static text(label: string): Option {
    return new Option(
      label,
      () => false,
      async () => {}
    );
  }

  public static dynamic(label: string, enabled: () => boolean, onClick: () => Promise<void>): Option {
    return new Option(label, enabled, onClick);
  }
}

export class Option {
  private static _ID = 0;

  readonly id = Option._ID++;
  label: string;
  enabled: () => boolean;
  onClick: () => Promise<void>;

  public constructor(label: string, enabled: () => boolean = () => false, onClick: () => Promise<void> = async () => {}) {
    this.label = label;
    this.enabled = enabled;
    this.onClick = onClick;
  }
}

export default class Menu extends SceneElement {
  log = Logger.getInstance('Menu');

  entries: Array<Option>;

  private _options?: List;
  private _buttons = new Map<string, Button>();

  public constructor(container: Container, ctx: ApplicationContext, ...entries: Array<Option>) {
    super(container, ctx);
    this.entries = entries;
  }

  public start() {
    this._options = new List({ type: 'vertical', elementsMargin: 8 });
    this._options.y = 150;
    for (const e of this.entries) {
      this._options.addChild(this.option(e));
    }
    this.container.addChild(this._options);
  }

  public tick(time: number) {
    if (!this._options) {
      return;
    }
    this._options.x = (ScreenData.width() - this._options.width) / 2;
    this.entries.forEach((e) => {
      const btn = this._buttons.get(PixiNames.menuOption(e));
      if (!btn) {
        return;
      }
      btn.enabled = e.enabled();
    });
  }

  protected option(option: Option): Text {
    const label = new Text(option.label, Fonts.menuOption());
    label.name = PixiNames.menuOption(option);
    const button = new Button(label);
    button.onPress.connect(option.onClick);
    this._buttons.set(PixiNames.menuOption(option), button);
    return label;
  }
}
