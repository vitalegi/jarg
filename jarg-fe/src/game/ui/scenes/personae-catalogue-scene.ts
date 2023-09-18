import { Container, Text } from 'pixi.js';
import Logger from '../../../logging/logger';
import { AbstractGameScene } from './abstract-scene';
import Fonts from '../styles/fonts';
import { List, ScrollBox } from '@pixi/ui';
import GameSceneConstants from '../scene-coordinators/game-scene-constants';
import { Persona } from '../../core/models/persona';
import ApplicationContext from '../application-context';
import PixiNames from '../pixi-names';
import ScreenData from '../devices/screen';
import StringUtil from '../../util/string-util';
import SimpleTable from '../components/simple-table';
import ArrayUtil from '../../util/array-util';

export default class PersonaeCatalogueScene extends AbstractGameScene {
  log = Logger.getInstance('PersonaeCatalogueScene');

  personae: Array<Persona>;
  scrollBox?: ScrollBox;

  public constructor(ctx: ApplicationContext, personae: Array<Persona>) {
    super(ctx);
    this.personae = personae;
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

    this.scrollBox = new ScrollBox({
      elementsMargin: 20,
      width: ScreenData.width() - 2 * marginLR,
      height: ScreenData.height() - 2 * marginTB,
      type: 'vertical'
    });
    this.scrollBox.x = marginLR;
    this.scrollBox.y = marginTB;

    for (const persona of this.personae) {
      const entry = await this.entry(persona);
      this.scrollBox.addItem(entry);
    }
    this.getContainer().addChild(this.scrollBox);
  }

  protected async entry(persona: Persona): Promise<Container> {
    const entry = new Container();
    entry.name = PixiNames.cataloguePersona(persona);
    const col1 = new List({ type: 'vertical' });
    const col2 = new List({ type: 'vertical' });
    try {
      const animation = await this.ctx.getAssetLoader().loadAnimatedSprite(persona.skin);
      animation.width = 80;
      animation.play();
      col1.addChild(animation);
    } catch (e) {
      this.log.error(`Error while loading animation for ${persona.id}`, e);
    }

    col1.addChild(this.text(persona.name + '/' + persona.race.name));
    col1.addChild(this.text('Lv. ' + StringUtil.formatInt(persona.level)));
    col1.addChild(
      this.text(
        ArrayUtil.join(
          persona.classes.map((c) => `${c.def.name} (${c.level})`),
          ' | '
        )
      )
    );

    const simpleTable = new SimpleTable();

    simpleTable.addRow(
      this.textSmall('HP'),
      this.textSmall(StringUtil.formatInt(persona.hp.current) + '/' + StringUtil.formatInt(persona.hp.max)),
      this.textSmall('MP'),
      this.textSmall(StringUtil.formatInt(persona.mp.current) + '/' + StringUtil.formatInt(persona.mp.max))
    );

    simpleTable.addRow(
      this.textSmall('ATK'),
      this.textSmall(persona.baseStats.attack),
      this.textSmall('DEF'),
      this.textSmall(persona.baseStats.defence)
    );

    simpleTable.addRow(
      this.textSmall('INT'),
      this.textSmall(persona.baseStats.intelligence),
      this.textSmall('RES'),
      this.textSmall(persona.baseStats.resistance)
    );

    simpleTable.addOption('left');
    simpleTable.addOption('right');
    simpleTable.addOption('left');
    simpleTable.addOption('right');
    const stats = simpleTable.build();
    //stats.y = col1.y + col1.height;
    col2.addChild(stats);
    col2.x = 300;
    entry.addChild(col1);
    entry.addChild(col2);
    //entry.addChild(stats);
    return entry;
  }

  protected text(text: string | number): Text {
    return new Text(StringUtil.format(text), Fonts.text());
  }

  protected textSmall(text: string | number): Text {
    return new Text(StringUtil.format(text), Fonts.textSmall());
  }
}
