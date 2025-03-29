import { Component, inject, signal } from '@angular/core';
import { Region } from '../../interfaces/region.type';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';

@Component({
  selector: 'country-by-region',
  imports: [CountryListComponent],
  templateUrl: './by-region.component.html',
})
export class ByRegionComponent {

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
  ];

  countryService = inject(CountryService);
  selectedRegion = signal<Region | null>(null);

  // rxResource
  countryResource = rxResource({
    request: () => ({ query: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.query)
        return of([]); // permite regresar un observable basado en lo que se mande a invocar
      return this.countryService.searchByRegion(request.query);
    }
  })

}
