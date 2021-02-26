import React, { useState } from "react";;
import CheckoutForm from "../../components/CheckoutForm";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IJio8KnuuioxVCyNkNNVQvZ7pVmXvDHmpesl62KNjoKA5NKsI4GbQwcgygl34JDSjXup5IsJGFQ9ECazwbNHT6w005VgbREdZ');

const Checkout = () => {
  return (
    <div className="card-stripe">
      <h2> Payment Method </h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Checkout;
