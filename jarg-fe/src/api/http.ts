export default class Http {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getJson(path: string): Promise<unknown> {
    const response = await this.get(path);
    return await response.json();
  }

  async get(path: string): Promise<Response> {
    const response = await fetch(this.baseUrl + path, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'origin'
    });
    this.validate(response);
    return response;
  }
  async post<E>(path: string, body: E, headers: Record<string, string> = { 'Content-Type': 'application/json' }): Promise<Response> {
    const response = await fetch(this.baseUrl + path, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: headers,
      redirect: 'follow',
      referrerPolicy: 'origin',
      body: JSON.stringify(body)
    });
    this.validate(response);
    return response;
  }

  validate(response: Response): void {
    if (response.status >= 400) {
      throw Error(`Received error ${response.status}`);
    }
  }
}
