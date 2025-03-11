import { Component, output, signal } from '@angular/core';
import { Character } from '../../../../interfaces/character.interface';

@Component({
  selector: 'dbz-add-character',
  imports: [],
  templateUrl: './add-character.component.html',
})
export class AddCharacterComponent {
name =signal('');
power=signal(0);

newCharacter = output<Character>();

AddCharacter(){
  console.log(this.name(), this.power());
  if(!this.name() || !this.power() )
    return;

  const newCharacter: Character = {
    // id: this.characters.length +1,
    id: Math.floor(Math.random()*1000),
    name: this.name(),
    power : this.power()
  };

  // al ser una señal no actualizo la lista de la forma clasica
  // this.characters.update((list)=> [...list, newCharacter]);
  // console.log({newCharacter});
  this.newCharacter.emit(newCharacter);

  this.resetFields();
}
// powerClasses = computed(()=>{
//   return {
//     'text-danger':true
//   }
// })

resetFields(){
  this.name.set('');
  this.power.set(0);
}
}
