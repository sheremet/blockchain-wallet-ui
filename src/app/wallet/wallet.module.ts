import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WalletComponent} from './wallet/wallet.component';
import {WalletService} from './wallet.service';
import {WalletRoutes} from './wallet-routes';
import {WalletFormComponent} from './wallet/wallet-form/wallet-form.component';
import {WalletDetailsComponent} from './wallet/wallet-details/wallet-details.component';
import {SharedModule} from '../shared/shared.module';
import {WalletsListComponent} from './wallet/wallets-list/wallets-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TransactionsComponent} from './wallet/transactions/transactions.component';
import {TransactionRowComponent} from './wallet/transactions/transaction-row/transaction-row.component';
import {SendCoinsFormComponent} from './wallet/wallet-details/send-coins-form/send-coins-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WalletRoutes,
    SharedModule
  ],
  declarations: [
    WalletComponent,
    WalletFormComponent,
    WalletDetailsComponent,
    WalletsListComponent,
    TransactionsComponent,
    TransactionRowComponent,
    SendCoinsFormComponent
  ],
  providers: [WalletService]
})
export class WalletModule {
}
