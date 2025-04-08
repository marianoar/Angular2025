import { Component, signal } from '@angular/core';
import ToggleCasePipe from '../../pipes/toggle-case.pipe';
import { heroes } from '../../data/hero.data';
import CanFlyPipe from '../../pipes/can-fly.pipe';
import { HeroColorPipe } from '../../pipes/hero-color.pipe';
import { HeroTextColorPipe } from '../../pipes/hero-text-color.pipe';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { HeroCreatorrPipe } from '../../pipes/hero-creator.pipe';
import { HeroSortByPipe } from '../../pipes/hero-sort-by.pipe';
import { Hero } from '../../interfaces/hero.interface';
import HeroFilterPipe from '../../pipes/hero-filter.pipe';

@Component({
  selector: 'app-custom-page',
  imports: [ToggleCasePipe, CanFlyPipe, HeroColorPipe, HeroTextColorPipe, TitleCasePipe,
    HeroCreatorrPipe, UpperCasePipe, HeroSortByPipe, HeroFilterPipe
  ],
  templateUrl: './custom-page.component.html',
})
export default class CustomPageComponent {

  name = signal('MarIanO');
  upperCase = signal(true);
  heroes = signal(heroes);
  sortBy = signal<keyof Hero | null>(null);
  searchQuery = signal('');
}
