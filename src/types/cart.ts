import { ProductCart } from './product';

export type Cart = {
    id: string;
    products: ProductCart[];
    tax: number;
    total: number;
}

export type CartNotAuth = {
    id: string;
    quantity: number;
}
