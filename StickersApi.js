class StickersApi {
  static URL = 'https://62e67c22de23e263792d127c.mockapi.io/stickers/';
  static NOT_FOUND = 404;
  static defaultSticker = {
    description: '',
  };

  static request(url = '', method = 'GET', body) {
    return fetch(StickersApi.URL + url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-type': 'application/json',
      },
    })
    .catch((e) => {
      throw new Error(`StickersApi cannot execute request: ${e.message}`);
    })
  }

  static getList() {
    return StickersApi
      .request()
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === StickersApi.NOT_FOUND) {
          throw new Error(`Sticker list doesn't exist`);
        }

        throw new Error('Cannot retrive sticker list');
      })
  }

  static create() {
    return StickersApi
      .request('', 'POST', StickersApi.defaultSticker)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Cannot create new sticker');
      })
  }

  static update(id, changes) {
    return StickersApi
      .request(id, 'PUT', changes)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(`Cannot update sticker with id '${id}'`);
      })
  }

  static delete(id) {
    return StickersApi
      .request(id, "DELETE")
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(`Cannot delete sticker with id '${id}'`);
      })
  }
}
