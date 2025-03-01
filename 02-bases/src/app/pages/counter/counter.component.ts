import { Component } from "@angular/core";

@Component({
    template:`<h1>Hola mundo, hola {{name}}</h1>`,
    templateUrl:"./counter.component.html",
})

export class CounterPageComponent{
name: string  = "alguien";
counter:number = 1;

sumar (value: number){
    this.counter+=value;
}
reset(){
    this.counter = 0;
}
}