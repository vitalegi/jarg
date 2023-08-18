/* eslint-disable no-console */
export default class Logger {
  name = '';
  static getInstance(name: string): Logger {
    const log = new Logger();
    log.name = name;
    return log;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug(str: string, ...params: any[]): void {
    if (params && params.length > 0) {
      console.debug(`${this.name} - ${str}`, params);
    } else {
      console.debug(`${this.name} - ${str}`);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info(str: string, ...params: any[]): void {
    if (params && params.length > 0) {
      console.log(`${this.name} - ${str}`, params);
    } else {
      console.log(`${this.name} - ${str}`);
    }
  }
  error(str: string, e?: Error): void {
    if (e) {
      console.error(`${this.name} - ${str}`, e);
    } else {
      console.error(`${this.name} - ${str}`);
    }
  }
}
