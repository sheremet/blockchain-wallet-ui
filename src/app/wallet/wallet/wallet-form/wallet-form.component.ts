import {Component, OnInit} from '@angular/core';
import {WalletService} from '../../wallet.service';
import {IWallet, IWalletRequest, IWalletView} from '../../wallet';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CustomValidators} from '../../../shared/custom-validators';
import {serverErrors} from '../../../shared/helpers';

@Component({
  selector: 'app-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.css']
})
export class WalletFormComponent implements OnInit {

  walletForm: FormGroup;
  wallet: IWallet;
  private walletRequest: IWalletRequest;

  loaded = false;
  loadingMessage: string;
  formSavedMessage: string;
  formErrorMessage: string;

  private formSubmitStatus: boolean;

  constructor(private fb: FormBuilder,
              private router: Router,
              private walletService: WalletService) {
  }


  ngOnInit() {
    this.formSubmitStatus = false;
    this.loadingMessage = 'Loading Login form...';
    this.resetForm();
    this.createForm();
    this.loaded = true;
  }

  resetForm() {
    this.walletRequest = {
      label: '',
      password: ''
    };
  }

  createForm() {
    this.walletForm = this.fb.group({
      label: [this.walletRequest.label, [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
      password: [this.walletRequest.password, [Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(24)])]]
    });
  }

  onSubmit(value): void {
    this.formSubmitStatus = true;
    if (this.walletForm.valid) {
      delete value.confirmPassword;
      this.send(value);
    } else {
      CustomValidators.validateAllFormFields(this.walletForm);
    }
  }

  send(formData: IWalletRequest) {
    this.loadingMessage = 'Sending form...';
    this.formErrorMessage = null;
    this.walletService.createWallet(formData).subscribe((res) => {
      const data: IWalletView = res.data;
      this.router.navigate(['wallet', 'details', data.walletId]);
    }, (err) => {
      serverErrors(err, this.walletForm);
    });

  }

  reset() {
    this.walletForm.reset();
    this.formSubmitStatus = false;
    this.formSavedMessage = null;
  }

}
