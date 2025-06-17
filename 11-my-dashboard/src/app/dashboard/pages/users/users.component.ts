import { Component, inject } from '@angular/core';
import { UsersService } from '@service/users.service';
import { TitleComponent } from '../../../shared/title/title.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [TitleComponent, RouterModule, CommonModule],
  templateUrl: './users.component.html',
})
export default class UsersComponent {
  public usersService = inject(UsersService);
}
