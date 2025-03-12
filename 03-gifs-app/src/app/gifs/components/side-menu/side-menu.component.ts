import { Component } from '@angular/core';
import { SideMenuHeaderComponent } from "../side-menu-header/side-menu-header.component";
import { SideMenuOptionsComponent } from "../side-menu-options/side-menu-options.component";

interface MenuOption{
  icon: string;
  label: string;
  subLabel: string;
  route:  string;
}

@Component({
  selector: 'side-menu',
  imports: [SideMenuHeaderComponent, SideMenuOptionsComponent],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {

  menuOptions: MenuOption[] = [{
    icon: 'fa-solid fa-chart-line',
    label: 'Trending',
    subLabel: 'Gifs Populares',
    route: '/dashboard/trending'
  },
  {
    icon: 'fa-solid fa-magnifying-glass',
    label: 'Buscador',
    subLabel: 'Buscar gifs',
    route: '/dashboard/search'
  }
  ]

}
