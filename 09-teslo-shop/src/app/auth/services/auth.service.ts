import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { User } from '@auth/interfaces/user.interfaces';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

type AuthStatus = 'checking' | 'authenticated' | 'not-auth';
const baseURL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);

  private http = inject(HttpClient);

  // al ser computed signal es de solo lectura
  authStatus = computed(() => {
    if (this._authStatus() === 'checking') return 'checking';
    if (this._user()) {
      return 'authenticated';
    }
    return 'not-auth';
  });

  user = computed(() => this._user);
  token = computed(() => this._token);

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${environment.baseUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .pipe(
        tap((resp) => {
          this._authStatus.set('authenticated');
          this._user.set(resp.user);
          this._token.set(resp.token);

          localStorage.setItem('token', resp.token);
        })
      );
  }
}
