
const name: string = "batman";

let hpPoints: number | string = 87;
hpPoints = "Full";

// o puedo hacer que el string sea una palabra especifica; camelCase stricto
let hpTwo: number | 'Hola';
hpTwo = 'Hola';

const isAlive : boolean = true;

console.log({
    name, hpPoints, isAlive
});

export {}; // transforma el file en module