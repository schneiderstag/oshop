import { Product } from './product';

export class ShoppingCartItem {
    key: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;

    constructor(init?: Partial<ShoppingCartItem>) { //init can be an object that looks like a ShoppingCartItem object. It can have one or more properties.
        Object.assign(this, init); // Copy all the properties from init to this.
    } 

    get totalPrice() { return this.price * this.quantity; }
}