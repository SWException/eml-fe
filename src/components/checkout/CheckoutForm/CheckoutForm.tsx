import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import { Button, Spinner } from 'reactstrap';
import {Address} from 'types';
import { AddressesService, AuthService, CheckoutService } from 'services';


const CheckoutForm: React.FC = () => {

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const [id, setId] = useState('');
  const [address, setAddress] = useState<Address[]>([]);

  useEffect(()=>{
    getAddresses()
  }, [])

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    /*window.fetch("https://5qsqmpfpm8.execute-api.eu-central-1.amazonaws.com/dev/createCharge", {
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
      });*/
      createIntent();
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

  const createIntent = async() =>{
    const shipping: string = 'My Address'
    const billing: string = 'My Address'
    const { checkout } = await CheckoutService.fetchCheckout(shipping, billing);
    setId(checkout.id);
    //setClientSecret(checkout.data['payment_intent']['client_secret']);
    console.log(checkout)
  }

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

  const getAddresses = async() => {
    try {
        const { addresses } = await AddressesService.fetchAddresses();
        setAddress(addresses)
        console.log(address);
    } catch(err) {
        console.log(err)
    }
  }

  const confirmPayment = async() => {
    try {
      const { status } = await CheckoutService.confirmCheckout(id);
      console.log(status)
      if(status == "success"){
        //Pagamento andato a buon fine
      }
    } catch(err) {
      console.log(err);
    }
  }

  return (

      <div className="container">
      <div className="py-5 text-center">
        <h1>Checkout form</h1>
    </div>
    <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
            </h4>
            <ul className="list-group mb-3 sticky-top">
                <li className="list-group-item d-flex justify-content-between">
                    <span>Shipping cost</span>
                    <strong>€10</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Taxes</span>
                    <strong>€2</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span><b>Total</b></span>
                    <strong>€20</strong>
                </li>
            </ul>
        </div>
        <div className="col-md-8 order-md-1">
            <h2 className="mb-3">Billing address</h2>
            <form className="needs-validation">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label>First name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="" value="" />
                        <div className="invalid-feedback"> Valid first name is required. </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label>Last name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="" value=""/>
                        <div className="invalid-feedback"> Valid last name is required. </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label >Address</label>
                    <input type="text" className="form-control" id="address" placeholder="1234 Main St"/>
                    <div className="invalid-feedback"> Please enter your shipping address. </div>
                </div>
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <label >Country</label>
                        <input type="text" className="form-control" id="country" placeholder="ex.Padova"/>
                        <div className="invalid-feedback"> Please select a valid country. </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label >State</label>
                        <input type="text" className="form-control" id="state" placeholder="ex.Italy"/>
                        <div className="invalid-feedback"> Please provide a valid state. </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label>Zip</label>
                        <input type="text" className="form-control" id="zip" placeholder=""/>
                        <div className="invalid-feedback"> Zip code required. </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 mb-3" style={{marginTop:"20px"}}>
                        <label>Choose a saved address:</label>
                        <select className="custom-select d-block w-100" id="saveaddress">
                        {address.map((address)=>(
                            <option value={`${address.id}`}>{`${address.address}`}</option>
                        ))}
                    </select>
                        <div className="invalid-feedback"> Please select a valid address. </div>
                    </div>
                </div>
                <h2 className="mb-3" style={{marginTop:"20px"}}>Shipping address</h2>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label>First name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="" value="" />
                        <div className="invalid-feedback"> Valid first name is required. </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label >Last name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="" value="" />
                        <div className="invalid-feedback"> Valid last name is required. </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label>Address</label>
                    <input type="text" className="form-control" id="address" placeholder="1234 Main St"/>
                    <div className="invalid-feedback"> Please enter your shipping address. </div>
                </div>
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <label >Country</label>
                        <input type="text" className="form-control" id="country" placeholder="ex.Padova"/>
                        <div className="invalid-feedback"> Please select a valid country. </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label >State</label>
                        <input type="text" className="form-control" id="state" placeholder="ex.Italy"/>
                        <div className="invalid-feedback"> Please provide a valid state. </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label >Zip</label>
                        <input type="text" className="form-control" id="zip" placeholder=""/>
                        <div className="invalid-feedback"> Zip code required. </div>
                    </div>
                    <div className="custom-control custom-checkbox"style={{marginTop:"20px"}}>
                      <input type="checkbox" className="custom-control-input" id="same-address"/>
                      <label className="custom-control-label">Shipping address is the same as my billing address</label>
                  </div>
                </div>
                <div className="row">
                    <div className="col-md-5 mb-3"style={{marginTop:"20px"}}>
                        <label >Choose a saved address:</label>
                        <select className="custom-select d-block w-100" id="saveaddress">
                        {address.map((address)=>(
                            <option value={`${address.id}`}>{`${address.address}`}</option>
                        ))}
                    </select>
                        <div className="invalid-feedback"> Please select a valid address. </div>
                    </div>
                </div>
                <h2 className="mb-3"  style={{marginTop:"20px"}}>Payment</h2>
                <form onSubmit={handleSubmit}>
                    <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                    <div style={{display: "flex", alignItems: "center", justifyContent:"center", margin: "20px"}}>
                      <Button color="primary" size="lg" onClick={confirmPayment} disabled={processing || disabled || succeeded} id="submit">
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