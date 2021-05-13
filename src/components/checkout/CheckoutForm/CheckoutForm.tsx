import React, { useState, useEffect, Dispatch, ChangeEvent } from "react";
import { useRouter } from 'next/router';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Spinner } from 'reactstrap';
import { InsertAddress, Addresses, PaymentIntent } from 'types';
import { AddressesService, CheckoutService } from 'services';
import styles from 'styles/Cart.module.css'
import { StripeCardElementOptions } from "@stripe/stripe-js";

const CheckoutForm: React.FC = () => {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState<boolean>(false);

    const [showShipping, setShowShipping] = useState<boolean>(true);
    const [showBilling, setShowBilling] = useState<boolean>(false);
    const [showPayment, setShowPayment] = useState<boolean>(false);

    const [useShippingAsBilling, setUseShippingAsBilling] = useState<boolean>(true);

    const [newBillingAddress, setNewBillingAddress]: [InsertAddress, Dispatch<InsertAddress>] = useState<InsertAddress>();
    const [newShippingAddress, setNewShippingAddress]: [InsertAddress, Dispatch<InsertAddress>] = useState<InsertAddress>();

    const [idSelectedShippingAddress, setIdSelectedShippingAddress]: [string, Dispatch<string>] = useState<string>('#');
    const [idSelectedBillingAddress, setIdSelectedBillingAddress]: [string, Dispatch<string>] = useState<string>('#');

    const [textSelectedShippingAddress, setTextSelectedShippingAddress]: [string, Dispatch<string>] = useState<string>("none");
    const [textSelectedBillingAddress, setTextSelectedBillingAddress]: [string, Dispatch<string>] = useState<string>("none");

    const [addresses, setAddresses]: [Addresses, Dispatch<Addresses>] = useState<Addresses>();

    const [intent, setIntent] = useState<PaymentIntent>();

    const [errorMessage, setErrorMessage] = useState("");
    const [infoMessage, setInfoMessage] = useState("");

    useEffect(() => {
        setIntent(null);
        getAddresses();
    }, [])

    const getAddresses = async (): Promise<void> => {
        try {
            const addresses: Addresses = await AddressesService.fetchAddresses();
            setAddresses(addresses);
            console.log(addresses);
        }
        catch (err) {
            console.log(err)
        }
    }

    const cardStyle: StripeCardElementOptions = {
        hidePostalCode: true,
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
        resetMessage();
        setLoading(true);
        let paymentIntent: PaymentIntent = intent;
        if(!paymentIntent){
            paymentIntent = await CheckoutService.fetchCheckout(idSelectedShippingAddress, idSelectedBillingAddress);
            setIntent(paymentIntent);
        }
        console.log("PAYMENT INTENT", paymentIntent);

        await stripe.confirmCardPayment(paymentIntent.secret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })
            .then(async (payload) => {
                if (payload.error) {
                    setErrorMessage(payload.error.message + " - " + payload.error.code);
                }
                else {
                    const response: boolean = await CheckoutService.confirmCheckout(paymentIntent.id);
                    console.log(payload.paymentIntent.status, response);
                    setInfoMessage(payload.paymentIntent.status);
                    router.push('/orders');
                }
            })
            .catch((e: Error) => {
                setErrorMessage(e.message);
                console.error(e);
            })
        setLoading(false);
    }

    const getTextAddress = async (id: string): Promise<string> => {
        if(!id || id === "#"){
            return "none";
        }
        const address = await AddressesService.fetchSingleAddress(id);
        return `${address.recipientName} ${address.recipientSurname} - ${address.city}, ${address.address} (${address.district}) ${address.code}`;
    }

    const handleChangeShippingAddress = async (id: string): Promise<void> => {
        setIdSelectedShippingAddress(id);
        setTextSelectedShippingAddress(await getTextAddress(id));
    }

    const handleChangeBillingAddress = async (id: string): Promise<void> => {
        setIdSelectedBillingAddress(id);
        setTextSelectedBillingAddress(await getTextAddress(id));
    }

    const handleBillingAddressFieldChanges = (field: string, e: ChangeEvent<HTMLInputElement>): void => {
        setNewBillingAddress({
            ...newBillingAddress,
            [field]: e.target.value,
        });
    }

    const handleShippingAddressFieldChanges = (field: string, e: ChangeEvent<HTMLInputElement>): void => {
        setNewShippingAddress({
            ...newShippingAddress,
            [field]: e.target.value,
        });
    }

    const submitNewBillingAddress = async (address: InsertAddress): Promise<void> => {
        resetMessage();
        setLoading(true);
        await AddressesService.createNewAddress(address)
            .then(async (newAddressId: string) => {
                if (newAddressId) {
                    await getAddresses();
                    // alert("Address added successfully!");
                    console.log(newAddressId);
                    setIdSelectedBillingAddress(newAddressId);
                    setTextSelectedBillingAddress(await getTextAddress(newAddressId));
                    setInfoMessage("Billing address insert");
                }
            }).catch((e) => {
                setErrorMessage(e.message);
                console.log(e.message);
            })
        setLoading(false);
    }

    const submitNewShippingAddress = async (address: InsertAddress): Promise<void> => {
        resetMessage();
        setLoading(true);
        await AddressesService.createNewAddress(address)
            .then(async (newAddressId: string) => {
                if (newAddressId) {
                    await getAddresses();
                    // alert("Address added successfully!");
                    console.log(newAddressId);
                    setIdSelectedShippingAddress(newAddressId);
                    setTextSelectedShippingAddress(await getTextAddress(newAddressId));
                    setInfoMessage("Shipping address insert");
                }
            }).catch((e) => {
                setErrorMessage(e.message);
                console.log(e.message);
            })
        setLoading(false);
    }
    

    const renderShippingAddress = (): JSX.Element => (
        <>
            <h2 className="mb-3">Or add a new one:</h2>
            <form className="needs-validation">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label>Recipient first name</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>): void => { handleShippingAddressFieldChanges('recipientName', e) }
                        } id="shippingRecipientName" placeholder="ex. Mario" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label>Recipient last name</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>): void => { handleShippingAddressFieldChanges('recipientSurname', e) }
                        } id="shippingRecipientSurname" placeholder="ex. Rossi" />
                    </div>
                </div>
                <div className="mb-3">
                    <label >Address</label>
                    <input type="text" className="form-control" onChange={
                        (e: React.ChangeEvent<HTMLInputElement>): void => { handleShippingAddressFieldChanges('address', e) }
                    } id="shippingAddress" placeholder="ex. Viale della Repubblica" />
                </div>
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <label >City</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>): void => { handleShippingAddressFieldChanges('city', e) }
                        } id="shippingCity" placeholder="ex. Padova" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label >District</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>): void => { handleShippingAddressFieldChanges('district', e) }
                        } id="shippingDistrict" placeholder="ex. Italy" />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label>ZIP code</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>): void => { handleShippingAddressFieldChanges('code', e) }
                        } id="shippingCode" placeholder="ex. 31100" />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label>Address description</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>): void => { handleShippingAddressFieldChanges('description', e) }
                        } id="shippingDescription" placeholder="ex. Casa Mia" />
                    </div>
                </div>
                <Button size="lg" onClick={(): void => { submitNewShippingAddress(newShippingAddress) }}>Add new address</Button>
            </form>
        </>
    )


    const renderBillingAddress = (): JSX.Element => (
        <>
            <h2 className="mb-3">Or add a new one:</h2>
            <form className="needs-validation">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label>Recipient first name</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>): void => { handleBillingAddressFieldChanges('recipientName', e) }
                        } id="billingRecipientName" placeholder="ex. Mario" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label>Recipient last name</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>): void => { handleBillingAddressFieldChanges('recipientSurname', e) }
                        } id="billingRecipientSurname" placeholder="ex. Rossi" />
                    </div>
                </div>
                <div className="mb-3">
                    <label >Address</label>
                    <input type="text" className="form-control" onChange={
                        (e: React.ChangeEvent<HTMLInputElement>): void => { handleBillingAddressFieldChanges('address', e) }
                    } id="billingAddress" placeholder="ex. Viale della Repubblica" />
                </div>
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <label >City</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>): void => { handleBillingAddressFieldChanges('city', e) }
                        } id="billingCity" placeholder="ex. Padova" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label >District</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>): void => { handleBillingAddressFieldChanges('district', e) }
                        } id="billingDistrict" placeholder="ex. Italy" />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label>ZIP code</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>): void => { handleBillingAddressFieldChanges('code', e) }
                        } id="billingCode" placeholder="ex. 31100" />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label>Address description</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>): void => { handleBillingAddressFieldChanges('description', e) }
                        } id="billingDescription" placeholder="ex. Casa Mia" />
                    </div>
                </div>
                <Button size="lg" onClick={(): void => { submitNewBillingAddress(newBillingAddress) }}>Add new address</Button>
            </form>
        </>
    )


    const renderSelectShippingAddress = (): JSX.Element => (
        <>
            <h1 className="mb-5">Checkout - Shipping address</h1>
            <h2 className="mb-3">Choose a saved address:</h2>
            <div className="row">
                <div className="col-md-5 mb-3">
                    <select className="custom-select d-block w-100" value={idSelectedShippingAddress} id="saveShippingAddress" onChange={
                        (e: ChangeEvent<HTMLSelectElement>): void => { handleChangeShippingAddress(e.target.value) }
                    }>
                        <option value="#" disabled> - - - </option>
                        {addresses?.map((address) => (
                            <option value={`${address.id}`}>{`${address.description}`}</option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );


    const renderSelectBillingAddress = (): JSX.Element => (
        <>
            <h2 className="mb-3">Choose a saved address:</h2>
            <div className="row">
                <div className="col-md-5 mb-3">
                    <select className="custom-select d-block w-100" value={idSelectedBillingAddress} id="saveBillingAddress" onChange={
                        (e: ChangeEvent<HTMLSelectElement>): void => { handleChangeBillingAddress(e.target.value) }
                    }>
                        <option value="#" disabled> - - - </option>
                        {addresses?.map((address) => (
                            <option value={`${address.id}`}>{`${address.description}`}</option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    )

    const displayError = (): JSX.Element => {
        return (errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : <></>);
    }

    const displayInfo = (): JSX.Element => {
        return (infoMessage ? <div className="alert alert-info">{infoMessage}</div> : <></>);
    }

    const resetMessage = () => {
        setErrorMessage("");
        setInfoMessage("");
    }

    const changeBillingMode = (mode: string): void => {
        if(mode == "same"){
            setUseShippingAsBilling(true);
            handleChangeBillingAddress(idSelectedShippingAddress);
        }
        else{
            setUseShippingAsBilling(false);
            handleChangeBillingAddress("#")
        }
    }
    const handlerShowShipping = () => {
        resetMessage();
        setShowPayment(false);
        setShowBilling(false);
        setShowShipping(true);
    }

    const handlerShowBilling = () => {
        if(intent){
            CheckoutService.deleteCheckout(intent.id);
        }
        if(!idSelectedShippingAddress || idSelectedShippingAddress === "#"){
            resetMessage();
            setErrorMessage("Select one address or add a new one!");
            return;
        }
        resetMessage();
        setShowShipping(false);
        setShowPayment(false);
        setShowBilling(true);
        if(useShippingAsBilling){
            setUseShippingAsBilling(true);
            handleChangeBillingAddress(idSelectedShippingAddress);
        }
    }

    const handlerShowPayment = () => {
        if(!idSelectedBillingAddress || idSelectedBillingAddress === "#"){
            resetMessage();
            setErrorMessage("Select one address or add a new one!");
            return;
        }
        resetMessage();
        setIntent(null)
        setShowShipping(false);
        setShowBilling(false);
        setShowPayment(true);
    }


    return (
        <div className="container">
            <div className="row">
                <div style={{margin:'0 auto'}} className="col-md-8 order-md-1">
                    <div>
                        <br />
                        {displayError()}
                        {displayInfo()}
                    </div>

                    {(showShipping)?(<>
                        {renderSelectShippingAddress()}
                        {renderShippingAddress()}<br />
                        <p>Selected address: { textSelectedShippingAddress }</p>
                        <Button size="lg" color="primary" onClick={handlerShowBilling}>Next</Button>
                    </>):(<></>)}

                    {(showBilling)?(<>
                        <h1 className="mb-5" >Checkout - Billing address</h1>
                        <div className="row">
                            <select name="billingMode" defaultValue="same" id="billingMode" onChange={(e) => changeBillingMode(e.target.value)}>
                                <option value="same">Use shipping address as billing</option>
                                <option value="notSame">Choose or add a different address</option>
                            </select>
                        </div>
                        <br />
                        {(useShippingAsBilling)? (<></>):(<div>
                            {renderSelectBillingAddress()}
                            {renderBillingAddress()}<br />
                        </div>)}

                        <p>Selected address: { textSelectedBillingAddress }</p>
                        <Button size="lg" onClick={handlerShowShipping}>Previous</Button> 
                        {" "}<Button size="lg" color="primary" onClick={handlerShowPayment}>Next</Button>
                    </>):(<></>)}

                    {(showPayment)?(
                        <>
                            <h2 className="mb-3" style={{ marginTop: "20px" }}>Payment</h2>
                            <form>
                                <CardElement id="card-element" options={cardStyle} />
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "20px" }}>
                                    <Button color="primary" size="lg" onClick={(): Promise<void> => pay()} id="submit">
                                        <span id="button-text">PAY</span>
                                    </Button>
                                </div>
                            </form>
                            {" "}<Button  size="lg" onClick={handlerShowBilling}>Previous</Button>
                        </>
                    ):(<></>)}
                    {loading ? (
                        <div className={styles.loadingitemlayout}>
                            <Spinner style={{ width: '3rem', height: '3rem' }} />
                        </div>
                    ) : (<></>)}
                    
                </div>
            </div>
        </div >
    );
};

export default CheckoutForm;