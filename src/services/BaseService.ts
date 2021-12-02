abstract class BaseService {
  constructor(protected baseAddress: string) {}

  protected async get(address: string): Promise<Response> {
    return fetch(this.getAddress(address));
  }

  protected async put<T>(address: string, item: T): Promise<Response> {
    return fetch(this.getAddress(address), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
  }

  protected async delete(address: string): Promise<Response> {
    return fetch(this.getAddress(address), { method: 'DELETE' });
  }

  protected getAddress(address: string) {
    return new URL(address, this.baseAddress).href;
  }
}

export default BaseService;
