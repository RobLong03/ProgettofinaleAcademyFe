import { CanActivateFn } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { inject } from '@angular/core';

export const pathGuardALoggedGuard: CanActivateFn = (route, state) => {
     const authService = inject (AuthServiceService);

  return authService.isAuthenticated();
};
