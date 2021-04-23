import { Product, ProductCart } from './product';

export interface Cart {
  id: string;
  product: ProductCart[];
  tax: number;
  total: number;
}

export interface AddCart {
  status: string;
  message: string;
}

//cart.product per array di prodotti
/*export interface Carts {
  carts: Cart;
}*/