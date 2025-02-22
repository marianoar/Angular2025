
const skills = ['algo', 'live', 'counter'];

//las constantes son mas ligeras que una variable let porque no tienen metodos de asignacion

//este es un objeto literal de JS
const strider = {
    name: 'Aquaman',
    hp: 100,
    skills:[ 'uno', 'dos']
}

interface Personaje {
    name: string;
    hp: number;
    skills: string[];
    origen?: string;  // -> el ? convierte la prop en opcional, de esta manera puedo obviar la propiedad en el objeto
}

const striderTwo: Personaje = {
    name: 'Aquaman',
    hp: 100,
    skills: ['uno', 'dos'],
    origen: ""
}

const striderThree: Personaje = {
    name: 'Aquaman',
    hp: 100,
    skills: ['uno', 'dos'],
}

console.table(striderTwo);
export {}