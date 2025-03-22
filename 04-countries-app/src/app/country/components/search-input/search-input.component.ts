import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  value = output<string>();
  // onBuscar(value: any){
  //   console.log({value});
    
  // }
  placeholder= input('Buscar');
}
