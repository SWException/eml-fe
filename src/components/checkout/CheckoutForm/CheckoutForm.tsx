import React, { useState, useEffect, Dispatch, ChangeEvent } from "react";
import { useRouter } from 'next/router';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from 'reactstrap';
import { InsertAddress, Addresses, PaymentIntent } from 'types';
import { AddressesService, CheckoutService } from 'services';

const CheckoutForm: React.FC = () => {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();

    const [newBillingAddress, setNewBillingAddress]: [InsertAddress, Dispatch<InsertAddress>] = useState<InsertAddress>();
    const [newShippingAddress, setNewShippingAddress]: [InsertAddress, Dispatch<InsertAddress>] = useState<InsertAddress>();

    const [idSelectedShippingAddress, setIdSelectedShippingAddress]: [string, Dispatch<string>] = useState<string>();
    const [idSelectedBillingAddress, setIdSelectedBillingAddress]: [string, Dispatch<string>] = useState<string>();

    const [addresses, setAddresses]: [Addresses, Dispatch<Addresses>] = useState<Addresses>();

    const [defaultValue, setDefaultValue]: [string, Dispatch<string>] = useState<string>();

    useEffect(() => {
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
                if (payload.error) {
                    console.error(payload.error.message);
                }
                else {
                    const response: boolean = await CheckoutService.confirmCheckout(paymentIntent.id);
                    console.log(payload.paymentIntent.status, response);
                    router.push('/orders');
                }
            })
            .catch((e) => {
                console.error(e);
            })
    }

    const handleChangeShippingAddress = (e: ChangeEvent<HTMLSelectElement>): void => {
        setIdSelectedShippingAddress(e.target.value);
    }

    const handleChangeBillingAddress = (e: ChangeEvent<HTMLSelectElement>): void => {
        setIdSelectedBillingAddress(e.target.value);
    }

    const handleBillingAddressFieldChanges = (field: string, e: ChangeEvent<HTMLInputElement>): void => {
        setNewBillingAddress({
            ...newBillingAddress,
            [field]: e.target.value,
        });
    }

    const handleShippingAddressFieldChanges = (field: string, e: ChangeEvent<HTMLInputElement>) => {
        setNewShippingAddress({
            ...newShippingAddress,
            [field]: e.target.value,
        });
    }

    const submitNewAddress = async (address: InsertAddress): Promise<void> => {
        await AddressesService.createNewAddress(address)
            .then((newAddressId: string) => {
                if (newAddressId) {
                    getAddresses();
                    alert("Address added successfully!");
                }
                console.log(newAddressId);
                setDefaultValue(newAddressId);
            }).catch((e) => {
                console.log(e.message);
            })
    }

    const renderBillingAddress = (): JSX.Element => (
        <>
            <h2 className="mb-3">Billing address</h2>
            <form className="needs-validation">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label>First name</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => { handleBillingAddressFieldChanges('recipientName', e) }
                        } id="billingRecipientName" placeholder="ex. Mario" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label>Last name</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => { handleBillingAddressFieldChanges('recipientSurname', e) }
                        } id="billingRecipientSurname" placeholder="ex. Rossi" />
                    </div>
                </div>
                <div className="mb-3">
                    <label >Address</label>
                    <input type="text" className="form-control" onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) => { handleBillingAddressFieldChanges('address', e) }
                    } id="billingAddress" placeholder="ex. Viale della Repubblica" />
                </div>
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <label >Country</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => { handleBillingAddressFieldChanges('city', e) }
                        } id="billingCity" placeholder="ex. Padova" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label >State</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => { handleBillingAddressFieldChanges('district', e) }
                        } id="billingDistrict" placeholder="ex. Italy" />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label>Zip</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => { handleBillingAddressFieldChanges('code', e) }
                        } id="billingCode" placeholder="ex. 31100" />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label>Description</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => { handleBillingAddressFieldChanges('description', e) }
                        } id="billingDescription" placeholder="ex. Casa Mia" />
                    </div>
                    <Button size="lg" onClick={() => { submitNewAddress(newBillingAddress) }}>Add</Button>
                </div>
            </form>
        </>
    )

    const renderShippingAddress = (): JSX.Element => (
        <>
            <h2 className="mb-3">Shipping address</h2>
            <form className="needs-validation">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label>First name</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => { handleShippingAddressFieldChanges('recipientName', e) }
                        } id="shippingRecipientName" placeholder="ex. Mario" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label>Last name</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => { handleShippingAddressFieldChanges('recipientSurname', e) }
                        } id="shippingRecipientSurname" placeholder="ex. Rossi" />
                    </div>
                </div>
                <div className="mb-3">
                    <label >Address</label>
                    <input type="text" className="form-control" onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) => { handleShippingAddressFieldChanges('address', e) }
                    } id="shippingAddress" placeholder="ex. Viale della Repubblica" />
                </div>
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <label >Country</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => { handleShippingAddressFieldChanges('city', e) }
                        } id="shippingCity" placeholder="ex. Padova" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label >State</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => { handleShippingAddressFieldChanges('district', e) }
                        } id="shippingDistrict" placeholder="ex. Italy" />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label>Zip</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => { handleShippingAddressFieldChanges('code', e) }
                        } id="shippingCode" placeholder="ex. 31100" />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label>Description</label>
                        <input type="text" className="form-control" onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => { handleBillingAddressFieldChanges('description', e) }
                        } id="shippingDescription" placeholder="ex. Casa Mia" />
                    </div>
                    <Button size="lg" onClick={() => { submitNewAddress(newShippingAddress) }}>Add</Button>
                </div>
            </form>
        </>
    )

    const renderSelectBillingAddress = () => (
        <div className="row">
            <div className="col-md-5 mb-3" style={{ marginTop: "20px" }}>
                <label >Choose a saved address:</label>
                <select className="custom-select d-block w-100" defaultValue={defaultValue} id="saveaddress" onChange={
                    (e: ChangeEvent<HTMLSelectElement>) => { handleChangeBillingAddress(e) }
                }>
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
                <select className="custom-select d-block w-100" defaultValue="#" id="saveaddress" onChange={
                    (e: ChangeEvent<HTMLSelectElement>) => { handleChangeShippingAddress(e) }
                }>
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
                </div>
            </div>
        </div >
    );
};

export default CheckoutForm;