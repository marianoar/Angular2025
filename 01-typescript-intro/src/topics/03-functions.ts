
function addNumbers(a: number, b: number){
    return a + b;
}

const res = addNumbers(1,2);
const result: number = addNumbers(1,2);
const resulta: string = addNumbers(1,2).toString();

console.log({res});
console.log({result});
console.log({resulta});

const addNumbersArrows = (a: number, b: number ) : string =>{
    // return (a + b).toString(); this is deprecated
    return `${(a + b)}`;
}

function multiply(first: number, second?: number , base: number = 2){
    return first * base
}

const multi: string = multiply(5).toString();

interface Person {
    name: string;
    hp: number;
    showHp: ()=> void
}

const healCharacter = (character: Person, amount : number)=>{
    character.hp+=amount;
}

const strider: Person = {
    name: 'Bilbo',
    hp: 89,
    showHp(){
        console.log(`Puntos de vida ${this.hp}`);
    }
}

healCharacter(strider, 10);
strider.showHp();


export {}