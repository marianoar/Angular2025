import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { CountryMapper } from '../../mappers/country.mapper';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital.component.html',
})
export class ByCapitalComponent {

  countryService = inject(CountryService);

  isLoading = signal(false);
  isError = signal<string|null>(null);
  countries = signal<Country[]>([]);

  onSearch(value:string){
    // console.log(value);
    if(this.isLoading())
      return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCapital(value)
      .subscribe((res)=>{
        this.isLoading.set(false);
        this.countries.set(res);
        
      // console.log(res);
    });
  }

}
