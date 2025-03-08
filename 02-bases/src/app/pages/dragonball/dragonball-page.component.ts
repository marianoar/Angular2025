import { Component, computed, signal } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power: number;
}
@Component({
  selector: 'app-dragonball-page',
  imports: [],
  templateUrl: './dragonball-page.component.html',
  styleUrl: './dragonball-page.component.css'
})
export class DragonballPageComponent {

  characters = signal<Character[]>([
    {
      id: 1, name: 'Goku', power: 123
    },
    {
      id: 2, name: 'Batman', power: 555
    }, 
    {
      id: 3, name: 'Mazinger', power: 434
    }, 
    {
      id: 4, name: 'Sandokan', power: 999
    }
  ]);

  // powerClasses = computed(()=>{
  //   return {
  //     'text-danger':true
  //   }
  // })
}
