import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'aws-exports';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import styles from 'styles/Profile.module.css';
import { AddressesService, AuthService, sessionService } from 'services';
import { useAuth } from 'context';
import {Address, User} from 'types'
Amplify.configure(awsconfig);

// Salva in automatico i cookie per ricordare se il login è stato fatto

const Profile: React.FC = ()=>{

    const router = useRouter();

    //const { isAuthenticated, currentUser } = useAuth();

    useEffect(()=>{
        if(sessionService.isAuth()){
            let user: User = sessionService.getLocalStorage()
            setEmail(user.email);
        }
        getAddresses()
    }, [])
    //mostrare messaggi ed errori nel successo o no del cambio di password + confirmPass

    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState<Address[]>([]);
    const [values, setValues] = useState<Address>({
        // id: 1, 
        description: "",
        recipientName: "",
        recipientSurname: "",
        address: "",
        city: "",
        code: "",
        district: "",
        user: ""
    });
    const [selectedAddress, setSelected] = useState("");
    const [currentAddress, setCurrentAddress] = useState<Address>(null);

    const changeOld = (e) =>{
        setOldPass(e.target.value);      
    }

    const changeNew = (e) =>{
        setNewPass(e.target.value);        
    }

    const changeEmail = () => {
        console.log("CHANGING THE MAIL");
    }

    const changePassword = async() => {
        try {
            await AuthService.changePassword(oldPass, newPass)
        } catch(err) {
            console.log(err)
        }
    }

    const getAddresses = async() => {
        try {
            const { addresses } = await AddressesService.fetchAddresses();
            setAddress(addresses)
            console.log(address);
        } catch(err) {
            console.log(err)
        }
    }

    const handleChange = (name:string, e:React.FormEvent<HTMLInputElement>) :void => {
        setValues({
            ...values,
            [name]: e.currentTarget.value
        })
    }

    const addressChange = (e:React.ChangeEvent<HTMLSelectElement>) :void => {
        setSelected(e.currentTarget.value);
        let curAddress=null;
        address.forEach((add)=>{
            if (add.id==e.currentTarget.value){
                curAddress=add;
            }
        })
        setCurrentAddress(curAddress);
    }

    const submitNewAddress = async() =>{
        try {
            const { status, message } = await AddressesService.createNewAddress(values);
            console.log(status + ' ---- ' + message)
            if(status == "success"){
                getAddresses();
            }
        } catch(err) {
            console.log(err);
        }
    }

    const deleteAddress = async() => {
        try {
            //Ovviamente mockato, capire come selezionare id da un elemento selected
            const { status, message } = await AddressesService.deleteAddress(selectedAddress);
            console.log(status + ' ---- ' + message)
            if(status == "success"){
                getAddresses();
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <CustomerLayout header footer>
          <div className={styles.user}>
            <strong>User: {email}</strong>
          </div>
            <div className={styles.div}>
                    <h1 className={styles.h1}>Here you can manage your addresses</h1>
                    <h2>Add a new one</h2>
                    <Form>
                        <Label>Name:</Label>
                        <Input type="text" onChange={(e)=>{handleChange('recipientName', e)}} placeholder="Name"/>
                        <Label>Surname:</Label>
                        <Input type="text" onChange={(e)=>{handleChange('recipientSurname', e)}} placeholder="Surname"/>
                        <Label>Address:</Label>
                        <Input type="text" onChange={(e)=>{handleChange('address', e)}} placeholder="Address"/>
                        <Label>City:</Label>
                        <Input type="text" onChange={(e)=>{handleChange('city', e)}} placeholder="City"/>
                        <Label>Province:</Label>
                        <Input type="text" onChange={(e)=>{handleChange('district', e)}} placeholder="Province (TV)"/>
                        <Label>CAP:</Label>
                        <Input type="text" onChange={(e)=>{handleChange('code', e)}} placeholder="CAP"/>
                        <Label>Description:</Label>
                        <Input type="text" onChange={(e)=>{handleChange('description', e)}} placeholder="House Address"/>
                    </Form>
                    <p/> 
                    <Button size="lg" onClick={submitNewAddress}>Add</Button>
                    <p/>
                    <h2>Or delete an existing one</h2>
                    <select style={{width:"20rem"}} onChange={(e)=>{addressChange(e)}}>
                        {address?.map((address)=>(
                            <option value={`${address.id}`}>{`${address.description}`}</option>
                        ))}
                    </select>
                    <p>{`${currentAddress?.description} - ${currentAddress?.city}, ${currentAddress?.address}, ${currentAddress?.code}, ${currentAddress?.description} - ${currentAddress?.recipientName} ${currentAddress?.recipientSurname}`}</p>
                    <p/>
                    <Button size="lg" onClick={deleteAddress}>Delete this address</Button>
            </div>
            <div className={styles.div}>
                <Form>
                    <h1 className={styles.h1}>Here you can manage your password</h1>
                    <FormGroup>
                        <Label for="oldPassword">Old Password</Label>
                        <Input type="password" onChange={(e)=>{changeOld(e);}} name="password" id="oldPassword" placeholder="Old Password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="newPassword">New Password</Label>
                        <Input type="password" onChange={(e)=>{changeNew(e);}} name="newPassword" id="newPassword" placeholder="New Password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmNewPassword">Confirm New Password</Label>
                        <Input type="password" onChange={(e)=>{changeNew(e);}} name="confirmNewPassword" id="confirmNewPassword" placeholder="Confirm New Password" />
                    </FormGroup>
                    <div>
                        <Button size="lg" onClick={changePassword}>Change Password</Button>
                    </div>  
                </Form>
            </div>
            <div className={styles.div}>
                <h1 className={styles.h1}>Here you can manage your email</h1>
                <Form>
                    <FormGroup>
                        <Label for="newEmail">New Email</Label>
                        <Input type="email" onChange={(e)=>{changeNew(e);}} name="newEmail" id="newEmail" placeholder="New Email" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmNewEmail">Confirm New Email</Label>
                        <Input type="email" onChange={(e)=>{changeNew(e);}} name="confirmNewEmail" id="confirmNewEmail" placeholder="Confirm New Email" />
                    </FormGroup>
                    <div>
                        <Button size="lg" onClick={changeEmail}>Change Email</Button>
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

