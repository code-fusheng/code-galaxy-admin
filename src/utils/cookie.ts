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
}

export const PcCookie = new CookieClass();
