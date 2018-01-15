import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ISignupRequest} from './signup';
import {CommonHttpService} from '../services/common-http-service';

@Injectable()
export class SignupService extends CommonHttpService {

  private signup = 'users/signup';

  constructor(private http: HttpClient) {
    super();
  }

  signUp(data: ISignupRequest): Observable<any> {
    return this.http.post(this.getUrl(this.signup), data, this.getHttpOptions());
  }


}
