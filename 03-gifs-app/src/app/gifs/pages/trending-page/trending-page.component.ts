import { Component, ElementRef, inject, output, viewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  // imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {
  
  gifsService = inject(GifsService);
  //gifs: string[] = imageUrls; // o gifs = signal(imageUrl)
  
  scrollDivReference = viewChild<ElementRef<HTMLDivElement>>('groupDiv');
  
  onScroll(event: Event) {
    // console.log("scroll");
    const scrollDiv = this.scrollDivReference()?.nativeElement;
    if(!scrollDiv) 
      return;
  const scrollTop = scrollDiv.scrollTop;
  const scrollHeight = scrollDiv.scrollHeight;
  const clientHeight = scrollDiv.clientHeight;
  const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight; // el 250 es para disparar la peticion antes de llegar al final
 
  if(isAtBottom)
    this.gifsService.loadTrendingGifs();
  
  
  }
  
}
