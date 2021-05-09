import { PaymentIntent } from 'types';
import { AuthService } from 'services';

const fetchCheckout = async (shippingAddress: string, billingAddress: string): Promise<PaymentIntent> => {
    const token = await AuthService.getTokenJwt();
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
        },
        body: JSON.stringify({ shippingAddress, billingAddress })
    };
    console.log(requestOptions);
    const res = await fetch(`${process.env.AWS_ENDPOINT}/checkout`, requestOptions)
        .catch(() => { throw new Error('Error on creating the payment intent') });
    const paymentIntentReturned = await res.json();

    if (paymentIntentReturned.status == 'error')
        throw new Error(paymentIntentReturned.message);

    const paymentIntent: PaymentIntent = paymentIntentReturned.data;
    return paymentIntent;
};

const confirmCheckout = async (id: string): Promise<boolean> => {
    const token = await AuthService.getTokenJwt();

    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
        }
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/checkout/${id}`, requestOptions)
        .catch(() => { throw new Error('Error on confirming the checkout') });
    const response = await res.json();

    if (response.status == 'error')
        throw new Error(response.message);

    return true;
};

const deleteCheckout = async (id: string): Promise<boolean> => {
    const token = await AuthService.getTokenJwt();
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
        }
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/checkout/${id}`, requestOptions)
        .catch(() => { throw new Error('Error deleteing checkout') });
    const response = await res.json();

    if (response.status == 'error')
        throw new Error(response.message);

    return true;

};

export const CheckoutService = {
    fetchCheckout,
    confirmCheckout,
    deleteCheckout
};