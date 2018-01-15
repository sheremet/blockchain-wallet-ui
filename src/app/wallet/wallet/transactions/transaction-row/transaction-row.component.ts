import {Component, Input, OnInit} from '@angular/core';
import {ITransaction} from '../transactions.component';

@Component({
  selector: 'app-transaction-row',
  templateUrl: './transaction-row.component.html',
  styleUrls: ['./transaction-row.component.css']
})
export class TransactionRowComponent implements OnInit {

  @Input() transaction: ITransaction;

  constructor() { }

  ngOnInit() {
  }

}
