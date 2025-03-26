import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-country.interface";

export class CountryMapper{
    static mapRestCountryToCountry(restCountry: RESTCountry):Country{
        return {
            capital: restCountry.capital.join( ', '),
            cca2: restCountry.cca2,
            flag: restCountry.flag,
            flagSvg: restCountry.flags.svg,
            name: restCountry.translations['spa'].common ?? 'No data',
            population: restCountry.population

        }
    }

    static mapRestCountryArrayToCountryArray(restCountry: RESTCountry[]):Country[]{
        return restCountry.map((c) => this.mapRestCountryToCountry(c));
    }
}