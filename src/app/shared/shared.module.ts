import {NgModule} from '@angular/core';
import {CommonModule, NgClass} from '@angular/common';
import {BackButtonComponent} from '../components/back-button/back-button.component';
import {FormControlFieldComponent} from '../components/form-control-field/form-control-field.component';
import {TwoColRowComponent} from '../components/two-col-row/two-col-row.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    BackButtonComponent,
    FormControlFieldComponent,
    TwoColRowComponent
  ],
  exports: [
    BackButtonComponent,
    FormControlFieldComponent,
    TwoColRowComponent
  ]
})
export class SharedModule {
}
