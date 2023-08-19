export default class ScreenData {
  public static width(): number {
    return window.innerWidth;
  }
  public static height(): number {
    return window.innerHeight;
  }
  public static isLandscape(): boolean {
    return ScreenData.width() > ScreenData.height();
  }
}
