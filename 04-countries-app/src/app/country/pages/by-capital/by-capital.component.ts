import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import {rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, of } from 'rxjs';

@Component({
  selector: 'app-by-capital',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital.component.html',
})
export class ByCapitalComponent {

  countryService = inject(CountryService);
  query = signal('');

// rxResource
countryResource = rxResource({
  request:()=>({query: this.query()}),
  loader: ({request})=>{
   if(!request.query)
    return of([]); // permite regresar un observable basado en lo que se mande a invocar
  return this.countryService.searchByCapital(request.query);
  }
})
  // Resource
  // countryResource = resource({
  //   request:()=>({query: this.query()}),
  //   loader: async({request})=>{
  //     if(!this.query)
  //       return [];
  //       // transforma obvservable en promise . porque el resourse devuelve promesa ?
  //     return await firstValueFrom(this.countryService.searchByCapital(request.query));
  //   }
  // })

  // isLoading = signal(false);
  // isError = signal<string|null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(value:string){
  //   // console.log(value);
  //   if(this.isLoading())
  //     return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(value)
  //     .subscribe(
  //       {
  //         next: (res)=>{
  //           this.isLoading.set(false);
  //           this.countries.set(res);
  //         },
  //         error: (error)=>{
  //           this.isLoading.set(false);
  //           this.countries.set([]);
  //           this.isError.set(`${error} ${value}`);
  //         }
  //       }
        
  //     // console.log(res);
  //   );
  // }
}
