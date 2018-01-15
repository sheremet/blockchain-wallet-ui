import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-control-field',
  templateUrl: './form-control-field.component.html',
  styleUrls: ['./form-control-field.component.css']
})
export class FormControlFieldComponent implements OnInit {

  @Input() controlName: string;
  @Input() placeholder: string;
  @Input() form: FormGroup;
  @Input() infoMessage?: string;
  @Input() formSubmitStatus: boolean;
  @Input() inputType = 'text';
  @Input() isHidden: boolean;
  @Input() customErrorMessage: string;

  ngOnInit() {
  }

  control() {
    return this.form.get(this.controlName);
  }


}
