import { Products, Address } from "types";

export type Order = {
    userid: string;
    timestamp:string;
    orderid:string;
    orderStatus:string;
    cart:OrderCart;
    billingAddress:Address;
    shippingAddress:Address;
};
export interface OrderCart {
    id: string;
    products: OrderProducts;
    tax: number;
    total: number;
  }

export interface OrderProduct{
    productId: string;
    name: string;
    description: string;
    primaryPhoto: string;
    secondaryPhotos?: string[];
    category: string;
    price: number;
    tax: number;
    show: boolean;
    showHome: boolean;
    stock: number;
    quantity: number;
}
export type Orders = Order[];
export type OrderProducts = OrderProduct[];
 
export interface OrdersData {
    orders: Orders[];
}

export interface OrderData {
    order: Order;
}
