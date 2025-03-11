import { Component, computed, inject, signal } from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { AddCharacterComponent } from "../../components/dragonball/add-character/add-character.component";
import { DBZService } from '../../services/dragonball.service';

@Component({
  selector: 'app-dragonball-super-page',
  imports: [CharacterListComponent, AddCharacterComponent],
  templateUrl: './dragonball-super-page.component.html',
})
export class DragonballSuperPageComponent {

// constructor(private dbzService: DBZService){}

//nueva forma de hacer inyeccion de dependencias !!!
public dbzService = inject(DBZService);


}
