import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const NotAuthenticatedGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log(' not auth guard');
  const authService = inject(AuthService);
  const router = inject(Router); // necesito el router porque si usuario no esta authenticado necesito sacarlo
  const isAuthenticated = await firstValueFrom(authService.checkStatus()); //manda un observable y espera la respuesta como si fuera una promesa // REVISAR
  console.log({ isAuthenticated });
  if (isAuthenticated) {
    router.navigateByUrl('/');
    return false;
  }
  return true;
};
