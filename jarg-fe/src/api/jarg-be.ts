import User from '../game/core/models/user';
import Logger from '../logging/logger';
import Http from './http';

export class JargBe {
  log = Logger.getInstance('JargBe');
  http: Http;

  constructor() {
    const baseUrl = import.meta.env.VITE_JARG_API;
    this.http = new Http(baseUrl);
  }

  async tokenAccess(username: string, password: string): Promise<void> {
    const basic = 'Basic ' + btoa(`${username}:${password}`);
    await this.http.post(`/token/access`, {}, { 'Content-Type': 'application/json', Authorization: basic });
  }

  async tokenRefresh(): Promise<void> {
    await this.http.post(`/token/refresh`, {});
  }

  async authIdentity(): Promise<User> {
    const response = await this.http.getJson('/auth/identity');
    return User.parse(response);
  }

  async logout(): Promise<void> {
    await this.http.getJson('/auth/logout');
  }
}

const jargBe = new JargBe();
export default jargBe;
