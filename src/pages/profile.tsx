import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'aws-exports';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { AddressForm } from 'components/checkout';
import { ClientLayout } from 'components/layouts/client-layout';
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
        <ClientLayout header>
            <strong>User: {email}</strong>
            <div>
                <p>Here you can manage your addresses</p>
                <p>Add a new one</p>
                <AddressForm/> 
                <button type="button">Add</button>
                <p>Or delete an existing one</p>
                <select>
                    <option>Address 1</option>
                    <option>Address 2</option>
                    <option>Address 3</option>
                </select>
                <button type="button">Delete this address</button>
            </div>
            <div>
                <p>Here you can manage your password</p>
                <Form>
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
            <div>
                <p>Here you can manage your email</p>
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
            <div>
                <p>DANGER ZONE!</p>
                <button type="button">Request account deletion</button>
            </div>
        </ClientLayout>
    );
}

export default Profile;

