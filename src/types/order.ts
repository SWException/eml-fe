import {Address} from "./addresses"
import {Cart} from "./cart"

export type Order = {
    userid: string;
    timestamp:string;
    orderid:string;
    orderStatus:string;
    cart:Cart;
    billingaddress:Address;
    shippingAddress:Address;
};

export type Orders = Order[];
 
export interface OrdersData {
    orders: Orders[];
}

export interface OrderData {
    order: Order;
}
