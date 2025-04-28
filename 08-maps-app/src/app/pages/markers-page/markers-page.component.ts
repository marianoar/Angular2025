import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
mapboxgl.accessToken = environment.mapBoxKey;

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  coordinates = signal({
    lng:-58.579713,
    lat: -34.421157
  });

  async ngAfterViewInit(): Promise<void> {
    if (!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80)); //para darle tiempo al mapa a cargar y ocupar el height

    const element = this.divElement()!.nativeElement;
     const {lat, lng } = this.coordinates();

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng,lat], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });

    const marker = new mapboxgl.Marker({draggable:false, color:'blue'})
                    .setLngLat(this.coordinates())
                    .addTo(map);

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
  }
}
