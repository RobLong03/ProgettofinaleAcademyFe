import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

export const adminGuardPathGuard: CanActivateFn = (route, state) => {
  const authService = inject (AuthServiceService);
  return authService.isAuthenticatedAdmin();
};
