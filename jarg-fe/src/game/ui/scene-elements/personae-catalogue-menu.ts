import Logger from '../../../logging/logger';
import { Persona } from '../../core/models/persona';
import Fonts from '../styles/fonts';
import SceneElement from './scene-element';
import { Container, DisplayObject, Text } from 'pixi.js';
import { Button, List, ScrollBox } from '@pixi/ui';
import ApplicationContext from '../application-context';
import { SortBy, SortOrder } from '../../core/models/ui/sorting';
import ScreenData from '../devices/screen';
import PersonaSheetCompactSelectable from './persona-sheet-compact-selectable';
import { PersonaeSelectionService } from '../../core/services/personae-selection-service';

export default class PersonaeCatalogueMenu extends SceneElement {
  log = Logger.getInstance('PersonaeCatalogueMenu');

  scrollBox?: ScrollBox;

  sortBy?: SortBy;
  sortOrder?: SortOrder;
  namingFn: (persona: Persona) => string;
  selectionManager: PersonaeSelectionService;
  _children = new Array<PersonaSheetCompactSelectable>();

  public constructor(
    container: Container,
    ctx: ApplicationContext,
    namingFn: (persona: Persona) => string,
    selectionManager: PersonaeSelectionService
  ) {
    super(container, ctx);
    this.namingFn = namingFn;
    this.selectionManager = selectionManager;
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
        this.updatePersonae(this.sortBy, this.sortOrder);
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
        this.updatePersonae(this.sortBy, this.sortOrder);
      })
    );
    this.container.addChild(options);

    this.scrollBox = new ScrollBox({
      elementsMargin: 20,
      width: 500,
      height: ScreenData.height() - 2 * marginTB,
      type: 'vertical'
    });
    this.scrollBox.x = marginLR;
    this.scrollBox.y = marginTB;

    this.addEntries(this.scrollBox, this.selectionManager.availablePersonae);
    this.container.addChild(this.scrollBox);
  }

  public tick(time: number) {
    this._children.forEach((entry) => entry.tick(time));
  }

  protected async addEntries(scrollBox: ScrollBox, personae: Persona[]): Promise<void> {
    this._children = new Array<PersonaSheetCompactSelectable>();
    for (const persona of personae) {
      await this.addEntry(scrollBox, persona);
    }
  }

  protected async addEntry(scrollBox: ScrollBox, persona: Persona): Promise<void> {
    const entry = new PersonaSheetCompactSelectable(
      scrollBox,
      this.ctx,
      persona,
      this.namingFn,
      (p) => this.selectionManager.enabled(p),
      (p) => this.selectionManager.onPress(p)
    );
    entry.addToContainer = (content) => scrollBox.addItem(content);
    await entry.start();
    this._children.push(entry);
  }

  protected async updatePersonae(sortBy: SortBy, order: SortOrder): Promise<void> {
    if (!this.scrollBox) {
      return;
    }
    const sorted = this.sortPersonae(sortBy, order);
    this.scrollBox.removeItems();
    this.addEntries(this.scrollBox, sorted);
  }

  protected sortPersonae(sortBy: SortBy, order: SortOrder): Persona[] {
    let sorted = this.selectionManager.availablePersonae;
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
