import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

@Component({
    template: `<h1>Hola mundo, hola {{name}}</h1>`,
    templateUrl: "./counter.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush // desactiva el zone.js para este component
})

export class CounterPageComponent {
    name: string = "alguien";
    counter: number = 1;

    counterSignal = signal(10); //WritableSignal

    constructor(){
        setInterval(()=>{
            // this.sumar(1);
            this.counter+=1;
            this.counterSignal.update( currentValue => currentValue+1);
            console.log('tick');
        }, 2000);
    }
    sumar(value: number) {
        this.counter += value;
        this.counterSignal.update(currectValue => currectValue + value);
    }
    reset() {
        this.counter = 0;
        this.counterSignal.set(0);
    }
}