import React from "react";;
import { CheckoutForm } from "components/checkout";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { ClientLayout } from "components/layouts/client-layout";

const stripePromise = loadStripe('pk_test_51IJio8KnuuioxVCyNkNNVQvZ7pVmXvDHmpesl62KNjoKA5NKsI4GbQwcgygl34JDSjXup5IsJGFQ9ECazwbNHT6w005VgbREdZ');

const Checkout: React.FC = () => {
  return (
    <ClientLayout header>
      <div className="card-stripe">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </ClientLayout>
  );
};

export default Checkout;
