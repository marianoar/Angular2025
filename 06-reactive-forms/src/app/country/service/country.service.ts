import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { combineLatest, Observable, of } from "rxjs";
import { Country } from "../interfaces/country.interface";

@Injectable({providedIn:'root'})
export class CountryService{

    private baseUrl= 'https://restcountries.com/v3.1'
    private http = inject(HttpClient);

    private _regions =
    [
        'Africa',
        'Americas',
        'Asia',
        'Europe',
        'Oceania'
    ];

    get regions():string[]{
        return [...this._regions];
    }

    getCountriesByRegion(region:string): Observable<Country[]>{
        if(!region)
            return of([]);
        const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;

        return this.http.get<Country[]>(url);
    }

    getCountryByAlphaCode(alphaCode: string):Observable<Country>{
        const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;

        return this.http.get<Country>(url);
    }

    getCountryNamesByBordersCode(borders: string[]):Observable<Country[]>{
        
        if(!borders || borders.length==0)
            return of([]);

        const countriesRequest: Observable<Country>[] = [];

        borders.forEach(code=>{
            const request = this.getCountryByAlphaCode(code);
            countriesRequest.push(request);
        });

        return combineLatest(countriesRequest); //maneja todas las peticiones, y espera a todas

    }
}