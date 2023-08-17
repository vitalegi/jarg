export default class Logger {
  name = '';
  static getInstance(name: string): Logger {
    const log = new Logger();
    log.name = name;
    return log;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info(str: string, ...params: any[]): void {
    // eslint-disable-next-line no-console
    console.log(`${this.name} - ${str}`, params);
  }
  error(str: string, e: Error): void {
    // eslint-disable-next-line no-console
    console.error(`${this.name} - ${str}`, e);
  }
}
