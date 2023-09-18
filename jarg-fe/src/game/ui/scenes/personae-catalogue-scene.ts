import { Container, DisplayObject, Text } from 'pixi.js';
import Logger from '../../../logging/logger';
import { AbstractGameScene } from './abstract-scene';
import Fonts from '../styles/fonts';
import { Button, List, ScrollBox } from '@pixi/ui';
import GameSceneConstants from '../scene-coordinators/game-scene-constants';
import { Persona } from '../../core/models/persona';
import ApplicationContext from '../application-context';
import ScreenData from '../devices/screen';
import PersonaSheetCompact from '../scene-elements/persona-sheet-compact';
import PixiNames from '../pixi-names';

type SortBy = 'level' | 'name';
type SortOrder = 'asc' | 'desc';

export default class PersonaeCatalogueScene extends AbstractGameScene {
  log = Logger.getInstance('PersonaeCatalogueScene');

  personae: Array<Persona>;
  scrollBox?: ScrollBox;

  sortBy?: SortBy;
  sortOrder?: SortOrder;

  public constructor(ctx: ApplicationContext, personae: Array<Persona>) {
    super(ctx);
    this.personae = personae;
    for (let i = 0; i < this.personae.length; i++) {
      this.personae[i].level = Math.floor(Math.random() * 100);
    }
  }

  name(): string {
    return GameSceneConstants.PERSONA_BUILDER;
  }

  async start() {
    this.withRandomBackground();
    this.withScreenInfo();

    let marginLR = 100;
    let marginTB = 50;
    if (!ScreenData.isLandscape()) {
      marginLR = 5;
      marginTB = 5;
    }

    const options = new List({ type: 'horizontal' });
    options.addChild(
      this.button('Sort by Name', () => {
        if (this.sortBy === 'name') {
          if (this.sortOrder === 'asc') {
            this.sortOrder = 'desc';
          } else {
            this.sortOrder = 'asc';
          }
        } else {
          this.sortBy = 'name';
          this.sortOrder = 'asc';
        }
        this.updatePersonae(this.personae, this.sortBy, this.sortOrder);
      })
    );
    options.addChild(
      this.button('Sort by Lv.', () => {
        if (this.sortBy === 'level') {
          if (this.sortOrder === 'asc') {
            this.sortOrder = 'desc';
          } else {
            this.sortOrder = 'asc';
          }
        } else {
          this.sortBy = 'level';
          this.sortOrder = 'asc';
        }
        this.updatePersonae(this.personae, this.sortBy, this.sortOrder);
      })
    );
    this.getContainer().addChild(options);

    this.scrollBox = new ScrollBox({
      elementsMargin: 20,
      width: ScreenData.width() - 2 * marginLR,
      height: ScreenData.height() - 2 * marginTB,
      type: 'vertical'
    });
    this.scrollBox.x = marginLR;
    this.scrollBox.y = marginTB;

    for (const persona of this.personae) {
      const entry = new PersonaSheetCompact(this.scrollBox, this.ctx, persona, (p) => PixiNames.cataloguePersona(p));
      const scrollBox = this.scrollBox;
      entry.addToContainer = (content) => scrollBox.addItem(content);
      await entry.start();
    }
    this.addEntries(this.scrollBox, this.personae);
    this.getContainer().addChild(this.scrollBox);
  }

  protected async addEntries(scrollBox: ScrollBox, personae: Persona[]): Promise<void> {
    for (const persona of personae) {
      const entry = new PersonaSheetCompact(scrollBox, this.ctx, persona, (p) => PixiNames.cataloguePersona(p));
      entry.addToContainer = (content) => scrollBox.addItem(content);
      await entry.start();
    }
  }

  protected async updatePersonae(personae: Persona[], sortBy: SortBy, order: SortOrder): Promise<void> {
    if (!this.scrollBox) {
      return;
    }
    const sorted = this.sortPersonae(personae, sortBy, order);
    this.scrollBox.removeItems();
    this.addEntries(this.scrollBox, sorted);
  }

  protected sortPersonae(personae: Persona[], sortBy: SortBy, order: SortOrder): Persona[] {
    let sorted = personae;
    if (sortBy === 'name') {
      sorted = sorted.sort((p1, p2) => this.cmpStr(p1.name, p2.name));
    }
    if (sortBy === 'level') {
      sorted = sorted.sort((p1, p2) => p1.level - p2.level);
    }
    if (order === 'desc') {
      sorted = sorted.reverse();
    }
    return sorted;
  }

  protected cmpStr(str1: string, str2: string): number {
    if (str1 === str2) {
      return 0;
    }
    return str1 > str2 ? 1 : -1;
  }

  protected button(text: string, onClick: () => void): Container<DisplayObject> {
    const element = new Text(text, Fonts.text());
    const btn = new Button(element);
    btn.onPress.connect(onClick);
    return element;
  }
}
