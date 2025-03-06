import { UpperCasePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'hero-page',
  templateUrl: 'hero-page.component.html',
  styleUrl: 'hero-page.component.css',
  imports: [UpperCasePipe] 
})
export class HeroPageComponent {

  name = signal('IronMan');
  age = signal(45);

// señal computada -> señal de solo lectura, cambia si sus dependencias cambian .
  heroDescripcion = computed(()=>{
    const desc = `${this.name()} - ${ this.age()}`;
    return desc;
  })

  capitalizedName = computed(()=>this.name().toUpperCase());

  getHeroDescription() {
    return `${this.name()} - ${this.age()}`;
  }

  changeHero() {
    this.name.set('spiderman'); //el update depende del  valor anterior
    this.age.set(23);
  }

  resetForm() {
    this.name.set('IronMan'); //el update depende del  valor anterior
    this.age.set(45);
  }

  changeAge() {
    this.age.set(34);
  }
}
