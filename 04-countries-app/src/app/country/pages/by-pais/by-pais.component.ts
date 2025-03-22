import { Component } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";

@Component({
  selector: 'country-by-pais',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-pais.component.html',
})
export class ByPaisComponent {

}
