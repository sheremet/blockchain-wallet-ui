import {Component, Input, OnInit} from '@angular/core';
import {WalletService} from '../../wallet.service';


export interface ITransaction {
  blockHash: string;
  blockIndex: number;
  from: string;
  to: string;
  amount: number;
  confirmations: number;
  txId: string;
}

export interface ITransactionsResponse {
  from: ITransaction[];
  to: ITransaction[];
}

const sortByBlockIndex = (arr: ITransaction[]) => {
  return arr.sort((a, b) => {
    if (a.blockIndex === b.blockIndex) {
      return 0;
    }
    return a.blockIndex > b.blockIndex ? -1 : 1;
  });
};

const sortTransactions = (transactions: ITransactionsResponse) => {
  return {
    from: sortByBlockIndex(transactions.from),
    to: sortByBlockIndex(transactions.to)
  };
};

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  @Input() address: string;

  public transactions: ITransactionsResponse = {
    from: [],
    to: []
  };
  loaded = false;
  loadingMessage = 'Load transactions...';
  activeTab = 'i';

  constructor(private walletService: WalletService) {
  }

  ngOnInit() {
    this.loadTransactions();
  }

  private loadTransactions() {
    this.walletService.getTransactionsByAddress(this.address).subscribe(({data}) => {
      this.transactions = sortTransactions(data);
      this.loaded = true;
      this.loadingMessage = '';
    }, (err) => {
      this.loadingMessage = err.error.message;
    });
  }

  toggleClass(linkName) {
    switch (linkName) {
      case 'o':
        this.activeTab = 'o';
        break;
      case 'i':
        this.activeTab = 'i';
        break;
    }
  }

}
