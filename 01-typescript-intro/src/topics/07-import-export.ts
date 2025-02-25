import { Product, taxCalculation } from "./06-function-destructuring";

const shoppingCart: Product[] = [
    {
        description: 'Alcatel', price: 123
    },
    { 
        description: 'Hdmi', price: 233 
    }
];

const [total, tax] = taxCalculation({
    products: shoppingCart,
    tax: 0.21
});

console.log('Total: ', total);
console.log('Tax: ', tax);