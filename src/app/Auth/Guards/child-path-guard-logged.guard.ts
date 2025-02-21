import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

export const childPathGuardLoggedGuard: CanActivateChildFn = (childRoute, state) => {
   const authService = inject (AuthServiceService);

  return authService.isAuthenticated();

};
