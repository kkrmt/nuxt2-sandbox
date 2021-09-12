import Auth0Lock from 'auth0-lock'
import nuxtConfig from '~/nuxt.config'
import jwtDecode from "jwt-decode";
import queryString from "query-string";

const config = nuxtConfig.auth0

class Auth0Util {
  showLock(container) {
    const lock = new Auth0Lock(config.clientID, config.domain, {
      container,
      closable: false,
      auth: {
        responseType: 'token id_token',
        redirectUrl: this.getBaseUrl() + '/callback',
        params: {
          scope: 'openid profile email',
        },
      },
    })

    lock.show();
  }

  getBaseUrl() {
    return `${window.location.protocol}//${window.location.host}`
  }

  getQueryParams() {
    return queryString.parse(location.hash);
  }

  setToken({access_token, id_token, expires_in}) {
    // eslint-disable-next-line no-console
    console.log("1", { access_token });
    // eslint-disable-next-line no-console
    console.log("2", { id_token });
    // eslint-disable-next-line no-console
    console.log("3", { expires_in });
    const localStorage = window.localStorage;
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('idToken', id_token);
    localStorage.setItem('expiresAt', expires_in * 1000 + new Date().getTime());
    localStorage.setItem('user', JSON.stringify(jwtDecode(id_token)));
  }

  // logout
  unsetToken() {
    const localStorage = window.localStorage;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('user');
  }

  setTokenByQuery() {
    this.setToken(this.getQueryParams());
  }

  isAuthenticated() {
    const expiresAt = window.localStorage.getItem('expiresAt');
    return new Date().getTime() < expiresAt;
  }
}

export default (context, inject) => {
  inject('auth0', new Auth0Util())
}