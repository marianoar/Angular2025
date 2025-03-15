import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {

  gifsService = inject(GifsService);

  query = toSignal(
            inject(ActivatedRoute)
            .params
            .pipe(
              map(p => p['query'])
            )
  );

  gifsByKey = computed(()=>{
    return this.gifsService.getHistoryGifs(this.query())
  });
}
