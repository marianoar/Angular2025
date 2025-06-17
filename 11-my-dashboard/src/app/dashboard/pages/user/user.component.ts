import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleComponent } from '@shared/title/title.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../../interfaces/req-responde.interface';
import { UsersService } from '@service/users.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [TitleComponent],
  templateUrl: './user.component.html',
})
export default class UserComponent {
  private route = inject(ActivatedRoute);
  // public user = signal<User | undefined>(undefined);
  private usersService = inject(UsersService);

  public user = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.usersService.getUserById(id))
    )
  );

  titleLabel = computed(() => {
    if (this.user()) {
      return `Informacion del usuario: ${this.user()?.last_name}, ${
        this.user()?.first_name
      }`;
    }
    return 'Informacion del usuario';
  });

  constructor() {
    // this.route.params.subscribe((p) => console.log(p));
  }
}
