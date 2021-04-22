import { Checkout } from 'types';
import { sessionService } from './sessionService';

interface ResponseCheckout {
    checkout: Checkout
}

interface ConfirmCheckout {
  status: string;
  message: string;
}

const fetchCheckout = async (shippingAddresss: string, billingAddress: string): Promise<ResponseCheckout> => {
  //Da implementare meglio richiesta token jwt
  const addresses = { shippingAddresss, billingAddress }
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
       },
       body: JSON.stringify(addresses)
    };
    const res = await fetch('https://virtserver.swaggerhub.com/swexception4/OpenAPI/0.4.0/checkout', requestOptions)
    const checkoutReturned = await res.json();

    const checkoutData: ResponseCheckout = {
      checkout: {
          status: checkoutReturned.status,
          id: checkoutReturned.id
      }
    };

    return checkoutData;
    
  } catch (error) {
    console.log(error);
  }
};

const confirmCheckout = async (id: string): Promise<ConfirmCheckout> => {
  let token = sessionService.getCookie('token');
  try {
    const requestOptions = {
      method: 'PATCH',
      headers: { 
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Authorization": `${token}`
       }
    };
    const res = await fetch(`https://virtserver.swaggerhub.com/swexception4/OpenAPI/0.4.0/checkout/${id}`, requestOptions)
    const checkoutReturned = await res.json();

    const checkoutData: ConfirmCheckout = {
        status: checkoutReturned.status,
        message: checkoutReturned.message
    };

    return checkoutData;
    
  } catch (error) {
    console.log(error);
  }
};

export const CheckoutService = {
  fetchCheckout,
  confirmCheckout
};