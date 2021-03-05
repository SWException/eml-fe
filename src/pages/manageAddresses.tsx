import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'aws-exports';
import AddressForm from 'components/checkout/AddressForm';
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
Amplify.configure(awsconfig);

// Salva in automatico i cookie per ricordare se il login è stato fatto

const ManageAddresses: React.FC = ()=>{

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

    return (
        <div>
            <strong>User: {email}</strong>
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
    );
}

export default ManageAddresses;

