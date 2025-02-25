export interface Passenger{
    name: string;
    children?: string[];
}

const p1: Passenger = {
    name: 'yo',
}
const p2: Passenger = {
    name: 'fulano',
    children:['Anastasia', 'Juana']
}

const printChildren = (pass: Passenger)=>{
    const howManyChildren = pass.children?.length || 0;
    // const howManyChildren = pass.children!.length;  //Non-null assertion operator

    console.log(howManyChildren);
}

printChildren(p1);
printChildren(p2);