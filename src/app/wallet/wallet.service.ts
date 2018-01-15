import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonHttpService} from '../services/common-http-service';
import {IWallet, IWalletRequest} from './wallet';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';
import {ISendCoinsRequest} from './wallet.interfaces';


@Injectable()
export class WalletService extends CommonHttpService {

  private walletCreateUri = 'merchant/wallet';
  private walletGetUri = 'merchant/wallet';
  private walletsGetUri = 'merchant/wallets';
  private sendCoinsUri = 'merchant/wallet/send-coin';

  private transactionsGetUri(address) {
    return `merchant/address/${address}/transactions`;
  }

  private balanceGetUri(address) {
    return `merchant/address/${address}/balance`;
  }

  constructor(private http: HttpClient,
              private router: Router) {
    super();
  }

  getWallets(): Observable<any> {
    this.addTokenToHeaders();
    return this.http.get(this.getUrl(this.walletsGetUri), this.getHttpOptions())
      .do(null, (err) => {
        this.logoutOn401(err, this.router);
      });
  }

  createWallet(data: IWalletRequest): Observable<any> {
    this.addTokenToHeaders();
    return this.http.post(this.getUrl(this.walletCreateUri), data, this.getHttpOptions()).do(null, (err) => {
      this.logoutOn401(err, this.router);
    });

  }

  getWallet(id: string): Observable<any> {
    this.addTokenToHeaders();
    return this.http.get(this.getUrl(`${this.walletGetUri}/${id}`), this.getHttpOptions()).do(null, (err) => {
      this.logoutOn401(err, this.router);
    });
  }

  getTransactionsByAddress(address: string): Observable<any> {
    this.addTokenToHeaders();
    return this.http
      .get(this.getUrl(`${this.transactionsGetUri(address)}`), this.getHttpOptions())
      .do(null, (err) => {
        this.logoutOn401(err, this.router);
      });
  }

  getBalanceByAddress(address: string) {
    this.addTokenToHeaders();
    return this.http
      .get(this.getUrl(`${this.balanceGetUri(address)}`), this.getHttpOptions())
      .do(null, (err) => {
        this.logoutOn401(err, this.router);
      });
  }

  sendCoins(payment: ISendCoinsRequest) {
    this.addTokenToHeaders();
    return this.http.post(this.getUrl(`${this.sendCoinsUri}`), payment, this.getHttpOptions())
      .do(null, (err) => {
        this.logoutOn401(err, this.router);
      });
  }

}
