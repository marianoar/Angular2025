import { Component, input, output } from '@angular/core';
import { GifListItemComponent } from "./gif-list-item/gif-list-item.component";
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [GifListItemComponent, GifListItemComponent],
  templateUrl: './gif-list.component.html',
})
export class GifListComponent {

  // gifUrlList = input<string[]>();
  gifs = input.required<Gif[]>();
  envios = output();


}
