import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'canFly'
})
export default class CanFlyPipe implements PipeTransform{
   
    transform(value: boolean):string {
        return value ? 'Puede volar' : 'No puede volar';
    }
}
