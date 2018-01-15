import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ISignupRequest} from '../../signup';
import {AuthService} from '../../auth.service';
import {CustomValidators} from '../../../shared/custom-validators';
import {ILoginRequest, ILoginResponse} from '../../login';
import {ActivatedRoute, Router, RouterStateSnapshot} from '@angular/router';
import {serverErrors} from '../../../shared/helpers';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  loaded = false;
  loadingMessage: string;
  formSavedMessage: string;
  formErrorMessage: string;
  private formSubmitStatus: boolean;
  private account: ILoginRequest;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.formSubmitStatus = false;
    this.loadingMessage = 'Loading Login form...';
    this.accountReset();
    this.createForm();
    this.loaded = true;
  }


  private accountReset() {
    this.account = {
      username: '',
      password: '',
    };
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: [this.account.username, [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
      password: [this.account.password, [Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(24)])]]
    });
  }

  onSubmit(value): void {
    this.formSubmitStatus = true;
    if (this.loginForm.valid) {
      delete value.confirmPassword;
      this.send(value);
    } else {
      CustomValidators.validateAllFormFields(this.loginForm);
    }
  }

  send(credentials: ILoginRequest) {
    this.loadingMessage = 'Sending form...';
    this.formErrorMessage = null;
    this.authService.login(credentials).subscribe((res: ILoginResponse) => {
      this.router.navigate(['/'], {queryParams: {returnUrl: this.route.snapshot.url}});
    }, (err) => {
      serverErrors(err, this.loginForm);
      this.formErrorMessage = err.error.message;
    });

  }

  reset() {
    this.loginForm.reset();
    this.formSubmitStatus = false;
    this.formSavedMessage = null;
  }

}
