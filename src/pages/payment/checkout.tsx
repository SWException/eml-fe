import React from "react";;
import { CheckoutForm } from "components/checkout";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { CustomerLayout } from "components/layouts/CustomerLayout";
import styles from "styles/Checkout.module.css"

const stripePromise = loadStripe('pk_test_51IJio8KnuuioxVCyNkNNVQvZ7pVmXvDHmpesl62KNjoKA5NKsI4GbQwcgygl34JDSjXup5IsJGFQ9ECazwbNHT6w005VgbREdZ');

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
