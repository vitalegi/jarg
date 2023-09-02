import jargBe from '../../../api/jarg-be';
import Logger from '../../../logging/logger';
import Observer, { ObserverSubscribers } from '../../observers/observer';
import User from '../models/user';

export default class UserService {
  log = Logger.getInstance('UserService');
  private observer: ObserverSubscribers;

  public constructor(observer: Observer) {
    this.observer = new ObserverSubscribers(observer);
  }

  public async destroy() {
    await this.observer.unsubscribeAll();
  }

  public async init(): Promise<void> {}

  public async login(username: string, password: string): Promise<void> {
    await jargBe.tokenAccess(username, password);
  }

  public async isAuthenticated(): Promise<boolean> {
    try {
      await this.getIdentity();
      return true;
    } catch (e) {
      return false;
    }
  }

  public async getIdentity(): Promise<User> {
    return await jargBe.authIdentity();
  }

  public async logout(): Promise<void> {
    await jargBe.logout();
  }
}
