
import { Cart } from 'types';
import { sessionService } from './sessionService';

interface CartData {
  cart: Cart;
}

interface AddCart {
  status: string;
  message: string;
}

interface RemoveCart {
  status: string;
  message: string;
}


const fetchCart = async (): Promise<CartData> => {
  const token = await sessionService.getCookie('token');

  try {
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Authorization': token,
        'Content-Type': 'application/json',
       }
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/cart`, requestOptions)
    const cartsReturned = await res.json();

    console.log(cartsReturned);
    console.log(cartsReturned.data);

    const cartsData: CartData = {
      cart: {
        id: cartsReturned.data?.id,
        product: (cartsReturned.data?.products)? cartsReturned.data?.products : [],
        tax: cartsReturned.data?.tax,
        total: cartsReturned.data?.total
      }
    };

    return cartsData;
    
  } catch (error) {
    console.log(error);
  }
};


const addToCart = async (quantity: number, id: string): Promise<AddCart> => {
  const token = await sessionService.getCookie('token');
  try {
    const data = { quantity, id };
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/cart`, requestOptions)
    const cartsReturned = await res.json();

    console.log(cartsReturned);

    const addCartData: AddCart = {
      status: cartsReturned.status,
      message: cartsReturned.message
    }

    return addCartData;
  } catch (error) {
    console.log(error);
  }
};

const removeProductFromCart = async (id: string): Promise<RemoveCart> => {
  const token = await sessionService.getCookie('token');
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: { 
        'Authorization': token,
        'Content-Type': 'application/json',
      }
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/cart/product/${id}`, requestOptions)
    const cartsReturned = await res.json();

    console.log(cartsReturned);

    const removeCartData: AddCart = {
      status: cartsReturned.status,
      message: cartsReturned.message
    }

    return removeCartData;
  } catch (error) {
    console.log(error);
  }
};

const removeCart = async (): Promise<RemoveCart> => {
  const token = await sessionService.getCookie('token');
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: { 
        'Authorization': token,
        'Content-Type': 'application/json',
      }
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/cart`, requestOptions)
    const cartsReturned = await res.json();

    console.log(cartsReturned);

    const removeCartData: AddCart = {
      status: cartsReturned.status,
      message: cartsReturned.message
    }

    return removeCartData;
  } catch (error) {
    console.log(error);
  }
};

const updateCart = async (quantity: number, id: string): Promise<AddCart> => {
  const token = await sessionService.getCookie('token');
  try {
    const data = { quantity, id };
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/cart/product/${id}`, requestOptions)
    const cartsReturned = await res.json();

    console.log(cartsReturned);

    const addCartData: AddCart = {
      status: cartsReturned.status,
      message: cartsReturned.message
    }

    return addCartData;
  } catch (error) {
    console.log(error);
  }
};


export const CartService = {
  fetchCart,
  addToCart,
  removeProductFromCart,
  removeCart,
  updateCart,
};