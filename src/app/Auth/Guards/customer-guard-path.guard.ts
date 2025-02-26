import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

export const customerGuardPathGuard: CanActivateFn = (route, state) => {
   const authService = inject (AuthServiceService);
       const router = inject(Router);
     
       if(!authService.isAuthenticatedCustomer()){
         router.navigate(["login"])
       }

  return authService.isAuthenticatedCustomer();
};
