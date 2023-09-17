import { asNumber, asString } from '../../util/converter-utils';

export class Race {
  id = 0;
  name = '';

  public static parse(value: unknown): Race {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new Race();
    if ('id' in value) {
      out.id = asNumber(value.id);
    }
    if ('name' in value) {
      out.name = asString(value.name);
    }
    return out;
  }
}

export class ClassModel {
  id = 0;
  name = '';

  public static parse(value: unknown): ClassModel {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new ClassModel();
    if ('id' in value) {
      out.id = asNumber(value.id);
    }
    if ('name' in value) {
      out.name = asString(value.name);
    }
    return out;
  }
}

export class PersonaClass {
  def = new ClassModel();
  level = 0;

  public static parse(value: unknown): PersonaClass {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new PersonaClass();
    if ('def' in value) {
      out.def = ClassModel.parse(value.def);
    }
    if ('level' in value) {
      out.level = asNumber(value.level);
    }
    return out;
  }
}

export class BaseStats {
  attack = 0;
  defence = 0;
  intelligence = 0;
  resistance = 0;

  public static parse(value: unknown): BaseStats {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new BaseStats();
    if ('attack' in value) {
      out.attack = asNumber(value.attack);
    }
    if ('defence' in value) {
      out.defence = asNumber(value.defence);
    }
    if ('intelligence' in value) {
      out.intelligence = asNumber(value.intelligence);
    }
    if ('resistance' in value) {
      out.resistance = asNumber(value.resistance);
    }
    return out;
  }
}

export class ConsumableStat {
  max = 0;
  current = 0;

  public static parse(value: unknown): ConsumableStat {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new ConsumableStat();
    if ('max' in value) {
      out.max = asNumber(value.max);
    }
    if ('current' in value) {
      out.current = asNumber(value.current);
    }
    return out;
  }
}

export class StatsGrowth {
  hp = 0;
  mp = 0;
  attack = 0;
  defence = 0;
  intelligence = 0;
  resistance = 0;

  public static parse(value: unknown): StatsGrowth {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new StatsGrowth();
    if ('hp' in value) {
      out.hp = asNumber(value.hp);
    }
    if ('mp' in value) {
      out.mp = asNumber(value.mp);
    }
    if ('attack' in value) {
      out.attack = asNumber(value.attack);
    }
    if ('defence' in value) {
      out.defence = asNumber(value.defence);
    }
    if ('intelligence' in value) {
      out.intelligence = asNumber(value.intelligence);
    }
    if ('resistance' in value) {
      out.resistance = asNumber(value.resistance);
    }
    return out;
  }
}

export class Skill {
  id = 0;
  name = '';

  public static parse(value: unknown): Skill {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new Skill();
    if ('id' in value) {
      out.id = asNumber(value.id);
    }
    if ('name' in value) {
      out.name = asString(value.name);
    }
    return out;
  }
}

export class Persona {
  id = '';
  name = '';
  skin = '';
  level = 0;
  race = new Race();
  classes = new Array<PersonaClass>();
  exp = 0;
  baseStats = new BaseStats();
  hp = new ConsumableStat();
  mp = new ConsumableStat();
  statsGrowth = new StatsGrowth();
  skills = new Array<Skill>();

  public static parse(value: unknown): Persona {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new Persona();
    if ('id' in value) {
      out.id = asString(value.id);
    }
    if ('name' in value) {
      out.name = asString(value.name);
    }
    if ('skin' in value) {
      out.skin = asString(value.skin);
    }
    if ('level' in value) {
      out.level = asNumber(value.level);
    }
    if ('race' in value) {
      out.race = Race.parse(value.race);
    }
    if ('classes' in value && Array.isArray(value.classes)) {
      out.classes = value.classes.map(PersonaClass.parse);
    }
    if ('exp' in value) {
      out.exp = asNumber(value.exp);
    }
    if ('baseStats' in value) {
      out.baseStats = BaseStats.parse(value.baseStats);
    }
    if ('hp' in value) {
      out.hp = ConsumableStat.parse(value.hp);
    }
    if ('mp' in value) {
      out.mp = ConsumableStat.parse(value.mp);
    }
    if ('statsGrowth' in value) {
      out.statsGrowth = StatsGrowth.parse(value.statsGrowth);
    }
    if ('skills' in value && Array.isArray(value.skills)) {
      out.skills = value.skills.map(Skill.parse);
    }

    return out;
  }
}
