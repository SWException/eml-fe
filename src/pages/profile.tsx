import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'aws-exports';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
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

    const onSubmit = () => {
        router.push('/manageAddresses');
    }

    return (
        <div>
            <button type="button" onClick={()=>onSubmit()}>ADD/EDIT ADDRESSES</button>
            <Form>
                <strong>User: {email}</strong>
                <FormGroup>
                    <Label for="oldPassword">Old Password</Label>
                    <Input type="password" onChange={(e)=>{changeOld(e);}} name="password" id="oldPassword" placeholder="Old Password" />
                </FormGroup>
                <FormGroup>
                    <Label for="newPassword">New Password</Label>
                    <Input type="password" onChange={(e)=>{changeNew(e);}} name="password" id="newPassword" placeholder="New Password" />
                </FormGroup>
                <div>
                    <Button onClick={changePassword}>Change Password</Button>
                </div>  
            </Form>
        </div>
    );
}

export default Profile;

