import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { map, Observable, pipe, catchError, throwError, delay, of, tap } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient); //debo proveerlo en app.config
  private queryCacheByCapital = new Map<string, Country[]>();
  private queryCacheByCountry = new Map<string, Country[]>();
  private queryCacheByRegion = new Map<string,Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    // return of([]); //el of devuelve un observable
    if (this.queryCacheByCapital.has(query)) {
      return of(this.queryCacheByCapital.get(query) ?? []);
    }
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        tap(resp => this.queryCacheByCapital.set(query, resp)),
        catchError(error => {
          return throwError(() => new Error(`No se encontró país que responda a la consulta ${query}`));
        })
      );
  }


  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    if (this.queryCacheByCountry.has(query)) {
      return of(this.queryCacheByCountry.get(query) ?? []);
    }
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        tap(resp => this.queryCacheByCountry.set(query, resp)),
        delay(2000),
        catchError(error => {
          return throwError(() => new Error(`No se encontró país que responda a la consulta ${query}`));
        })
      );
  }

  searchCountryByCode(code: string): Observable<Country | undefined> {

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        map(countries => countries.at(0)),
        // delay(2000),
        catchError(error => {
          return throwError(() => new Error(`No se encontró país con código ${code}`));
        })
      );
  }

  searchByRegion(query:string){
    query = query.toLocaleLowerCase();
    if (this.queryCacheByRegion.has(query)) {
      return of(this.queryCacheByRegion.get(query) ?? []);
    }
    return this.http.get<RESTCountry[]>(`${API_URL}/region/${query}`)
      .pipe(
        map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        tap(resp => this.queryCacheByRegion.set(query, resp)),
        delay(2000),
        catchError(error => {
          return throwError(() => new Error(`No se encontraron paises para la consulta ${query}`));
        })
      );
  }
}
