import { Checkout } from 'types';

interface ResponseCheckout {
    checkout: Checkout
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
          data: checkoutReturned.data
      }
    };

    return checkoutData;
    
  } catch (error) {
    console.log(error);
  }
};

export const CheckoutService = {
  fetchCheckout
};