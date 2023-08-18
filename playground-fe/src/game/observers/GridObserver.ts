import Logger from '../../logging/logger';

export type EventType = 'new-game-request' | 'new-game-ready' | 'swap-request' | 'swap-confirmed';

export class Subscriber {
  private static ID = 0;
  readonly id: number;
  name: EventType;
  subscriber: (payload: unknown) => void;
  public constructor(name: EventType, subscriber: (payload: unknown) => void) {
    this.name = name;
    this.subscriber = subscriber;
    this.id = ++Subscriber.ID;
  }
}

export default class GridObserver {
  log = Logger.getInstance('GridObserver');
  subscribers = new Array<Subscriber>();

  public publish(name: EventType, payload: unknown): void {
    this.log.debug(`Emit ${name}`, payload);
    const found = this.subscribers.filter((s) => s.name === name).map((s) => s.subscriber);
    if (found.length === 0) {
      this.log.info(`No subscriber for event ${name}`);
    }
    found.forEach((callback) => callback(payload));
  }

  public subscribe(name: EventType, callback: (payload: unknown) => void): Subscriber {
    const subscriber = new Subscriber(name, callback);
    this.log.debug(`New subscriber ${subscriber.id} on ${name}`);
    this.subscribers.push(subscriber);
    return subscriber;
  }

  public unsubscribe(subscriber: Subscriber): void {
    this.log.info(`Unsubscribe ${subscriber.id} (${subscriber.name})`);
    this.subscribers = this.subscribers.filter((s) => s.id !== subscriber.id);
  }

  public unsubscribeAll(subscribers: Array<Subscriber>): void {
    subscribers.forEach(this.unsubscribe);
  }
}
