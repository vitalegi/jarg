export default class ArrayUtil {
  public static max(arr: number[]): number {
    return arr.reduce((prev, curr) => Math.max(prev, curr), 0);
  }
}
