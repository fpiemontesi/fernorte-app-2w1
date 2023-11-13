import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class Customvalidator {

    static maxAmountValidator(maxAmount: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const amount = maxAmount;
      if (amount < 0) {
        return { maxAmountExceeded: true };
      }
      return null;
    };
  }
}
