import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Button, Spinner } from 'reactstrap'


export default function CheckoutForm() {

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window.fetch("https://5qsqmpfpm8.execute-api.eu-central-1.amazonaws.com/dev/createCharge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({items: [{ "id": "demo" }]})
      })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(data => {
        setClientSecret(data['paymentIntent']['client_secret']);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement

    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };


  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setMessage('Pagamento avvenuto con successo!');
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="stripe-form">
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <div style={{display: "flex", alignItems: "center", justifyContent:"center", margin: "10px"}}>
        <Button disabled={processing || disabled || succeeded} id="submit">
          <span id="button-text">
            {processing ? (
              <Spinner />
            ) : (
              "Pay now"
            )}
          </span>
        </Button>
      </div>
      {/* Show any error that happens when processing the payment*/}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {message ? (
        <div style={{
          backgroundColor: "green",
          borderRadius: "10px",
          padding: "5px",
          margin: "5px"}}>
          {message}
        </div>
      ) : (
        null
      )}
      <p>
        Payment succeeded, see the result in your
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>
    </form>
  );
}