import Logger from '../../../logging/logger';
import { Persona } from '../../core/models/persona';
import Fonts from '../styles/fonts';
import SceneElement from './scene-element';
import { Container, DisplayObject, Text } from 'pixi.js';
import { Button, List, ScrollBox } from '@pixi/ui';
import ApplicationContext from '../application-context';
import { SortBy, SortOrder } from '../../core/models/ui/sorting';
import ScreenData from '../devices/screen';
import PersonaSheetCompact from './persona-sheet-compact';
import PixiNames from '../pixi-names';

export default class PersonaeCatalogueMenu extends SceneElement {
  log = Logger.getInstance('PersonaeCatalogueMenu');

  personae: Array<Persona>;
  scrollBox?: ScrollBox;

  sortBy?: SortBy;
  sortOrder?: SortOrder;

  public constructor(container: Container, ctx: ApplicationContext, personae: Persona[]) {
    super(container, ctx);
    this.personae = personae;
  }

  public async start() {
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
    this.container.addChild(options);

    this.scrollBox = new ScrollBox({
      elementsMargin: 20,
      width: ScreenData.width() - 2 * marginLR,
      height: ScreenData.height() - 2 * marginTB,
      type: 'vertical'
    });
    this.scrollBox.x = marginLR;
    this.scrollBox.y = marginTB;

    this.addEntries(this.scrollBox, this.personae);
    this.container.addChild(this.scrollBox);
  }

  public tick(time: number) {}

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
