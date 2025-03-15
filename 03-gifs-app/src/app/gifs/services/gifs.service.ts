import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

const loadFromLocalStorage = ()=>{
  const gifsFromLocalStorage = localStorage.getItem('gifs') ?? '[]';
  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs;
}
// {
//   'query': [gif1, gif2, gif3, ...],
//   'segundaBusqueda': [gif, gif, gif ,],
//   'otra': [gif, gif, gif]
// }
// HistorySearch<string, Gif[]> y asi seria el equivalente objetivizado
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(()=> Object.keys(this.searchHistory()));

  constructor() { 
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(()=>{
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifsQuerys', historyString);
  });

  loadTrendingGifs() {

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
      }
    }
    ).subscribe((response) => {

      const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
    })
  }

  searchGifs(query: string){ //estoy retornando directamente el Observable
   return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query
      }
    }).pipe(
      map( ({data}) => data ),
      map((items)=> GifMapper.mapGiphyItemsToGifArray(items)),
      //Historial
      tap( items => {
        this.searchHistory.update(history=>({...history, [query.toLocaleLowerCase()]:items,}))
      })
    )
    // ).subscribe((response) => {
  
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
    //   this.trendingGifs.set(gifs);
    //   this.trendingGifsLoading.set(false);
    // })
  }

  getHistoryGifs(q: string):Gif[]{
    return this.searchHistory()[q] ?? [];
  }
}
