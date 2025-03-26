import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { map, Observable, pipe , catchError, throwError, delay} from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL='https://restcountries.com/v3.1';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http =inject(HttpClient); //debo proveerlo en app.config

  searchByCapital(query:string):Observable<Country[]>{
    query = query.toLocaleLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map( resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError( error => {
        return throwError(()=> new Error(`No se encontró país que responda a la consulta ${query}`));
      })
    );
  }

  
  searchByCountry(query:string):Observable<Country[]>{
    query = query.toLocaleLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map( resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      delay(2000),
      catchError( error => {
        return throwError(()=> new Error(`No se encontró país que responda a la consulta ${query}`));
      })
    );
  }

  searchCountryByCode(code:string):Observable<Country | undefined>{

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
    .pipe(
      map( resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map( countries => countries.at(0)),
      // delay(2000),
      catchError( error => {
        return throwError(()=> new Error(`No se encontró país con código ${code}`));
      })
    );
  }
}
