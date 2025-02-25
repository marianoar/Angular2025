
export class Person{// se pueden omitir declarar las propiedades y crearlas directamente en el ctor pues JS
    public name?: string;
    public address?: string;

    constructor(name: string, address: string){
        this.name= name;
        this.address = address;
    }
}

const batman = new Person("El Chavo", "Malos Aires");

console.log(batman);

// export class Hero extends Person{
//     constructor(public alterEgo: string, public age: number, public realName: string)
//     {
//         super(alterEgo, 'Sarasa') //llamo al ctor del padre
//     }
// }

export class Hero{ // priorizar composicion sobre herencia
   // public person: Person;

    constructor(
        public alterEgo: string, 
        public age: number, 
        // public realName: string,
        public person: Person)
    {
        this.person = new Person("nombre","direccion");
    }
}

const tony = new Person('Tony Stark', 'NY');
const ironMan = new Hero('Ironman', 43, tony);