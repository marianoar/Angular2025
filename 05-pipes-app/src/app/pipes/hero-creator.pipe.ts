import { Pipe, PipeTransform } from "@angular/core";
import { Creator } from "../interfaces/hero.interface";

@Pipe({
    name:'heroCreator'
})
export class HeroCreatorrPipe implements PipeTransform{
   
    transform(value: Creator):string {
        return value === 0 ? 'dc': 'marvel';
    }
}
