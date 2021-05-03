import { Address } from "types";

export type Order = {
    billingAddress: Address;
    cart: OrderCart;
    orderStatus: string;
    orderid: string;
    shippingAddress: Address;
    shippingFee: number;
    timestamp: string;
    total: number;
    userid: string;
};

export type OrderCart = {
    id: string;
    products: OrderProducts;
    tax: number;
    total: number;
    itemCount: number;
}

export type OrderProduct = {
    id: string;
    name: string;
    primaryPhoto: string;
    price: number;
    tax: number;
    total: number;
    quantity: number;
}

export type Orders = Order[];
export type OrderProducts = OrderProduct[];
