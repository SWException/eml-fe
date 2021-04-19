import { Card } from 'reactstrap';
import { Cart } from 'types';

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
  //Da implementare meglio richiesta token jwt
  try {
    const requestOptions = {
      method: 'GET',
      headers: { 
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        //Should add jwt token
       }
    };
    const res = await fetch('https://virtserver.swaggerhub.com/swexception4/OpenAPI/0.4.0/cart', requestOptions)
    const cartsReturned = await res.json();

    console.log(cartsReturned);
    console.log(cartsReturned.data);

    const cartsData: CartData = {
      cart: {
        id: cartsReturned.data.id,
        product: cartsReturned.data.products,
        tax: cartsReturned.data.tax,
        total: cartsReturned.data.total
      }
    };

    return cartsData;
    
  } catch (error) {
    console.log(error);
  }
};


const addCart = async (quantity: number, id: string): Promise<AddCart> => {
  //add Jwt 
  try {
    const data = { quantity, id };
    const requestOptions = {
      method: 'POST',
      headers: { 
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };
    const res = await fetch('https://virtserver.swaggerhub.com/swexception4/OpenAPI/0.4.0/cart', requestOptions)
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

const removeCart = async (id: string): Promise<RemoveCart> => {
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: { 
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
      }
    };
    const res = await fetch(`https://virtserver.swaggerhub.com/swexception4/OpenAPI/0.4.0/cart/product/${id}`, requestOptions)
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

//add deletetotalcart

/*
const updateCart = async (cartId: string, quantity: number): Promise<void> => {
  try {
    const url = `/carts/${cartId}`;
    return await apiClient.patch(url, { quantity });
  } catch (error) {
    throw new Error(catchError(error));
  }
};
*/

export const CartService = {
  fetchCart,
  addCart,
  removeCart,
  //updateCart,
};