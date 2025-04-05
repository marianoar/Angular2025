import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';

const client1 = {
  name: 'Raviol',
  gender: 'male',
  age: 33,
  address: 'CABA, Argentina'
}
const client2 = {
  name: 'Analia',
  gender: 'female',
  age: 35,
  address: 'Sarasa, Argentina'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, UpperCasePipe, 
            AsyncPipe, TitleCasePipe, KeyValuePipe],
  templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent {

  //i18n Select
  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  }

  changeClient() {

    if (this.client() === client1) {
      this.client.set(client2);
      return;
    }
    this.client.set(client1);
  }

  //i18nPlural
  clientesMap = signal({
    '=0': 'no hay naides ',
    '=1': 'hay un cliente ',
    '=2': 'hay dos clientes ',
    'other': 'tenemos # clientes '
  })
  clientes = signal(['nombre1', 'nombre2', 'nombre3', 'cliente4', 'cliente5']);
  deleteClient() {
    this.clientes.update(c => c.slice(1));
  }

  // keyValuePipe
  profile = {
    name:'Mariano',
    age:36,
    city: 'Moron'
  }

  //Async pipe
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve('Tenemos hambre');
      console.log('Promise ended')
    }, 3500)
  })

  myObservableTimer = interval(5000).pipe(
    map((value)=> value+1), // esto es para 'saltar' el 0 en el if
    tap((value)=> console.log('tap: ', value)),
  )
// el async se va a encargar de hacer la suscripcion al Observable
}
