
interface Product {
    description: string;
    price: number;
}

const phone: Product = {
    description: 'Nokia A1',
    price: 125
}

const tablet: Product = {
    description: 'Ulala',
    price: 250
}

interface taxCalculationOptions{
    tax: number;
    products: Product[]
}

function taxCalculation(options: taxCalculationOptions): [number,number]{

    const {tax, products} = options;
    let total= 0;

    products.forEach(({price})=>{
        total += price
    });

    return [total, total * tax];

}

const shoppingCart = [phone, tablet];
const tax = 0.21;

const [total, taxResult] = taxCalculation({
    products: shoppingCart,
    tax: tax // se podria suprimir un tax pues tiene el mismo nombre y JS lo resuelve
});

console.log('Total: ', total);
console.log('Tax: ', taxResult);
export{}