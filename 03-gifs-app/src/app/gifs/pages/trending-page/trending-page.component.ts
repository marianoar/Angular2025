import { AfterViewInit, Component, ElementRef, inject, output, viewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  // imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {

  gifsService = inject(GifsService);
  scrollStateService = inject(ScrollStateService);

  //gifs: string[] = imageUrls; // o gifs = signal(imageUrl)

  scrollDivReference = viewChild<ElementRef<HTMLDivElement>>('groupDiv');
  
  //igualmente esto no seria lo ideal...
  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivReference()?.nativeElement;
    if (!scrollDiv)
      return;
    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }
  onScroll(event: Event) {
    // console.log("scroll");
    const scrollDiv = this.scrollDivReference()?.nativeElement;
    if (!scrollDiv)
      return;
    const scrollTop = scrollDiv.scrollTop;
    const scrollHeight = scrollDiv.scrollHeight;
    const clientHeight = scrollDiv.clientHeight;
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight; // el 250 es para disparar la peticion antes de llegar al final
    this.scrollStateService.trendingScrollState.set(scrollTop);
    if (isAtBottom)
      this.gifsService.loadTrendingGifs();


  }

}
