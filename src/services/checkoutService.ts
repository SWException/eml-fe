import { Checkout } from 'types';
import { sessionService } from './sessionService';

interface ResponseCheckout {
    checkout: Checkout
}

interface ConfirmCheckout {
  status: string;
  message: string;
}

const fetchCheckout = async (shippingAddress: string, billingAddress: string): Promise<ResponseCheckout> => {
  let token = sessionService.getCookie('token');
  const addresses = { shippingAddress, billingAddress }
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        "Authorization": `${token}`
       },
       body: JSON.stringify(addresses)
    };
    console.log(requestOptions);
    const res = await fetch(`${process.env.AWS_ENDPOINT}/checkout`, requestOptions)
    const checkoutReturned = await res.json();

    const checkoutData: ResponseCheckout = {
      checkout: {
          status: checkoutReturned.status,
          id: checkoutReturned.data.id,
          secret: checkoutReturned.data.secret,
      }
    };
    console.log("checkout", checkoutData);
    
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
        'Content-Type': 'application/json',
        "Authorization": `${token}`
       }
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/checkout/${id}`, requestOptions)
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