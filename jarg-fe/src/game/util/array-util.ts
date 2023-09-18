export default class ArrayUtil {
  public static max(arr: number[]): number {
    return arr.reduce((prev, curr) => Math.max(prev, curr), 0);
  }
  public static join(arr: string[], separator: string): string {
    let str = '';
    for (let i = 0; i < arr.length; i++) {
      if (i > 0) {
        str += separator;
      }
      str += arr[i];
    }
    return str;
  }
}
