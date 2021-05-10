import { Cart } from 'types';
import { AuthService } from 'services';
import { sessionService } from './sessionService';

const fetchCart = async (id_cart?:string): Promise<Cart> => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    if(sessionService.isAuth()){
        const token = await AuthService.getTokenJwt();
        requestOptions.headers['Authorization']= token;
    }
    else {
        if(id_cart)
            id_cart = "?guestToken=" + id_cart;
    }

    if(!id_cart)
        id_cart = "";

    const res = await fetch(`${process.env.AWS_ENDPOINT}/cart${id_cart}`, requestOptions)
        .catch(() => { throw new Error('Error on fetching all products') });
    const cartReturned = await res.json();

    if (cartReturned.status == 'error')
        throw new Error(cartReturned.message);

    const cart: Cart = cartReturned.data;
    return cart;
};

const addToCart = async (id: string, quantity: number, id_cart?:string): Promise<boolean> => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, quantity })
    }
    if(sessionService.isAuth()){
        const token = await AuthService.getTokenJwt();
        requestOptions.headers['Authorization']= token;
        id_cart="";
    }
    else {
        id_cart = "?guestToken=" + id_cart;
    }
    const res = await fetch(`${process.env.AWS_ENDPOINT}/cart${id_cart}`, requestOptions)
        .catch(() => { throw new Error('Error on adding to cart') });

    const response = await res.json();

    if (response.status == 'error')
        throw new Error(response.message);

    return true;
};

const removeProductFromCart = async (id: string, id_cart?: string): Promise<boolean> => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    if(sessionService.isAuth()){
        const token = await AuthService.getTokenJwt();
        requestOptions.headers['Authorization']= token;
        id_cart="";
    }
    else {
        id_cart = "?guestToken=" + id_cart;
    }
    const res = await fetch(`${process.env.AWS_ENDPOINT}/cart/product/${id}${id_cart}`, requestOptions)
        .catch(() => { throw new Error('Error on removing from cart') });
    const response = await res.json();

    if (response.status == 'error')
        throw new Error(response.message);

    return true;
};

const removeCart = async (id_cart?: string): Promise<boolean> => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    if(sessionService.isAuth()){
        const token = await AuthService.getTokenJwt();
        requestOptions.headers['Authorization']= token;
        id_cart="";
    }
    else {
        id_cart = "?guestToken=" + id_cart;
    }
    const res = await fetch(`${process.env.AWS_ENDPOINT}/cart${id_cart}`, requestOptions)
        .catch(() => { throw new Error('Error on removing the cart') });
    const response = await res.json();

    if (response.status == 'error')
        throw new Error(response.message);

    return true;
};

const updateCart = async ( id: string, quantity: number, id_cart?: string): Promise<boolean> => {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, quantity })
    };
    if(sessionService.isAuth()){
        const token = await AuthService.getTokenJwt();
        requestOptions.headers['Authorization']= token;
        id_cart="";
    }
    else {
        id_cart = "?guestToken=" + id_cart;
    }
    const res = await fetch(`${process.env.AWS_ENDPOINT}/cart/product/${id}${id_cart}`, requestOptions)
        .catch(() => { throw new Error('Error on removing from cart') });
    const response = await res.json();
        
    if (response.status == 'error')
        throw new Error(response.message);
        
    return true;
};

const authenticateCart = async (id_cart:string): Promise<boolean> => {
    const token = await AuthService.getTokenJwt();
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/cart?guestToken=${id_cart}`, requestOptions)
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
    authenticateCart
};