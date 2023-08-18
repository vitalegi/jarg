/* eslint-disable @typescript-eslint/no-explicit-any */
import Logger from '../../logging/logger';
import { uniqueId } from '../util/id-utils';

export type EventType = 'new-game-request' | 'new-game-ready' | 'swap-request' | 'swap-confirmed';

export class Subscriber {
  readonly id: number;
  name: EventType;
  subscriber: (payload: any) => void;
  public constructor(name: EventType, subscriber: (payload: any) => void) {
    this.name = name;
    this.subscriber = subscriber;
    this.id = uniqueId();
  }
}

export default class Observer {
  log = Logger.getInstance('Observer');
  subscribers = new Array<Subscriber>();

  public publish(name: EventType, payload: any): void {
    this.log.debug(`Emit ${name}`, payload);
    const found = this.subscribers.filter((s) => s.name === name).map((s) => s.subscriber);
    if (found.length === 0) {
      this.log.info(`No subscriber for event ${name}`);
    }
    found.forEach((callback) => callback(payload));
  }

  public subscribe(name: EventType, callback: (payload: any) => void): Subscriber {
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
