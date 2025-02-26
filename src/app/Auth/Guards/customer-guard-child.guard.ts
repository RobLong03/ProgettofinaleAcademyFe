import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

export const customerGuardChildGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject (AuthServiceService);
    const router = inject(Router);
  
    if(!authService.isAuthenticatedCustomer()){
      router.navigate(["login"])
    }


  return authService.isAuthenticatedCustomer();
};
