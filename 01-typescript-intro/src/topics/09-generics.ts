
export function whatsMyType<T>(arg: T): T{
    return arg;
}

// T entonces al identificar el tipo tengo acceso a los metodos correspondientes
let amIString = whatsMyType<string>('HM');
let amINumber = whatsMyType<number>(99);
let amIArray = whatsMyType<number[]>([1,2,3]);