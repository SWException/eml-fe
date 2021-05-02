import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Spinner } from 'reactstrap';
import { Address, Addresses, Checkout } from 'types';
import { AddressesService, CheckoutService } from 'services';

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
    const [checkoutRet, setCheckout] = useState<Checkout>({
        secret: '',
        id: '',
        status: ''
    })

    const [address, setAddress] = useState<Address[]>([]);
    const [shippingAddress, setShippingAddress] = useState<Address>({
        id: 'a5a8e464-f5be-4869-9c3b-cabf6de3ec96',
        description: '',
        recipientName: '',
        recipientSurname: '',
        address: '',
        city: '',
        code: '',
        district: '',
        user: ''
    });
    const [billingAddress, setbillingAddress] = useState<Address>({
        id: 'a5a8e464-f5be-4869-9c3b-cabf6de3ec96',
        description: '',
        recipientName: '',
        recipientSurname: '',
        address: '',
        city: '',
        code: '',
        district: '',
        user: ''
    });

    useEffect(() => {
        getAddresses();
    }, [])

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

    const createIntent = async (): Promise<string> => {
        try {
            const shipping = 'a5a8e464-f5be-4869-9c3b-cabf6de3ec96';
            const billing = 'a5a8e464-f5be-4869-9c3b-cabf6de3ec96';
            const { checkout } = await CheckoutService.fetchCheckout(shippingAddress.id, billingAddress.id);
            //const secret = await stripe.PaymentIntents.retrieve(checkout.id);
            setId(checkout.id);
            setClientSecret(checkout.secret);
            setCheckout({
                ...checkoutRet,
                secret: checkout.secret,
                id: checkoutRet.id,
                status: checkoutRet.status
            });
            console.log(clientSecret)
            console.log(checkout.secret)
            return checkout.secret;
        }
        catch (e) {
            console.log(e.message);
            console.log('There is a problem')
        }
    }

    const handleChange = async (event) => {
        // Listen for changes in the CardElement

        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };


    const handleSubmit = async ev => {
        console.log("STRART STRIPE");

        ev.preventDefault();
        setProcessing(true);
        await createIntent().then((res) => {
            console.log(res);
            confirmPaymentStripe(res);
        })

    };

    const confirmPaymentStripe = async (secret) => {
        const payload = await stripe.confirmCardPayment(secret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });
        console.log("STRIPE RES", payload);

        if (payload.error) {
            setError(`Payment failed. Refresh the page to pay again.`);
            setProcessing(false);
        }
        else {
            confirmPayment();
            setError(null);
            setProcessing(false);
            setSucceeded(true);
            setMessage("Payment succeeded, see the result in your Stripe Dashboard");
        }
    }

    const getAddresses = async () => {
        try {
            const addresses: Addresses  = await AddressesService.fetchAddresses();
            setAddress(addresses);
            console.log(address);
        }
        catch (err) {
            console.log(err)
        }
    }

    const confirmPayment = async () => {
        try {
            const { status } = await CheckoutService.confirmCheckout(id);
            console.log("HAI LETTO ERA LO STATUS");
            console.log(status);
            if (status == "success") {
                //Pagamento andato a buon fine
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const setAddressToShow = (name: string, id: string) => {
        let addressFound: Address;
        address.forEach(add => {
            if (add.id == id) {
                return addressFound = add;
            }
        })
        if (name == 'billing') {
            setbillingAddress({
                ...billingAddress,
                id: addressFound.id,
                description: addressFound.description,
                recipientName: addressFound.recipientName,
                recipientSurname: addressFound.recipientSurname,
                address: addressFound.address,
                city: addressFound.city,
                code: addressFound.code,
                district: addressFound.district
            })
        }
        else {
            setShippingAddress({
                ...billingAddress,
                id: addressFound.id,
                description: addressFound.description,
                recipientName: addressFound.recipientName,
                recipientSurname: addressFound.recipientSurname,
                address: addressFound.address,
                city: addressFound.city,
                code: addressFound.code,
                district: addressFound.district
            })
        }
    }

    return (

        <div className="container">
            <div className="py-5 text-center">
                <h1>Checkout form</h1>
            </div>
            <div className="row">
                <div className="col-md-8 order-md-1">
                    <h2 className="mb-3">Billing address</h2>
                    <form className="needs-validation">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>First name</label>
                                <input type="text" className="form-control" onChange={(e) => {
                                    setbillingAddress({
                                        ...billingAddress,
                                        recipientName: e.target.value
                                    })
                                }} id="firstName" placeholder="" value={billingAddress.recipientName} />
                                <div className="invalid-feedback">{`${billingAddress.recipientName}`}</div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Last name</label>
                                <input type="text" className="form-control" onChange={(e) => {
                                    setbillingAddress({
                                        ...billingAddress,
                                        recipientSurname: e.target.value
                                    })
                                }} id="lastName" placeholder="" value={billingAddress.recipientSurname} />
                                <div className="invalid-feedback">{`${billingAddress.recipientSurname}`}</div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label >Address</label>
                            <input type="text" className="form-control" onChange={(e) => {
                                setbillingAddress({
                                    ...billingAddress,
                                    address: e.target.value
                                })
                            }} id="address" value={billingAddress.address} placeholder="1234 Main St" />
                            <div className="invalid-feedback">{billingAddress.address}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-5 mb-3">
                                <label >Country</label>
                                <input type="text" className="form-control" onChange={(e) => {
                                    setbillingAddress({
                                        ...billingAddress,
                                        city: e.target.value
                                    })
                                }} id="country" value={billingAddress.city} placeholder="ex.Padova" />
                                <div className="invalid-feedback">{billingAddress.city}</div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label >State</label>
                                <input type="text" className="form-control" onChange={(e) => {
                                    setbillingAddress({
                                        ...billingAddress,
                                        district: e.target.value
                                    })
                                }} id="state" value={billingAddress.district} placeholder="ex.Italy" />
                                <div className="invalid-feedback">{billingAddress.district}</div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label>Zip</label>
                                <input type="text" className="form-control" onChange={(e) => {
                                    setbillingAddress({
                                        ...billingAddress,
                                        code: e.target.value
                                    })
                                }} id="zip" value={billingAddress.code} placeholder="" />
                                <div className="invalid-feedback">{billingAddress.code}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5 mb-3" style={{ marginTop: "20px" }}>
                                <label>Choose a saved address:</label>
                                <select className="custom-select d-block w-100" id="saveaddress">
                                    {address.map((address) => (
                                        <option onClickCapture={() => { setAddressToShow('billing', address.id) }} value={`${address.id}`}>
                                            {`${address.address}`}
                                        </option>
                                    ))}
                                </select>
                                <div className="invalid-feedback"> Please select a valid address. </div>
                            </div>
                        </div>
                        <h2 className="mb-3" style={{ marginTop: "20px" }}>Shipping address</h2>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>First name</label>
                                <input type="text" className="form-control" id="firstName" onChange={(e) => {
                                    setShippingAddress({
                                        ...shippingAddress,
                                        recipientName: e.target.value
                                    })
                                }} placeholder="" value={shippingAddress.code} />
                                <div className="invalid-feedback"> Valid first name is required. </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label >Last name</label>
                                <input type="text" className="form-control" id="lastName" onChange={(e) => {
                                    setShippingAddress({
                                        ...shippingAddress,
                                        recipientSurname: e.target.value
                                    })
                                }} placeholder="" value={shippingAddress.code} />
                                <div className="invalid-feedback"> Valid last name is required. </div>
                            </div>

                        </div>
                        <div className="mb-3">
                            <label>Address</label>
                            <input type="text" className="form-control" onChange={(e) => {
                                setShippingAddress({
                                    ...shippingAddress,
                                    address: e.target.value
                                })
                            }} id="address" value={shippingAddress.code} placeholder="1234 Main St" />
                            <div className="invalid-feedback"> Please enter your shipping address. </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5 mb-3">
                                <label >Country</label>
                                <input type="text" className="form-control" onChange={(e) => {
                                    setShippingAddress({
                                        ...shippingAddress,
                                        city: e.target.value
                                    })
                                }} id="country" value={shippingAddress.code} placeholder="ex.Padova" />
                                <div className="invalid-feedback"> Please select a valid country. </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label >State</label>
                                <input type="text" className="form-control" onChange={(e) => {
                                    setShippingAddress({
                                        ...shippingAddress,
                                        district: e.target.value
                                    })
                                }} id="state" value={shippingAddress.code} placeholder="ex.Italy" />
                                <div className="invalid-feedback"> Please provide a valid state. </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label >Zip</label>
                                <input type="text" className="form-control" onChange={(e) => {
                                    setShippingAddress({
                                        ...shippingAddress,
                                        code: e.target.value
                                    })
                                }} id="zip" value={shippingAddress.code} placeholder="" />
                                <div className="invalid-feedback"> Zip code required. </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5 mb-3" style={{ marginTop: "20px" }}>
                                <label >Choose a saved address:</label>
                                <select className="custom-select d-block w-100" id="saveaddress">
                                    {address.map((address) => (
                                        <option onClickCapture={() => { setAddressToShow('shipping', address.id) }} value={`${address.id}`}>{`${address.address}`}</option>
                                    ))}
                                </select>
                                <div className="invalid-feedback"> Please select a valid address. </div>
                            </div>
                        </div>
                        <h2 className="mb-3" style={{ marginTop: "20px" }}>Payment</h2>
                        <form onSubmit={confirmPayment}>
                            <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "20px" }}>
                                <Button color="primary" size="lg" onClick={handleSubmit} disabled={processing || disabled || succeeded} id="submit">
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
                                    margin: "5px"
                                }}>
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