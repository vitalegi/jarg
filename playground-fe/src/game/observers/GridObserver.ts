import Logger from '../../logging/logger';

type EventType = 'new-game-request' | 'new-game-ready' | 'swap-request' | 'swap-confirmed';

class Subscriber {
  name: EventType;
  subscriber: (payload: unknown) => void;
  public constructor(name: EventType, subscriber: (payload: unknown) => void) {
    this.name = name;
    this.subscriber = subscriber;
  }
}

export default class GridObserver {
  log = Logger.getInstance('GridObserver');
  subscribers = new Array<Subscriber>();

  public publish(name: EventType, payload: unknown): void {
    this.log.info(`Emit ${name}`, payload);
    this.subscribers
      .filter((s) => s.name === name)
      .map((s) => s.subscriber)
      .forEach((callback) => callback(payload));
  }

  public subscribe(name: EventType, callback: (payload: unknown) => void): void {
    this.subscribers.push(new Subscriber(name, callback));
  }
}
