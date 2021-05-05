import React, { useState, useEffect, Dispatch, ChangeEvent } from "react";
import { useRouter } from 'next/router';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from 'reactstrap';
import { Address, Addresses, PaymentIntent } from 'types';
import { AddressesService, CheckoutService } from 'services';

const CheckoutForm: React.FC = () => {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();

    const [shippingAddress, setShippingAddress]: [Address, Dispatch<Address>] = useState<Address>();
    const [billingAddress, setBillingAddress]: [Address, Dispatch<Address>] = useState<Address>();

    const [idSelectedShippingAddress, setIdSelectedShippingAddress]: [string, Dispatch<string>] = useState<string>();
    const [idSelectedBillingAddress, setIdSelectedBillingAddress]: [string, Dispatch<string>] = useState<string>();

    const [addresses, setAddresses]: [Addresses, Dispatch<Addresses>] = useState<Addresses>();
    useEffect(() => {
        getAddresses();
    }, [])

    const getAddresses = async () => {
        try {
            const addresses: Addresses = await AddressesService.fetchAddresses();
            setAddresses(addresses);
            console.log(addresses);
        }
        catch (err) {
            console.log(err)
        }
    }

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

    const pay = async (): Promise<void> => {   
        const paymentIntent: PaymentIntent = await CheckoutService.fetchCheckout(idSelectedShippingAddress, idSelectedBillingAddress); 

        console.log("PAYMENT INTENT", paymentIntent);

        await stripe.confirmCardPayment(paymentIntent.secret, { 
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })
            .then(async (payload) => {
                if(payload.error){
                    console.error(payload.error.message);  
                }
                else{
                    const response: boolean = await CheckoutService.confirmCheckout(paymentIntent.id);
                    console.log(payload.paymentIntent.status, response);
                    router.push('/orders');
                }
            })
            .catch((e) => {
                console.error(e);
            })
    }

    const handleChangeShippingAddress = (e: ChangeEvent<HTMLSelectElement>) => {
        setIdSelectedShippingAddress(e.target.value);
        addresses.map(address=>{
            if(address.id == idSelectedShippingAddress){
                setShippingAddress(address);
            }
        })
    }

    const handleChangeBillingAddress = (e: ChangeEvent<HTMLSelectElement>) => {
        setIdSelectedBillingAddress(e.target.value);
        addresses.map(address=>{
            if(address.id == idSelectedBillingAddress){
                setBillingAddress(address);
            }
        })
    }

    const renderBillingAddress = () => (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label>First name</label>
                    <input type="text" className="form-control" onChange={(e) => {
                        setBillingAddress({
                            ...billingAddress,
                            recipientName: e.target.value
                        })
                        console.log(billingAddress)
                    }} id="firstName" placeholder="" value={billingAddress?.recipientName} />
                    <div className="invalid-feedback">{`${billingAddress?.recipientName}`}</div>
                </div>
                <div className="col-md-6 mb-3">
                    <label>Last name</label>
                    <input type="text" className="form-control" onChange={(e) => {
                        setBillingAddress({
                            ...billingAddress,
                            recipientSurname: e.target.value
                        })
                    }} id="lastName" placeholder="" value={billingAddress?.recipientSurname} />
                    <div className="invalid-feedback">{`${billingAddress?.recipientSurname}`}</div>
                </div>
            </div>
            <div className="mb-3">
                <label >Address</label>
                <input type="text" className="form-control" onChange={(e) => {
                    setBillingAddress({
                        ...billingAddress,
                        address: e.target.value
                    })
                }} id="address" value={billingAddress?.address} placeholder="1234 Main St" />
                <div className="invalid-feedback">{billingAddress?.address}</div>
            </div>
            <div className="row">
                <div className="col-md-5 mb-3">
                    <label >Country</label>
                    <input type="text" className="form-control" onChange={(e) => {
                        setBillingAddress({
                            ...billingAddress,
                            city: e.target.value
                        })
                    }} id="country" value={billingAddress?.city} placeholder="ex.Padova" />
                    <div className="invalid-feedback">{billingAddress?.city}</div>
                </div>
                <div className="col-md-4 mb-3">
                    <label >State</label>
                    <input type="text" className="form-control" onChange={(e) => {
                        setBillingAddress({
                            ...billingAddress,
                            district: e.target.value
                        })
                    }} id="state" value={billingAddress?.district} placeholder="ex.Italy" />
                    <div className="invalid-feedback">{billingAddress?.district}</div>
                </div>
                <div className="col-md-3 mb-3">
                    <label>Zip</label>
                    <input type="text" className="form-control" onChange={(e) => {
                        setBillingAddress({
                            ...billingAddress,
                            code: e.target.value
                        })
                    }} id="zip" value={billingAddress?.code} placeholder="" />
                    <div className="invalid-feedback">{billingAddress?.code}</div>
                </div>
            </div>
        </>
    )

    const renderShippingAddress = () => (
        <>
            <h2 className="mb-3" style={{ marginTop: "20px" }}>Shipping address</h2>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label>First name</label>
                    <input type="text" className="form-control" id="firstName" onChange={(e) => {
                        setShippingAddress({
                            ...shippingAddress,
                            recipientName: e.target.value
                        })
                    }} placeholder="" value={shippingAddress?.code} />
                    <div className="invalid-feedback"> Valid first name is required. </div>
                </div>
                <div className="col-md-6 mb-3">
                    <label >Last name</label>
                    <input type="text" className="form-control" id="lastName" onChange={(e) => {
                        setShippingAddress({
                            ...shippingAddress,
                            recipientSurname: e.target.value
                        })
                    }} placeholder="" value={shippingAddress?.code} />
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
                }} id="address" value={shippingAddress?.code} placeholder="1234 Main St" />
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
                    }} id="country" value={shippingAddress?.code} placeholder="ex.Padova" />
                    <div className="invalid-feedback"> Please select a valid country. </div>
                </div>
                <div className="col-md-4 mb-3">
                    <label >State</label>
                    <input type="text" className="form-control" onChange={(e) => {
                        setShippingAddress({
                            ...shippingAddress,
                            district: e.target.value
                        })
                    }} id="state" value={shippingAddress?.code} placeholder="ex.Italy" />
                    <div className="invalid-feedback"> Please provide a valid state. </div>
                </div>
                <div className="col-md-3 mb-3">
                    <label >Zip</label>
                    <input type="text" className="form-control" onChange={(e) => {
                        setShippingAddress({
                            ...shippingAddress,
                            code: e.target.value
                        })
                    }} id="zip" value={shippingAddress?.code} placeholder="" />
                    <div className="invalid-feedback"> Zip code required. </div>
                </div>
            </div>
        </>
    )

    const renderSelectBillingAddress = () => (
        <div className="row">
            <div className="col-md-5 mb-3" style={{ marginTop: "20px" }}>
                <label >Choose a saved address:</label>
                <select className="custom-select d-block w-100" defaultValue="#" id="saveaddress" onChange={(e: ChangeEvent<HTMLSelectElement>) => { handleChangeBillingAddress(e) }}>
                    <option value="#" disabled> - - - </option>
                    {addresses?.map((address) => (
                        <option value={`${address.id}`}>{`${address.description}`}</option>
                    ))}
                </select>
                <div className="invalid-feedback"> Please select a valid address. </div>
            </div>
        </div>
    )

    const renderSelectShippingAddress = () => (
        <div className="row">
            <div className="col-md-5 mb-3" style={{ marginTop: "20px" }}>
                <label >Choose a saved address:</label>
                <select className="custom-select d-block w-100" defaultValue="#" id="saveaddress" onChange={(e: ChangeEvent<HTMLSelectElement>) => { handleChangeShippingAddress(e) }}>
                    <option value="#" disabled> - - -</option>
                    {addresses?.map((address) => (
                        <option value={`${address.id}`}>{`${address.description}`}</option>
                    ))}
                </select>
                <div className="invalid-feedback"> Please select a valid address. </div>
            </div>
        </div>
    )


    return (
        <div className="container">
            <div className="py-5 text-center">
                <h1>Checkout form</h1>
            </div>
            <div className="row">
                <div className="col-md-8 order-md-1">

                    <h2 className="mb-3">Billing address</h2>
                    <form className="needs-validation">
                        {renderBillingAddress()}
                        {renderSelectBillingAddress()}
                        {renderShippingAddress()}
                        {renderSelectShippingAddress()}
                        <h2 className="mb-3" style={{ marginTop: "20px" }}>Payment</h2>
                        <form>
                            <CardElement id="card-element" options={cardStyle} />
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "20px" }}>
                                <Button color="primary" size="lg" onClick={() => pay()} id="submit">
                                    <span id="button-text">
                                        PAY
                                    </span>
                                </Button>
                            </div>
                            
                        </form>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;