import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {WalletService} from '../../../wallet.service';
import {ISendCoinsRequest} from '../../../wallet.interfaces';
import {CustomValidators} from '../../../../shared/custom-validators';
import {serverErrors} from '../../../../shared/helpers';

@Component({
  selector: 'app-send-coins-form',
  templateUrl: './send-coins-form.component.html',
  styleUrls: ['./send-coins-form.component.css']
})
export class SendCoinsFormComponent implements OnInit {


  @Input() balance: number;
  @Input() walletId: string;

  sendCoinsForm: FormGroup;
  payment: ISendCoinsRequest;

  loaded = false;
  formSavedMessage: string;
  formErrorMessage: string;

  private formSubmitStatus: boolean;

  constructor(private fb: FormBuilder,
              private router: Router,
              private walletService: WalletService) {
  }

  public ngOnInit(): void {
    this.formSubmitStatus = false;
    this.resetForm();
    this.createForm();
    this.loaded = true;
  }

  resetForm() {
    this.payment = {
      amount: 1,
      receiverWalletId: '',
      senderWalletId: this.walletId
    };
  }

  createForm() {
    this.sendCoinsForm = this.fb.group({
      amount: [this.payment.amount, [Validators.required, Validators.min(1), Validators.pattern(CustomValidators.integer())]],
      receiverWalletId: [this.payment.receiverWalletId,
        [Validators.compose([Validators.required, Validators.minLength(32), Validators.maxLength(32)])]]
    });
    this.sendCoinsForm.addControl('senderWalletId', new FormControl(this.payment.senderWalletId, [Validators.compose([
      Validators.minLength(32), Validators.maxLength(32),
      CustomValidators.matchOtherValidator('receiverWalletId', true)
    ])]));
  }

  onSubmit(value): void {
    this.formSubmitStatus = true;
    if (this.sendCoinsForm.valid) {
      this.send(value);
    } else {
      CustomValidators.validateAllFormFields(this.sendCoinsForm);
    }
  }

  send(formData: ISendCoinsRequest) {
    this.formErrorMessage = null;
    this.walletService.sendCoins(formData).subscribe((res) => {
      const {senderWalletId} = formData;
      this.formSavedMessage = 'Coins send successfully';
      this.resetForm();
      setTimeout(() => {
        this.formSavedMessage = null;
      }, 5000);
    }, (err) => {
      this.formErrorMessage = err.error.message;
      setTimeout(() => {
        this.formErrorMessage = null;
      }, 5000);
    });

  }

  reset() {
    this.sendCoinsForm.reset();
    this.formSubmitStatus = false;
    this.formSavedMessage = null;
  }

}
