import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

// Este guard se encarga de verificar si el usuario es admin
// Si no es admin, redirige a la página de login
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return authService.authUser$.pipe(
    map((user) => {
      if (user?.role !== 'admin') {
        return true;
      } else {
        alert('No tienes permisos para acceder a esta página');
        return false;
      }
    })
  );

};
