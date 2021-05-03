import Amplify from 'aws-amplify';
import awsconfig from 'aws-exports';
import React, { useEffect, useState, ChangeEvent, Dispatch } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import styles from 'styles/Profile.module.css';
import { AddressesService, sessionService } from 'services';
import { Address, Addresses, User } from 'types'
Amplify.configure(awsconfig);

const Profile: React.FC = () => {

    const [oldPassword, setOldPassword]: [string, Dispatch<string>] = useState<string>();
    const [newPassword, setNewPassword]: [string, Dispatch<string>] = useState<string>();
    const [confirmNewPassword, setConfirmNewPassword]: [string, Dispatch<string>] = useState<string>();
    const [newEmail, setNewEmail]: [string, Dispatch<string>] = useState<string>();
    const [confirmNewEmail, setConfirmNewEmail]: [string, Dispatch<string>] = useState<string>();
    const [currentEmail, setCurrentEmail]: [string, Dispatch<string>] = useState<string>();
    const [newAddressValues, setNewAddressValues]: [Address, Dispatch<Address>] = useState<Address>();
    const [addresses, setAddresses]: [Addresses, Dispatch<Addresses>] = useState<Addresses>();
    const [selectedAddress, setSelectedAddress]: [Address, Dispatch<Address>] = useState<Address>();
    const [selectedAddressId, setSelectedAddressId]: [string, Dispatch<string>] = useState<string>();

    useEffect(() => {
        if (sessionService.isAuth()) {
            const user: User = sessionService.getLocalStorage()
            setCurrentEmail(user.email);
        }
        getAddresses();
    }, [])

    const getAddresses = async (): Promise<void> => {
        try {
            const addresses: Addresses = await AddressesService.fetchAddresses();
            setAddresses(addresses);
            console.log('Addresses', addresses);
        }
        catch (err) {
            console.log(err)
        }
    }

    const getSelectedAddress = async (id: string): Promise<void> => {
        try {
            const address: Address = await AddressesService.fetchSingleAddress(id);
            setSelectedAddress(address);
            console.log('Address', address);
        }
        catch (err) {
            console.log(err)
        }
    }

    const changeAddressValue = (fieldName: string, e: ChangeEvent<HTMLInputElement>): void => {
        setNewAddressValues({
            ...newAddressValues,
            [fieldName]: e.currentTarget.value
        });
    }

    const changeSelectedAddress = (e: ChangeEvent<HTMLSelectElement>): void => {
        console.log(e.target.value);
        setSelectedAddressId(e.target.value);
        getSelectedAddress(e.target.value);
    }

    const submitNewAddress = async (): Promise<void> => {
        await AddressesService.createNewAddress(newAddressValues)
            .then((response: boolean) => {
                if (response) {
                    getAddresses();
                }
                console.log(response)
            }).catch((e) => {
                console.log(e.message);
            })
    }

    const deleteAddress = async (): Promise<void> => {
        await AddressesService.deleteAddress(selectedAddressId)
            .then((response: boolean) => {
                if (response) {
                    getAddresses();
                    setSelectedAddress(null);
                    setSelectedAddressId(null);
                }
                console.log(response);
            }
            ).catch((e) => {
                console.log(e.message);
            })
    }

    const oldPasswordField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setOldPassword(e.target.value);
    }

    const newPasswordField = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewPassword(e.target.value);
    } 
    
    const confirmNewPasswordField = (e: React.ChangeEvent<HTMLInputElement>) : void=> {
        setConfirmNewPassword(e.target.value);
    }

    const newEmailField = (e: React.ChangeEvent<HTMLInputElement>) : void=> {
        setNewEmail(e.target.value);
    }

    const confirmNewEmailField = (e: React.ChangeEvent<HTMLInputElement>) : void=> {
        setConfirmNewEmail(e.target.value);
    }

    const changePassword = async (): Promise<void> => {
        console.log(newPassword, confirmNewPassword, oldPassword);
        /*try {
            await AuthService.changePassword(oldPassword, newPassword)
        }
        catch (err) {
            console.log(err)
        }*/
    }

    const changeEmail = async () : Promise<void>=> {
        console.log(newEmail, confirmNewEmail);
    }
    
    const renderSelectedAddress = (): JSX.Element => {

        if (selectedAddress) {
            return (
                <p>
                    { selectedAddress.description}
                     - { selectedAddress.city},
                    { selectedAddress.address},
                    { selectedAddress.code},
                    { selectedAddress.description}
                    - { selectedAddress.recipientName}
                    { selectedAddress.recipientSurname}
                </p>
            );
        }
        else {
            return (
                <p>Select an address</p>
            );
        }
    }

    return (
        <CustomerLayout header footer>
            <div className={styles.user}>
                <strong>User: {currentEmail}</strong>
            </div>
            <div className={styles.div}>
                <h1 className={styles.h1}>Here you can manage your addresses</h1>
                <h2>Add a new one</h2>
                <Form>
                    <Label>Name:</Label>
                    <Input type="text" onChange={(e) => { changeAddressValue('recipientName', e) }} placeholder="Name" />
                    <Label>Surname:</Label>
                    <Input type="text" onChange={(e) => { changeAddressValue('recipientSurname', e) }} placeholder="Surname" />
                    <Label>Address:</Label>
                    <Input type="text" onChange={(e) => { changeAddressValue('address', e) }} placeholder="Address" />
                    <Label>City:</Label>
                    <Input type="text" onChange={(e) => { changeAddressValue('city', e) }} placeholder="City" />
                    <Label>Province:</Label>
                    <Input type="text" onChange={(e) => { changeAddressValue('district', e) }} placeholder="Province (TV)" />
                    <Label>CAP:</Label>
                    <Input type="text" onChange={(e) => { changeAddressValue('code', e) }} placeholder="CAP" />
                    <Label>Description:</Label>
                    <Input type="text" onChange={(e) => { changeAddressValue('description', e) }} placeholder="House Address" />
                </Form>
                <p />
                <Button size="lg" onClick={() => { submitNewAddress() }}>Add</Button>
                <p />
                <h2>Or delete an existing one</h2>
                <select style={{ width: "20rem" }} defaultValue="#" onChange={(e) => { changeSelectedAddress(e) }}>
                    <option value='#'> - - - </option>
                    {addresses?.map((address: Address) => (
                        <option key={address.id} value={address.id}>{address.description}</option>
                    ))}
                </select>
                {renderSelectedAddress()}
                <Button size="lg" onClick={deleteAddress}>Delete this address</Button>
            </div>
            <div className={styles.div}>
                <Form>
                    <h1 className={styles.h1}>Here you can manage your password</h1>
                    <FormGroup>
                        <Label for="oldPassword">Old Password</Label>
                        <Input type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { oldPasswordField(e); }} name="password" id="oldPassword" placeholder="Old Password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="newPassword">New Password</Label>
                        <Input type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { newPasswordField(e); }} name="newPassword" id="newPassword" placeholder="New Password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmNewPassword">Confirm New Password</Label>
                        <Input type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { confirmNewPasswordField(e); }} 
                            name="confirmNewPassword" id="confirmNewPassword" placeholder="Confirm New Password" />
                    </FormGroup>
                    <div>
                        <Button size="lg" onClick={() => {changePassword()}}>Change Password</Button>
                    </div>
                </Form>
            </div>
            <div className={styles.div}>
                <h1 className={styles.h1}>Here you can manage your email</h1>
                <Form>
                    <FormGroup>
                        <Label for="newEmail">New Email</Label>
                        <Input type="email" onChange={(e) => { newEmailField(e); }} name="newEmail" id="newEmail" placeholder="New Email" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmNewEmail">Confirm New Email</Label>
                        <Input type="email" onChange={(e) => { confirmNewEmailField(e); }} name="confirmNewEmail" id="confirmNewEmail" placeholder="Confirm New Email" />
                    </FormGroup>
                    <div>
                        <Button size="lg" onClick={() => {changeEmail()}}>Change Email</Button>
                    </div>
                </Form>
            </div>
            <div className={styles.div}>
                <div className={styles.danger}>
                    <h1>DANGER ZONE! Here you can request the deletion of the account</h1>
                    <Button size="lg">Request account deletion</Button>
                </div>
            </div>
        </CustomerLayout>
    );
}

export default Profile;

