import { AbstractControl, ValidatorFn } from '@angular/forms';

export function atLeastOneValidator(...fields: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const hasAtLeastOne = fields.some(field => control.get(field)?.value);
    return hasAtLeastOne ? null : { atLeastOneRequired: true };
  };
}