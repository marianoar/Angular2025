import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import {v4 as UUIDv4 } from 'uuid';
import { JsonPipe } from '@angular/common';
mapboxgl.accessToken = environment.mapBoxKey;

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  coordinates = signal({
    lng:-58.579713,
    lat: -34.421157
  });
  markers= signal<Marker[]>([]);

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

    // const marker = new mapboxgl.Marker({draggable:false, color:'blue'})
    //                 .setLngLat(this.coordinates())
    //                 .addTo(map);

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('click', (event)=> this.mapClick(event));

    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent){

    const map = this.map()!;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const coords = event.lngLat;
    const mapboxMarker = new mapboxgl.Marker({
        color:color,
      })
    .setLngLat(coords)
    .addTo(map);

    const newMarker: Marker = {
      id:UUIDv4(),
      mapboxMarker: mapboxMarker
    }

    // this.markers.set([newMarker, ...this.markers()])
    this.markers.update((markers)=>[newMarker, ...markers]);

    console.log(this.markers);
  }

  flyToMarker(lngLat: LngLatLike){
    if(!this.map())
      return;

    this.map()?.flyTo({
      center: lngLat,
    })
  }

  deleteMarker(marker: Marker){
    if(!this.map())
      return;

    const map = this.map()!;

    marker.mapboxMarker.remove();
    this.markers.set(this.markers().filter((m)=> m.id !==marker.id ));

  }
}
