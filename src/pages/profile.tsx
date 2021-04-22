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
        // id: 1, //Mock da cambiare in seguito, chiedere BE significato
        description: "",
        recipientName: "",
        recipientSurname: "",
        address: "",
        city: "",
        code: "",
        district: ""
    });

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

    const submitNewAddress = async() =>{
        //Check se info inserite sono giuste?
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
            const { status, message } = await AddressesService.deleteAddress(0);
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
            <strong style={{marginLeft:25, marginTop: 10}}>User: {email}</strong>
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
                    <Button onClick={submitNewAddress}>Add</Button>
                    <p/>
                    <h2>Or delete an existing one</h2>
                    <select>
                        {address.map((address)=>(
                            <option value={`${address.id}`}>{`${address.address}`}</option>
                        ))}
                    </select>
                    <p/>
                    <Button onClick={deleteAddress}>Delete this address</Button>
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
                        <Button onClick={changePassword}>Change Password</Button>
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
                        <Button onClick={changeEmail}>Change Email</Button>
                    </div>  
                </Form>
            </div>
            <div className={styles.div}>
                <h1>DANGER ZONE! Here you can request the delation of the account</h1>
                <Button>Request account deletion</Button>
            </div>
        </CustomerLayout>
    );
}

export default Profile;

