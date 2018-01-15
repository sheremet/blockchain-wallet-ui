import {FormGroup} from '@angular/forms';

export const isAuthenticated = () => {
  return !!localStorage.getItem('currentUser');
};

export const serverErrors = (err: any, form: FormGroup) => {
  try {
    this.formErrorMessage = err.error.message;
    const errors = err.error.errors;
    const keys = Object.keys(errors);
    keys.map((key) => {
      form.get(key).setErrors({serverError: errors[key].massages.join('. ')});
    });
  } catch (e) {}

};
