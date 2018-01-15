import {Component, OnInit} from '@angular/core';
import {IWalletView} from '../wallet';
import {WalletService} from '../wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  wallets: IWalletView[] = [];
  loaded = false;

  constructor(private walletService: WalletService) {
  }

  ngOnInit() {
    this.walletService.getWallets().subscribe((res) => {
      this.wallets = res.data;
      this.loaded = true;
    });
  }


}
