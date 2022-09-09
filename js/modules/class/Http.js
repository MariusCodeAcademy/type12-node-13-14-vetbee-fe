/* eslint-disable max-classes-per-file */
export default class Http {
  static baseUrl = 'http://localhost:3000/api/v1';

  static async getAll(url) {
    try {
      const resp = await fetch(`${Http.baseUrl}${url}`);
      if (!resp.ok) {
        throw new Error(
          `fetch fail: ${resp.status} ${resp.statusText} trying to fetch ${resp.url}`
        );
      }
      const dataInJs = await resp.json();
      console.log('http:', dataInJs);
      return dataInJs;
    } catch (error) {
      console.warn('klaida http ', error.message);
      console.warn('error.stack ', error.stack);
    }
  }
}

export class PetsService extends Http {
  static getPets() {
    return PetsService.getAll('/pets');
  }
}
