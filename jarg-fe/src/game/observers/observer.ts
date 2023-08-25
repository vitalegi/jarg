/* eslint-disable @typescript-eslint/no-explicit-any */
import Logger from '../../logging/logger';
import { uniqueId } from '../util/id-utils';

export class Subscriber {
  readonly id: number;
  name: string;
  subscriber: (payload: any) => void;

  public constructor(name: string, subscriber: (payload: any) => void) {
    this.name = name;
    this.subscriber = subscriber;
    this.id = uniqueId();
  }
}

export default class Observer {
  log = Logger.getInstance('Observer');
  subscribers = new Array<Subscriber>();

  public publish(name: string, payload: any): void {
    this.log.debug(`Emit ${name}`, payload);
    const found = this.subscribers.filter((s) => s.name === name).map((s) => s.subscriber);
    if (found.length === 0) {
      this.log.info(`No subscriber for event ${name}`);
    }
    found.forEach((callback) => callback(payload));
  }

  public subscribe(name: string, callback: (payload: any) => void): Subscriber {
    const subscriber = new Subscriber(name, callback);
    this.log.info(`New subscriber ${subscriber.id} on ${name}`);
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

export class ObserverSubscribers {
  public observer: Observer;
  private subscribers = new Array<Subscriber>();

  public constructor(observer: Observer) {
    this.observer = observer;
  }

  public subscribe(name: string, callback: (payload: unknown) => void): Subscriber {
    const subscriber = this.observer.subscribe(name, callback);
    this.subscribers.push(subscriber);
    return subscriber;
  }

  public async unsubscribeAll() {
    this.observer.unsubscribeAll(this.subscribers);
  }

  public publish(name: string, payload: any): void {
    this.observer.publish(name, payload);
  }
}
