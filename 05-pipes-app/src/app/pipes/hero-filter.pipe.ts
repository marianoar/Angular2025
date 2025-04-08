import { Pipe, PipeTransform } from "@angular/core";
import { Hero } from "../interfaces/hero.interface";

@Pipe({
    name:'heroFilter'
})
export default class HeroFilterPipe implements PipeTransform{
   
    transform(value: Hero[], search:string):Hero[] {
        if(!search)
            return value;
        search = search.toLowerCase();

        return value.filter(
           h=>  h.name.toLowerCase().includes(search)
        );
    }
}