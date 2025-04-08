import { Component, signal } from '@angular/core';
import ToggleCasePipe from '../../pipes/toggle-case.pipe';
import { heroes } from '../../data/hero.data';
import CanFlyPipe from '../../pipes/can-fly.pipe';
import { HeroColorPipe } from '../../pipes/hero-color.pipe';
import { HeroTextColorPipe } from '../../pipes/hero-text-color.pipe';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { HeroCreatorrPipe } from '../../pipes/hero-creator.pipe';

@Component({
  selector: 'app-custom-page',
  imports: [ToggleCasePipe, CanFlyPipe, HeroColorPipe, HeroTextColorPipe, TitleCasePipe, HeroCreatorrPipe, UpperCasePipe],
  templateUrl: './custom-page.component.html',
})
export default class CustomPageComponent {

  name = signal('MarIanO');

  upperCase = signal(true);

  heroes = signal(heroes);

}
