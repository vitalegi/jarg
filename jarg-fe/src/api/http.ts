export default class Http {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getJson(path: string): Promise<unknown> {
    const response = await this.get(path);
    return await response.json();
  }

  async get(path: string, headers: Record<string, string> = { 'Content-Type': 'application/json' }): Promise<Response> {
    const options = this.options();
    options.method = 'GET';
    options.headers = headers;
    const response = await fetch(this.baseUrl + path, options);
    this.validate(response);
    return response;
  }

  async postJson<E>(path: string, body: E, headers: Record<string, string> = { 'Content-Type': 'application/json' }): Promise<unknown> {
    const response = await this.post(path, body, headers);
    return await response.json();
  }

  async post<E>(path: string, body: E, headers: Record<string, string> = { 'Content-Type': 'application/json' }): Promise<Response> {
    const options = this.options();
    options.method = 'POST';
    options.headers = headers;
    options.body = JSON.stringify(body);
    const response = await fetch(this.baseUrl + path, options);
    this.validate(response);
    return response;
  }

  async putJson<E>(path: string, body: E, headers: Record<string, string> = { 'Content-Type': 'application/json' }): Promise<unknown> {
    const response = await this.put(path, body, headers);
    return await response.json();
  }

  async put<E>(path: string, body: E, headers: Record<string, string> = { 'Content-Type': 'application/json' }): Promise<Response> {
    const options = this.options();
    options.method = 'PUT';
    options.headers = headers;
    options.body = JSON.stringify(body);
    const response = await fetch(this.baseUrl + path, options);
    this.validate(response);
    return response;
  }
  validate(response: Response): void {
    if (response.status >= 400) {
      throw Error(`Received error ${response.status}`);
    }
  }

  private options(): RequestInit {
    const options = {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'origin'
    } as RequestInit;
    return options;
  }
}
