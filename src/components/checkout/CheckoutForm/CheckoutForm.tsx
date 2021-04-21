import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import { Button, Spinner } from 'reactstrap';


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
      setError(`Payment failed. Refresh the page to pay again.`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setMessage("Payment succeeded, see the result in your Stripe Dashboard");
    }
  };

  return (

      <div class="container">
      <div class="py-5 text-center">
        <h1>Checkout form</h1>
    </div>
    <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">Your cart</span>
            </h4>
            <ul class="list-group mb-3 sticky-top">
                <li class="list-group-item d-flex justify-content-between">
                    <span>Shipping cost</span>
                    <strong>€10</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span>Taxes</span>
                    <strong>€2</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span><b>Total</b></span>
                    <strong>€20</strong>
                </li>
            </ul>
        </div>
        <div class="col-md-8 order-md-1">
            <h2 class="mb-3">Billing address</h2>
            <form class="needs-validation" novalidate="">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="firstName">First name</label>
                        <input type="text" class="form-control" id="firstName" placeholder="" value="" />
                        <div class="invalid-feedback"> Valid first name is required. </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="lastName">Last name</label>
                        <input type="text" class="form-control" id="lastName" placeholder="" value=""/>
                        <div class="invalid-feedback"> Valid last name is required. </div>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="address">Address</label>
                    <input type="text" class="form-control" id="address" placeholder="1234 Main St"/>
                    <div class="invalid-feedback"> Please enter your shipping address. </div>
                </div>
                <div class="row">
                    <div class="col-md-5 mb-3">
                        <label for="country">Country</label>
                        <input type="text" class="form-control" id="country" placeholder="ex.Padova"/>
                        <div class="invalid-feedback"> Please select a valid country. </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="state">State</label>
                        <input type="text" class="form-control" id="state" placeholder="ex.Italy"/>
                        <div class="invalid-feedback"> Please provide a valid state. </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="zip">Zip</label>
                        <input type="text" class="form-control" id="zip" placeholder=""/>
                        <div class="invalid-feedback"> Zip code required. </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-5 mb-3" style={{marginTop:"20px"}}>
                        <label for="saveaddress">Choose a saved address:</label>
                        <select class="custom-select d-block w-100" id="country">
                            <option value="">Choose...</option>
                            <option>Address1</option>
                            <option>Address2</option>
                        </select>
                        <div class="invalid-feedback"> Please select a valid address. </div>
                    </div>
                </div>
                <h2 class="mb-3" style={{marginTop:"20px"}}>Shipping address</h2>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="firstName">First name</label>
                        <input type="text" class="form-control" id="firstName" placeholder="" value="" />
                        <div class="invalid-feedback"> Valid first name is required. </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="lastName">Last name</label>
                        <input type="text" class="form-control" id="lastName" placeholder="" value="" />
                        <div class="invalid-feedback"> Valid last name is required. </div>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="address">Address</label>
                    <input type="text" class="form-control" id="address" placeholder="1234 Main St"/>
                    <div class="invalid-feedback"> Please enter your shipping address. </div>
                </div>
                <div class="row">
                    <div class="col-md-5 mb-3">
                        <label for="country">Country</label>
                        <input type="text" class="form-control" id="country" placeholder="ex.Padova"/>
                        <div class="invalid-feedback"> Please select a valid country. </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="state">State</label>
                        <input type="text" class="form-control" id="state" placeholder="ex.Italy"/>
                        <div class="invalid-feedback"> Please provide a valid state. </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="zip">Zip</label>
                        <input type="text" class="form-control" id="zip" placeholder=""/>
                        <div class="invalid-feedback"> Zip code required. </div>
                    </div>
                    <div class="custom-control custom-checkbox"style={{marginTop:"20px"}}>
                      <input type="checkbox" class="custom-control-input" id="same-address"/>
                      <label class="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
                  </div>
                </div>
                <div class="row">
                    <div class="col-md-5 mb-3"style={{marginTop:"20px"}}>
                        <label for="saveaddress">Choose a saved address:</label>
                        <select class="custom-select d-block w-100" id="country">
                            <option value="">Choose...</option>
                            <option>Address1</option>
                            <option>Address2</option>
                        </select>
                        <div class="invalid-feedback"> Please select a valid address. </div>
                    </div>
                </div>
                <h2 class="mb-3"  style={{marginTop:"20px"}}>Payment</h2>
                <form onSubmit={handleSubmit}>
                    <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                    <div style={{display: "flex", alignItems: "center", justifyContent:"center", margin: "20px"}}>
                      <Button color="primary" size="lg" disabled={processing || disabled || succeeded} id="submit">
                        <span id="button-text">
                          {processing ? (
                            <Spinner />
                          ) : (
                            "Continue with checkout. Pay now!"
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
                </form>
                </form>
        </div>
    </div>
</div>
  );
};

export default CheckoutForm;