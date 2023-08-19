import Logger from '../../../logging/logger';
import Observer, { ObserverSubscribers } from '../../observers/observer';
import User from '../models/user';

export default class UserService {
  log = Logger.getInstance('UserService');
  private user?: User = undefined;
  private observer: ObserverSubscribers;

  public constructor(observer: Observer) {
    this.observer = new ObserverSubscribers(observer);
  }

  public async destroy() {
    await this.observer.unsubscribeAll();
  }
  public async init(): Promise<void> {}

  public async login(user: User) {
    this.user = user;
    this.user.authenticated = true;
  }

  public async isAuthenticated(): Promise<boolean> {
    if (this.user !== undefined) {
      return this.user.authenticated;
    }
    return false;
  }

  public async logout() {
    this.user = undefined;
  }
}
