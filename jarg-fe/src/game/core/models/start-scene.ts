import { asString } from '../../util/converter-utils';

export class StartSceneBuilder {
  scene: StartScene;

  public constructor() {
    this.scene = new StartScene();
  }

  public name(name: string): StartSceneBuilder {
    this.scene.name = name;
    return this;
  }

  public value1(value1: string): StartSceneBuilder {
    this.scene.options.value1 = value1;
    return this;
  }

  public build(): StartScene {
    return this.scene;
  }
}

export function scene(name: string): StartSceneBuilder {
  const builder = new StartSceneBuilder();
  builder.name(name);
  return builder;
}

export class StartSceneOptions {
  value1 = '';

  public static parse(value: unknown): StartSceneOptions {
    const out = new StartSceneOptions();
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    if ('value1' in value) {
      out.value1 = asString(value.value1);
    }
    return out;
  }
}

export class StartScene {
  name = '';
  options = new StartSceneOptions();

  public static parse(value: unknown): StartScene {
    if (!value) {
      throw new Error(`invalid element`);
    }
    if (typeof value !== 'object') {
      throw new Error(`invalid element`);
    }
    const out = new StartScene();
    if ('name' in value) {
      out.name = asString(value.name);
    }
    if ('options' in value) {
      out.options = StartSceneOptions.parse(value.options);
    }
    return out;
  }
}
