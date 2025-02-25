function classDecorator<T extends {new (...arg:any[]): {}}>(constructor:T){
    return class extends constructor{
        newProperty = 'new property';
        hola = 'override';
    }

}
//añade funcionalidad o cambia el comportamiento de la clase
@classDecorator
export class SuperClass{
    public myPropertiy: string = 'qwerty';

    print(){
        console.log("soy superclass");
    }
}

console.log(SuperClass);
const myClass = new SuperClass();
console.log(myClass);