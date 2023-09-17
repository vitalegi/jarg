import { ITextStyle, TextStyle } from 'pixi.js';

export default class Fonts {
  public static button(): TextStyle {
    const text = Fonts._baseFont();
    text.fontSize = 24;
    text.dropShadow = false;
    return new TextStyle(text);
  }

  public static text(): TextStyle {
    const text = Fonts._baseFont();
    text.fontSize = 24;
    return new TextStyle(text);
  }

  public static menuOption(): TextStyle {
    const text = Fonts._baseFont();
    text.fontSize = 32;
    return new TextStyle(text);
  }

  public static textNote(): TextStyle {
    const text = Fonts._baseFont();
    text.fontSize = 12;
    return new TextStyle(text);
  }

  private static _baseFont(): Partial<ITextStyle> {
    return {
      fontFamily: 'monospace',
      fill: ['#dddddd'], // gradient
      stroke: '#222222',
      strokeThickness: 2,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 2,
      wordWrap: true,
      wordWrapWidth: 440,
      lineJoin: 'round'
    };
  }
}
