/* eslint-disable max-classes-per-file */
class Http {
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

  static async send(url, method = 'POST', data = []) {
    try {
      const resp = await fetch(`${Http.baseUrl}${url}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!resp.ok)
        throw new Error(
          `fetch fail: ${resp.status} ${resp.statusText} trying to fetch ${resp.url}`
        );

      return true;
    } catch (error) {
      console.warn('klaida http ', error.message);
      console.warn('error.stack ', error.stack);
    }
  }
}

export class PetsService extends Http {
  static getPets() {
    return Http.getAll('/pets');
  }

  static delete(id) {
    return Http.send(`/pets/${id}`, 'DELETE');
  }

  static create(newPetObj) {
    return Http.send('/pets', 'POST', newPetObj);
  }
}
export class MedsService extends Http {
  static getMeds() {
    return Http.getAll('/meds');
  }
}
