import {Component, OnInit} from '@angular/core';
import {IWalletView} from '../../wallet';
import {WalletService} from '../../wallet.service';
import {ActivatedRoute} from '@angular/router';


interface IBalanceResponse {
  data: {
    balance: number
  };
}

@Component({
  selector: 'app-wallet-details',
  templateUrl: './wallet-details.component.html',
  styleUrls: ['./wallet-details.component.css']
})
export class WalletDetailsComponent implements OnInit {

  currentWalletId: string;
  wallet: IWalletView;
  balance: number;
  loadingBalanceMessage = 'Loading balance...';
  walletErrorMessage: any = false;
  loaded = false;

  toggleSendCoinsStatus = false;

  constructor(private route: ActivatedRoute,
              private walletService: WalletService) {
    this.currentWalletId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.loadWalletInfo();
  }

  private loadWalletInfo() {
    this.walletService.getWallet(this.currentWalletId)
      .subscribe((res) => {
        this.wallet = res.data;
        this.getBalance().subscribe((balanceRes: IBalanceResponse) => {
          this.balance = balanceRes.data.balance;
          this.hideLoadBalanceMessage();
          this.loaded = true;
        }, (err) => {
          this.hideLoadBalanceMessage();
          this.balance = 0;
        });
      }, err => {
        this.walletErrorMessage = 'Wallet info not loaded! :(';
      });
  }

  toggleSendMoneyForm() {
    this.toggleSendCoinsStatus = !this.toggleSendCoinsStatus;
  }

  private getBalance() {
    return this.walletService.getBalanceByAddress(this.wallet.address);
  }

  private hideLoadBalanceMessage() {
    this.loadingBalanceMessage = '';
  }

}
