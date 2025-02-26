import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

export const adminGuardPathGuard: CanActivateFn = (route, state) => {
  const authService = inject (AuthServiceService);
  const router = inject(Router);

  if(!authService.isAuthenticatedAdmin()){
    router.navigate(["admin/login"])
  }


  return authService.isAuthenticatedAdmin();
};
