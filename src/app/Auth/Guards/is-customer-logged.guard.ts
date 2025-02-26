import { CanActivateFn } from '@angular/router';

export const isCustomerLoggedGuard: CanActivateFn = (route, state) => {
  return true;
};
