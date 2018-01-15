import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from '../guards';
import {SignupFormComponent} from './signup/signup-form/signup-form.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {LoginFormComponent} from './login/login-form/login-form.component';
import {SignupService} from './signup.service';
import {AuthService} from './auth.service';
import {AuthRoutes} from './auth-routes';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutes,
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    SignupFormComponent,
    SignupComponent,
    LoginComponent,
    LoginFormComponent
  ],
  providers: [
    SignupService,
    AuthService,
    AuthGuard
  ]
})
export class AuthModule {
}
