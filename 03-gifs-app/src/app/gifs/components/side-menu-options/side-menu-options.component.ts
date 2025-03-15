import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GifsService } from '../../services/gifs.service';

interface MenuOption{
  icon: string;
  label: string;
  subLabel: string;
  route:  string;
}

@Component({
  selector: 'side-menu-options',
  imports: [RouterLink],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {

  gifsService = inject(GifsService);

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
