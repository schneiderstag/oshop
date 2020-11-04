import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './product';

export interface ShoppingCartItem {
    product: Product;
    quantity: number;
}