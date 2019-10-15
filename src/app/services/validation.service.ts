import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import * as RA from 'ramda-adjunct';

import { AnyObject } from '../interface/model/any';
import { validationMessages } from '../constants/validation-messages';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public getFormErrors(formGroup: FormGroup): AnyObject<string> {
    const formErrors: AnyObject<string> = {};
    Object.entries(formGroup.controls)
      .forEach(entry => {
        const field = entry[0];
        const control = entry[1];
        if (RA.isNilOrEmpty(entry[1].errors)) {
          formErrors[field] = null;
        } else {
          const firstError = Object.entries(control.errors)[0];
          const firstErrorKey = firstError[0];
          const firstErrorValue = firstError[1];
          if (firstErrorKey === 'validationError') {
            formErrors[field] = firstError[1];
          } else {
            formErrors[field] = firstErrorValue.message || validationMessages[firstErrorKey];
          }
        }
      });
    return formErrors;
  }
}
