import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  // Inject the current `AuthService` and use it to get an authentication token:
  const token = inject(AuthService).token();

  console.log({ token });
  // Clone the request to add the authentication header. Most aspects of HttpRequest and HttpResponse i
  // nstances are immutable, and interceptors cannot directly modify them. Instead, interceptors apply mutations
  // by cloning these objects using the .clone() operation, and specifying which properties should be mutated in
  // the new instance.
  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`),
  });
  return next(newReq);
}
