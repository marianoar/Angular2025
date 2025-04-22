import {
  afterNextRender,
  afterRender,
  Component,
  effect,
  signal,
} from '@angular/core';
import { tick } from '@angular/core/testing';
import { TitleComponent } from '../../components/title/title.component';

const log = (...messages: string[]) => {
  console.log(
    `${messages[0]} %c${messages.slice(1).join(', ')}`,
    'color:#bada55'
  );
};
@Component({
  selector: 'app-home',
  imports: [TitleComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  traditionalProperty = 'Mariano';
  signalProperty = signal('Mariano');

  effectBasic = effect((onCleanup) => {
    log('effect', 'Disparar efectos secundarios. Justo despues de ngOnInit');
    onCleanup(() => {
      log('onCleanUp', 'se ejecuta cuando el evento se va a destuir');
    });
  });

  // el implements serviria para obligarlo a implementar, like an Interface
  constructor() {
    log('ctor');

    //ojo, dentro del ctor
    // setTimeout(() => {
    //   this.traditionalProperty = 'Hola Juan Carlos'; //deberia trabajarse con señales. revisar
    //   this.signalProperty.set('Hola Juan Carlos');
    //   console.log('done');
    // }, 2000);
  }

  changeTraditional() {
    this.traditionalProperty = 'Mariano Nano';
  }
  changeSignal() {
    this.signalProperty.set('Marrano Nano');
  }

  ngOnInit() {
    log(
      'ngOnInit',
      "Runs once after Angular has initialized all the component's inputs."
    );
  }

  ngOnChanges() {
    log(
      'ngOnChanges',
      "Runs every time the component's inputs have changed." // no se refiere al element input
    );
  }
  ngDoCheck() {
    log('ngDoCheck', 'Runs every time this component is checked for changes.');
  }
  ngAfterContentInit() {
    log(
      'ngAfterContentInit',
      "Runs once after the component's content has been initialized."
    );
  }
  ngAfterContentChecked() {
    log(
      'ngAfterContentChecked',
      'Runs every time this component content has been checked for changes.'
    );
  }
  ngAfterViewInit() {
    log(
      'ngAfterViewInit',
      "Runs once after the component's view has been initialized."
    );
  }
  ngAfterViewChecked() {
    log(
      'ngAfterViewChecked',
      "Runs every time the component's view has been checked for changes."
    );
  }
  ngOnDestroy() {
    log('ngOnDestroy', '');
  }

  afterNextRenderEffect = afterNextRender(() => {
    log(
      'afterNextRender',
      'runs once the next time that all components have been rendered to the DOM'
    );
  });

  afterRender = afterRender(() => {
    log(
      'afterNextRender',
      'runs once the next time that all components have been rendered to the DOM'
    );
  });
}
