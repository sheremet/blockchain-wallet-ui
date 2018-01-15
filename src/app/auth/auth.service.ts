import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ILoginRequest, ILoginResponse} from './login';
import {CommonHttpService} from '../services/common-http-service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService extends CommonHttpService {

  private loginUri = 'auth/login';
  private logoutUri = 'auth/logout';


  private static removeAuthDataFromLS() {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
    }
  }

  constructor(private http: HttpClient,
              private router: Router) {
    super();
  }

  login(data: ILoginRequest): Observable<any> {

    return this.http.post(this.getUrl(this.loginUri), data, this.getHttpOptions())
      .do((res: ILoginResponse) => {
        if (res && res.account && res.account.token) {
          localStorage.setItem('currentUser', JSON.stringify(res.account));
        }
      });
  }

  logout() {

    this.addTokenToHeaders();
    const httpOptions = this.getHttpOptions();
    return this.http.post(this.getUrl(this.logoutUri), null, httpOptions).do((res) => {
      AuthService.removeAuthDataFromLS();
    }, (err) => {
      if (err.error.status === 401) {
        AuthService.removeAuthDataFromLS();
        this.router.navigate(['auth', 'login']);
      }
    });
  }


}
