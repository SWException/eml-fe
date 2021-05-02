import { ProductCart } from './product';

export type Cart = {
    id: string;
    products: ProductCart[];
    tax: number;
    total: number;
}
