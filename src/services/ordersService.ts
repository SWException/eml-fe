import { OrdersData, OrderData } from 'types';
import { sessionService } from './sessionService';

interface Response {
    status: string;
    message: string;
}

const fetchOrders = async (): Promise<OrdersData> => {
    const token = sessionService.getCookie('token');
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        console.log(token);

        const res = await fetch(`${process.env.AWS_ENDPOINT}/orders`, requestOptions);
        const orders = await res.json();

        console.log("fetchOrders data", orders.data);

        const ordersData: OrdersData = {
            orders: orders.data,
        };

        console.log("fetchOrders", ordersData);

        return ordersData;

    } catch (error) {
        throw new Error('Error on fetching Products');
    }
};

export const fetchOrder = async (orderid: string): Promise<OrderData> => {
    const token = sessionService.getCookie('token');
    try {
        console.log("Start fetchOrder");

        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        console.log(token);

        const res = await fetch(`${process.env.AWS_ENDPOINT}/orders/${orderid}`, requestOptions)
        const data = await res.json();

        const orderData: OrderData = {
            order: data.data
        };

        return orderData;
    } catch (error) {
        throw new Error(error);
    }
};

export const updateOrder = async (orderid: string): Promise<Response> => {
    const token = sessionService.getCookie('token');
    try {
        console.log("Start fetchOrder");

        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };

        const res = await fetch(`${process.env.AWS_ENDPOINT}/orders/${orderid}`, requestOptions)
        const data = await res.json();

        const orderData: Response = {
            status: data.status,
            message: data.message
        };

        return orderData;
    } catch (error) {
        throw new Error(error);
    }
};

export const refundOrder = async (orderid: string): Promise<Response> => {
    const token = sessionService.getCookie('token');
    try {
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };

        const res = await fetch(`${process.env.AWS_ENDPOINT}/orders/${orderid}/refund`, requestOptions)
        const data = await res.json();

        const orderData: Response = {
            status: data.status,
            message: data.message
        };

        return orderData;
    } catch (error) {
        throw new Error(error);
    }
};


export const OrdersService = {
    fetchOrder,
    fetchOrders,
    updateOrder,
    refundOrder
};