import Logger from '../../../logging/logger';
import { Persona } from '../../core/models/persona';
import Fonts from '../styles/fonts';
import SceneElement from './scene-element';
import { Container, Text } from 'pixi.js';
import StringUtil from '../../util/string-util';
import SimpleTable from '../components/simple-table';
import ArrayUtil from '../../util/array-util';
import { List } from '@pixi/ui';
import ApplicationContext from '../application-context';

export default class PersonaSheetCompact extends SceneElement {
  log = Logger.getInstance('PersonaSheetCompact');

  persona: Persona;
  addToContainer?: (content: Container) => void;
  namingFn: (persona: Persona) => string;

  public constructor(container: Container, ctx: ApplicationContext, persona: Persona, namingFn: (persona: Persona) => string) {
    super(container, ctx);
    this.persona = persona;
    this.namingFn = namingFn;
  }

  public async start() {
    const content = await this.entry(this.persona);
    if (this.addToContainer) {
      this.addToContainer(content);
    } else {
      this.container.addChild(content);
    }
  }

  public tick(time: number) {}

  protected async entry(persona: Persona): Promise<Container> {
    const entry = new Container();
    entry.name = this.namingFn(persona);
    const col1 = new List({ type: 'vertical' });
    col1.x = 90;
    const col2 = new List({ type: 'vertical' });
    col2.x = 300;
    try {
      const animation = await this.ctx.getAssetLoader().loadAnimatedSprite(persona.skin);
      animation.width = 80;
      animation.play();
      entry.addChild(animation);
    } catch (e) {
      this.log.error(`Error while loading animation for ${persona.id}`, e);
    }

    col1.addChild(this.text(persona.name));
    col1.addChild(this.text('Lv. ' + StringUtil.formatInt(persona.level)));
    col1.addChild(this.textSmall(persona.race.name));
    col1.addChild(
      this.textSmall(
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
