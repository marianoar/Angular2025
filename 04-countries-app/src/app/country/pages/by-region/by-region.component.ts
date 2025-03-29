import { Component, inject, linkedSignal, signal } from '@angular/core';
import { Region } from '../../interfaces/region.type';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLocaleLowerCase();
  const validRegions: Record<string, Region>={
    africa:'Africa',
    america:'America',
    asia:'Asia',
    europe:'Europe',
    oceania:'Oceania'
  }
  return validRegions[queryParam] ?? '';
}

@Component({
  selector: 'country-by-region',
  imports: [CountryListComponent],
  templateUrl: './by-region.component.html',
})
export class ByRegionComponent {

  public regions: Region[] = [
    'Africa',
    'America',
    'Asia',
    'Europe',
    'Oceania'
  ];

  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = (this.activatedRoute.snapshot.queryParamMap.get('region') ?? '') as Region;

  selectedRegion = linkedSignal<Region>(() => validateQueryParam(this.queryParam));
  // rxResource
  countryResource = rxResource({
    request: () => ({ query: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.query)
        return of([]); // permite regresar un observable basado en lo que se mande a invocar
      this.router.navigate(['/country/by-region'], { queryParams: { region: request.query } });
      return this.countryService.searchByRegion(request.query);
    }
  })

}
