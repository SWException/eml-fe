import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import { Button, Spinner } from 'reactstrap'
import styles from './CheckoutForm.module.css'
import AddressForm from "../AddressForm";


const CheckoutForm: React.FC = () => {

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
    <form id="payment-form" onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.div}>
      <div className={styles.address} style={{marginRight: "160px"}}>
      <h1>BILLING ADDRESS</h1>
      <AddressForm/>
      <p className={styles.p}><b>Choose one: (solo se autenticato)</b></p>
      <select>
        <option>Address 1</option>
        <option>Address 2</option>
        <option>Address 3</option>
      </select>
      <br/>
      </div>
      <div className={styles.address}>
      <h1>SHIPPING ADDRESS</h1>
      <AddressForm/>
      <p className={styles.p} style={{textDecoration: "underline"}}>OR</p>
      <Button color="primary" size="lg" type="button">Autofill with Billing Data</Button>
      <p className={styles.p}><b>Choose one: (solo se autenticato)</b></p>
      <select>
        <option>Address 1</option>
        <option>Address 2</option>
        <option>Address 3</option>
      </select>
      </div>
      </div>
      <p className={styles.p}><b>Shipping cost: 10€</b></p>
      <p className={styles.p}><b>Total cost: € total</b></p>
      <div className={styles.payment}>
      <h1 marginTop="5px">PAYMENT</h1>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <div style={{display: "flex", alignItems: "center", justifyContent:"center", margin: "10px"}}>
        <Button color="primary" size="lg" disabled={processing || disabled || succeeded} id="submit">
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
      <p className={styles.p}>
        Payment succeeded, see the result in your
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>
      </div>
      <Button color="primary" size="lg" style={{marginTop:"20px"}} >Cancel the Checkout</Button>
    </form> 
  );
}

export default CheckoutForm;