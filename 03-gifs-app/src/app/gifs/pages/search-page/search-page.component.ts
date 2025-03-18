import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {

   gifsService = inject(GifsService);
   gifs = signal<Gif[]>([]);

  onSearch(arg0: string) {
    
    this.gifsService.searchGifs(arg0).subscribe((resp)=>{
      // console.log(resp);
      this.gifs.set(resp);
    });
  }


}
