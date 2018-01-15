import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SignupService} from '../../signup.service';
import {ISignupForm, ISignupRequest} from '../../signup';
import {CustomValidators} from '../../../shared/custom-validators';
import {ILoginResponse} from '../../login';
import {serverErrors} from '../../../shared/helpers';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit, OnDestroy {


  signUpForm: FormGroup;

  loaded = false;
  loadingMessage: string;
  formSavedMessage: string;
  formErrorMessage: string;
  private formSubmitStatus: boolean;
  private formSavedMessageTimeout = null;
  private account: ISignupRequest;
  confirmPassword = '';

  constructor(private fb: FormBuilder,
              private signUpService: SignupService) {

  }

  ngOnInit() {
    this.formSubmitStatus = false;
    this.loadingMessage = 'Loading form...';
    this.accountReset();
    this.createForm();
    this.loaded = true;
  }

  createForm() {
    this.signUpForm = this.fb.group({
      username: [this.account.username, [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
      email: [this.account.email, [Validators.required, Validators.pattern(CustomValidators.email())]],
      firstname: [this.account.firstname, [Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(24)])]],
      lastname: [this.account.lastname, [Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(24)])]],
      password: [this.account.password, [Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(24)])]]
    });

    this.signUpForm.addControl('confirmPassword', new FormControl(this.confirmPassword, [Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(24),
      CustomValidators.matchOtherValidator('password')
    ])]));
  }

  onSubmit(value): void {
    this.formSubmitStatus = true;
    if (this.signUpForm.valid) {
      delete value.confirmPassword;
      this.save(value);
    } else {
      CustomValidators.validateAllFormFields(this.signUpForm);
    }
  }

  private save(account: ISignupForm) {
    this.loadingMessage = 'Sending form...';
    this.formErrorMessage = null;
    this.signUpService.signUp(account).subscribe((userResponse: ILoginResponse) => {
      if (userResponse) {
        this.accountReset();
        this.createForm();
        this.formSavedMessage = 'Form saved successfully';
        this.formSavedMessageTimeout = setTimeout(() => {
          this.formSavedMessage = null;
        }, 3000);
        this.formSubmitStatus = false;
        localStorage.setItem('currentUser', JSON.stringify(userResponse.account));
        this.loaded = true;
      }
    }, err => {
      serverErrors(err, this.signUpForm);
      this.account = account;
    });
  }

  private accountReset() {
    this.account = {
      username: '',
      firstname: '',
      lastname: '',
      password: '',
      email: ''
    };
  }

  reset() {
    this.signUpForm.reset();
    this.formSubmitStatus = false;
    this.formSavedMessage = null;
  }

  ngOnDestroy(): void {
    clearTimeout(this.formSavedMessageTimeout);
  }
}
