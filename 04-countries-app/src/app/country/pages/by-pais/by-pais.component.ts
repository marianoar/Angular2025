import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'country-by-pais',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-pais.component.html',
})
export class ByPaisComponent {

  countryService = inject(CountryService);
  query = signal('');


// rxResource
countryResource = rxResource({
  request:()=>({query: this.query()}),
  loader: ({request})=>{
   if(!request.query)
    return of([]); // permite regresar un observable basado en lo que se mande a invocar
  return this.countryService.searchByCountry(request.query);
  }
})
// // resource -> promessas, rxResource -> observable
//   countryResource = resource({
//     request:()=>({query: this.query()}),
//     loader: async({request})=>{
//       if(!this.query)
//         return [];
//         // transforma obvservable en promise . porque el resourse devuelve promesa ?
//       return await firstValueFrom(this.countryService.searchByCountry(request.query));
//     }
//   })
}
