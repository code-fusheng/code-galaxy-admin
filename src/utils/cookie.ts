import Cookies from 'js-cookie';

export const Key = {
  accessTokenKey: 'accessToken',
};

class CookieClass {
  constructor() {

  }
  get(key) {
    return Cookies.get(key)
  }

  set(key) {
    return Cookies.set(Key.accessTokenKey, key)
  }

  remove(key, path = '/') {
    CookieClass.checkKey(key)
    Cookies.remove(key, {path: path})
  }

  static checkKey(key) {
    if (!key) {
      throw new Error('没有找到key。');
    }
    if (typeof key === 'object') {
      throw new Error('key不能是一个对象。');
    }
  }

}

export const PcCookie = new CookieClass();
