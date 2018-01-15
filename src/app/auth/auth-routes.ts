import {Routes, RouterModule} from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [{
  path: '',
  children: [
    {path: ''},
    {path: 'signup',  component: SignupComponent},
    {path: 'login',  component: LoginComponent}
  ]
}
];

export const AuthRoutes = RouterModule.forChild(routes);
