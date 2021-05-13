import React from "react";
import { CheckoutForm } from "components/checkout";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CustomerLayout } from "components/layouts/CustomerLayout";

/**
 * TODO: Aggiungere pagina intermedia tra Cart e Checkout per fare
 * scegliere al cliente il BillingAddress e il ShippingAddress
 */

const stripePromise = loadStripe(process.env.STRIPE_TOKEN, {locale: 'en'});

const Checkout: React.FC = () => {
    return (
        <CustomerLayout header>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </CustomerLayout>
    );
};

export default Checkout;
