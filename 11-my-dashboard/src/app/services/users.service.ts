import { computed, inject, Injectable, signal } from '@angular/core';
import type {
  User,
  UserResponse,
  UsersResponse,
} from '../interfaces/req-responde.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

interface State {
  users: User[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  //el # lo hace privado, pero tiene una dif en la transpilacion
  #state = signal<State>({
    users: [],
    loading: true,
  });

  public users = computed(() => this.#state().users);
  public loading = computed(() => this.#state().loading);

  constructor() {
    console.log('cargando...');
    this.http
      .get<UsersResponse>('https://reqres.in/api/users', {
        headers: new HttpHeaders().append('x-api-key', 'reqres-free-v1'),
      })
      .subscribe((resp) => {
        console.log(resp);
        this.#state.set({ loading: false, users: resp.data });
      });
  }

  getUserById(id: string) {
    return this.http
      .get<UserResponse>('https://reqres.in/api/users/' + id, {
        headers: new HttpHeaders().append('x-api-key', 'reqres-free-v1'),
      })
      .pipe(map((resp) => resp.data));
  }
}
