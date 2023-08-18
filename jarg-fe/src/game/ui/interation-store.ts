export default class InteractionStore {
  private id?: string;

  public select(id: string): void {
    this.id = id;
  }

  public reset(): void {
    this.id = undefined;
  }

  public getSelected(): string {
    if (!this.id) {
      throw Error(`No active selection`);
    }
    return this.id;
  }

  public isSelected(): boolean {
    return this.id !== undefined;
  }
}
