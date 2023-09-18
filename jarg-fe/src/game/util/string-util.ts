export default class StringUtil {
  public static format(text: string | number): string {
    if (typeof text === 'number') {
      return StringUtil.formatInt(text);
    } else {
      return text;
    }
  }
  public static formatInt(value: number): string {
    return Intl.NumberFormat('it-IT', { maximumFractionDigits: 0, useGrouping: true }).format(value);
  }
}
