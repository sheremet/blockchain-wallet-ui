import {RouterModule, Routes} from '@angular/router';
import {WalletComponent} from './wallet/wallet.component';
import {AuthGuard} from '../guards';
import {WalletDetailsComponent} from './wallet/wallet-details/wallet-details.component';
import {WalletFormComponent} from './wallet/wallet-form/wallet-form.component';

const routes: Routes = [{
  path: '',
  children: [
    {path: '', component: WalletComponent, canActivate: [AuthGuard]},
    {path: 'create', component: WalletFormComponent, canActivate: [AuthGuard]},
    {path: 'details/:id', component: WalletDetailsComponent, canActivate: [AuthGuard]},
 ]
}
];

export const WalletRoutes = RouterModule.forChild(routes);
