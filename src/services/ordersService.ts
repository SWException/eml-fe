import { Orders, Order } from 'types';
import { AuthService } from 'services';

const fetchOrders = async (status?: string, searchId?: string): Promise<Orders> => {
    const token = await AuthService.getTokenJwt();
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    };
    searchId = (searchId)? `&search=${searchId}` : "";
    const res = await fetch(`${process.env.AWS_ENDPOINT}/orders?status=${status}${searchId}`, requestOptions)
        .catch(() => { throw new Error('Error on fetching orders') });
    
    const ordersReturned = await res.json();
    if (ordersReturned.status == 'error')
        throw new Error(ordersReturned.message);

    const orders: Orders = ordersReturned.data;
    return orders;
};

export const fetchOrder = async (id: string): Promise<Order> => {
    const token = await AuthService.getTokenJwt();
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    };

    const res = await fetch(`${process.env.AWS_ENDPOINT}/orders/${id}`, requestOptions)
        .catch(() => { throw new Error('Error on fetching orders') });
    const orderReturned = await res.json();

    if (orderReturned.status == 'error')
        throw new Error(orderReturned.message);

    const order: Order = orderReturned.data;
    return order;
};


export const updateOrder = async (id: string, newStatus: string): Promise<boolean> => {
    const token = await AuthService.getTokenJwt();

    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: newStatus
        })
    };

    const res = await fetch(`${process.env.AWS_ENDPOINT}/orders/${id}`, requestOptions)
        .catch(() => { throw new Error('Error on updating order') });
    const response = await res.json();

    if (response.status == 'error')
        throw new Error(response.message);

    return true;
};


export const refundOrder = async (id: string): Promise<boolean> => {
    const token = await AuthService.getTokenJwt();
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    };

    const res = await fetch(`${process.env.AWS_ENDPOINT}/orders/${id}/refund`, requestOptions)
        .catch(() => { throw new Error('Error on updating order') });
    const response = await res.json();

    if (response.status == 'error')
        throw new Error(response.message);

    return true;
};

export const OrdersService = {
    fetchOrder,
    fetchOrders,
    updateOrder,
    refundOrder
};