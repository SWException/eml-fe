import React from "react";;
import { CheckoutForm } from "components/checkout";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IJio8KnuuioxVCyNkNNVQvZ7pVmXvDHmpesl62KNjoKA5NKsI4GbQwcgygl34JDSjXup5IsJGFQ9ECazwbNHT6w005VgbREdZ');

const Checkout: React.FC = () => {
  return (
    <>
      <div className="card-stripe">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </>
  );
};

export default Checkout;
