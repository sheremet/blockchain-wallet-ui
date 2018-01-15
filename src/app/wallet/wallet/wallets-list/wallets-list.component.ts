import {Component, Input, OnInit} from '@angular/core';
import {IWalletView} from '../../wallet';

@Component({
  selector: 'app-wallets-list',
  templateUrl: './wallets-list.component.html',
  styleUrls: ['./wallets-list.component.css']
})
export class WalletsListComponent implements OnInit {


  @Input() wallets: IWalletView[];

  constructor() { }

  ngOnInit() {
  }

}
