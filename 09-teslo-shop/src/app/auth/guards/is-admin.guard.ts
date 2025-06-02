import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const IsAdmindGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('admin guard');
  const authService = inject(AuthService);
  const router = inject(Router); // necesito el router porque si usuario no esta authenticado necesito sacarlo
  await firstValueFrom(authService.checkStatus()); //manda un observable y espera la respuesta como si fuera una promesa // REVISAR

  return authService.isAdmin();
};
