import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  imports: [RouterModule],
  templateUrl: './sidemenu.component.html',
})
export class SidemenuComponent {
  public menuItems = routes
    .map((route) => route.children ?? [])
    .flat() //aplano el array, convierte un array dentro de otro en uno solo
    .filter((r) => r && r.path) //para eliminar el elemento vacio
    .filter((r) => !r.path?.includes(':')); //para eliminar el path con el id

  constructor() {}
}
