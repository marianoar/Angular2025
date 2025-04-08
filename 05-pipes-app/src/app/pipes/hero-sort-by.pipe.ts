import { Pipe, PipeTransform } from "@angular/core";
import { Color, ColorMap } from "../interfaces/hero.interface";

@Pipe({
    name:'heroSortBy'
})
export class HeroSortByPipe implements PipeTransform{
   
    transform(value: any):any {
        return value;
    }
}
