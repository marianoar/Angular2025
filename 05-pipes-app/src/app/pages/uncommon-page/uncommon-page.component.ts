import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { I18nSelectPipe } from '@angular/common';

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
  imports: [CardComponent, I18nSelectPipe],
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
}
