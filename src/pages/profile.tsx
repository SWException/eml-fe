import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'aws-exports';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { AddressForm } from 'components/checkout';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import styles from 'styles/Profile.module.css';
Amplify.configure(awsconfig);

// Salva in automatico i cookie per ricordare se il login è stato fatto

const Profile: React.FC = ()=>{

    const router = useRouter();
    //mostrare messaggi ed errori nel successo o no del cambio di password + confirmPass

    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [email, setEmail] = useState("");

    const changeOld = (e) =>{
        setOldPass(e.target.value);      
    }

    const changeNew = (e) =>{
        setNewPass(e.target.value);        
    }

    const changeEmail = () => {
        console.log("CHANGING THE MAIL");
        /*Auth.currentAuthenticatedUser()
            .then(user => {
                return Auth.changePassword(user, oldPass, newPass);
            })
            .then(data => console.log(data))
            .catch(err => console.log(err));
            */
    }

    const changePassword = () => {
        Auth.currentAuthenticatedUser()
            .then(user => {
                return Auth.changePassword(user, oldPass, newPass);
            })
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    Auth.currentSession()
    .then(res => {
        let accessToken = res.getAccessToken()
        let jwt = accessToken.getJwtToken()
        //console.log(`myJwt: ${jwt}`)
    })
    .catch(err => { setEmail(err); console.log("Errore2: " + err); });

    Auth.currentAuthenticatedUser()
    .then(user => {
        setEmail(user.attributes.email);
        //console.log(user);
    })
    .catch(err => { setEmail(err); console.log("Errore1: " + err); });



    return (
        <CustomerLayout header>
            <strong style={{marginLeft:25, marginTop: 10}}>User: {email}</strong>
            <div className={styles.div}>
                    <h1 className={styles.h1}>Here you can manage your addresses</h1>
                    <h2>Add a new one</h2>
                    <AddressForm/>
                    <p/> 
                    <Button>Add</Button>
                    <p/>
                    <h2>Or delete an existing one</h2>
                    <select>
                        <option>Address 1</option>
                        <option>Address 2</option>
                        <option>Address 3</option>
                    </select>
                    <p/>
                    <Button>Delete this address</Button>
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

