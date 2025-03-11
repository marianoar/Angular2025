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

  name = signal('');
  power = signal(0);
  characters = signal<Character[]>([
    {
      id: 1, name: 'Goku', power: 123
    },
  ]);

  AddCharacter(){
    console.log(this.name(), this.power());
    if(!this.name() || !this.power() )
      return;

    const newCharacter: Character = {
      id: this.characters.length +1,
      name: this.name(),
      power : this.power()
    };

    // al ser una señal no actualizo la lista de la forma clasica
    this.characters.update((list)=> [...list, newCharacter]);
  }
  // powerClasses = computed(()=>{
  //   return {
  //     'text-danger':true
  //   }
  // })
}
