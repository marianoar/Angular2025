import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

mapboxgl.accessToken = environment.mapBoxKey;
@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
  styles:`
  div{
    width: 100%;
    height: 260px
  }
  `
})
export class MiniMapComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  lngLat = input.required<{lng:number, lat:number}>();
  zoom = input<number>(14);

  async ngAfterViewInit(): Promise<void> {

    if (!this.divElement()?.nativeElement)
      return;

    await new Promise((resolve) => setTimeout(resolve, 80)); //para darle tiempo al mapa a cargar y ocupar el height

    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center:this.lngLat(), // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
      interactive:false,
    });

    new mapboxgl.Marker().setLngLat(this.lngLat()).addTo(map);

  }

  
}
