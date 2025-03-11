import { effect, Injectable, signal } from "@angular/core";
import { Character } from "../../interfaces/character.interface";

function loadFromLocalStorage(): Character[]{
    // aca irian validaciones varias
    const characters = localStorage.getItem('listado');
    return characters ? JSON.parse(characters): []
}

@Injectable({ providedIn: 'root' })
export class DBZService {

    characters = signal<Character[]>(loadFromLocalStorage());

    addCharacter(character: Character) {
        this.characters.update(list => [...list, character]);
    }

// Registers an "effect" that will be scheduled & executed whenever the signals that it reads changes.
// Angular has two different kinds of effect: component effects and root effects. 
// Component effects are created when effect() is called from a component, directive, 
// or within a service of a component/directive. 
// Root effects are created when effect() is called from outside the component tree, 
// such as in a root service, or when the forceRoot option is provided.
    saveToLocalStorage = effect( ()=>{
        console.log(`Character count ${this!.characters().length}`);

        localStorage.setItem("listado",JSON.stringify(this.characters()));
    })


}