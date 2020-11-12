import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = []; // Since we're using the push method, initializing to an empty array to avoid null exception error.

    constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) { 
        this.itemsMap = itemsMap || {}; // Initialize itemsMap to avoid null exception error.

        for (let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem({ ...item, key: productId })); 
            // ... is the spread operator. When you apply this operator, TypeScript iterates over all the properties of this object and add them here.
            // Push a new ShoppingCart object that has all the properties of the item + key which is the productId
        }
    }

    getQuantity(product: Product) {
        if (!this.itemsMap) // This is required here (not added by Mosh) to prevent null ref error when the product card component.
            return 0;       // checks the quantity of every item and renders the big 'Add to cart' button or the qty in the cart.

        let item = this.itemsMap[product.key]; // Returns the reference to the shopping cart item.
        return item ? item.quantity : 0;
      }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap) 
            count += this.itemsMap[productId].quantity;

        return count;
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items)
            sum += this.items[productId].totalPrice;
            
        return sum;
    }
}