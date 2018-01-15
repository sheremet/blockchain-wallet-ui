import {HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

const apiBaseUrl = 'http://192.168.1.206:8081/api';

interface IHeader {
  [name: string]: string;
}

interface IHttpOptions {
  headers: HttpHeaders;
}

export class CommonHttpService {

  protected apiBaseUrl: string;
  protected headers: HttpHeaders;
  private rawHeaders: IHeader = {'Content-Type': 'application/json'};
  private httpOptions: IHttpOptions;

  constructor() {
    this.setHttpHeaders({});
    this.setApiBaseUrl(apiBaseUrl);
  }

  protected setHttpHeaders(header: IHeader) {
    this.rawHeaders = Object.assign({}, this.rawHeaders, header);
    this.setHttpOptions();
  }

  private setHttpOptions() {
    this.headers = new HttpHeaders(this.rawHeaders);
    this.httpOptions = {
      headers: this.headers
    };
  }

  setApiBaseUrl(url: string) {
    this.apiBaseUrl = url;
  }

  getApiBaseUrl() {
    return this.apiBaseUrl;
  }

  addTokenToHeaders() {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
        this.setHttpHeaders({'x-access-token': currentUser.token});
      }
    } catch (e) {

    }
  }

  getHttpOptions() {
    return Object.assign({}, this.httpOptions);
  }

  protected getUrl(path: string) {
    return `${this.getApiBaseUrl()}/${path}`;
  }

  protected removeAuthDataFromLS() {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
    }
  }

  protected logoutOn401(err: any, router?: Router) {
    if (err && err.error && err.error.status === 401) {
      this.removeAuthDataFromLS();
      if (router) {
        router.navigate(['auth', 'login']);
      }
    }
  }
}
