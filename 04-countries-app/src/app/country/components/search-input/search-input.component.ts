import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

  value = output<string>();
  placeholder = input('Buscar');
  inputValue = signal<string>('');
  debounceTime = input(300);
  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());
    onCleanup(() => {
      clearTimeout(timeout);
    })
  })
  // emisor(query:string){
  //   if(query.length>=3){
  //     this.value.emit(query);
  //   }
}
