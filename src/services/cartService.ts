import { Cart } from 'types';
import { sessionService } from 'services/sessionService';

const fetchCart = async (): Promise<Cart> => {
    const token = sessionService.getCookie('token');
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        }
    };

    const res = await fetch(`${process.env.AWS_ENDPOINT}/cart`, requestOptions)
        .catch(() => { throw new Error('Error on fetching all products') });
    const cartReturned = await res.json();

    if (cartReturned.status == 'error')
        throw new Error(cartReturned.message);

    const cart: Cart = cartReturned.data;
    return cart;
};


const addToCart = async (id: string, quantity: number): Promise<boolean> => {
    const token = sessionService.getCookie('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, quantity })
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/cart`, requestOptions)
        .catch(() => { throw new Error('Error on adding to cart') });

    const response = await res.json();

    if (response.status == 'error')
        throw new Error(response.message);

    return true;
};

const removeProductFromCart = async (id: string): Promise<boolean> => {
    const token = sessionService.getCookie('token');
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        }
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/cart/product/${id}`, requestOptions)
        .catch(() => { throw new Error('Error on removing from cart') });
    const response = await res.json();

    if (response.status == 'error')
        throw new Error(response.message);

    return true;
};

const removeCart = async (): Promise<boolean> => {
    const token = sessionService.getCookie('token');
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        }
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/cart`, requestOptions)
        .catch(() => { throw new Error('Error on removing the cart') });
    const response = await res.json();

    if (response.status == 'error')
        throw new Error(response.message);

    return true;
};

const updateCart = async ( id: string,quantity: number): Promise<boolean> => {
    const token = sessionService.getCookie('token');
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, quantity})
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/cart/product/${id}`, requestOptions)
        .catch(() => { throw new Error('Error on removing from cart') });
    const response = await res.json();
        
    if (response.status == 'error')
        throw new Error(response.message);
        
    return true;
};

export const CartService = {
    fetchCart,
    addToCart,
    removeProductFromCart,
    removeCart,
    updateCart,
};