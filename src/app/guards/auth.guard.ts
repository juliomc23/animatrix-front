import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = true;
  const router = inject(Router);

  if (!token) {
    router.navigate(['/login']);
  }

  return !!token;
};
