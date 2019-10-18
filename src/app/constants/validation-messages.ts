import { ValidatorFn } from '@angular/forms';

import * as R from 'ramda';

export const validationMessages = {
  required: '請輸入此欄',
  itemMinSelection: '請完成此區的選取',
  itemMaxSelection: '此區選取了太多的項目',
};

export class InputValidator {

  static itemCount(requiredCount: number): ValidatorFn {
    return control => {
      const count = R.sum(Object.values(control.value));
      return count < requiredCount ? {itemMinSelection: validationMessages.itemMinSelection} :
        count > requiredCount ? {itemMaxSelection: validationMessages.itemMaxSelection} :
          null;
    };
  }

}