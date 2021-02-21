import Layout from '../components/Layout';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
Amplify.configure(awsconfig);

// Salva in automatico i cookie per ricordare il il login è stato fatto

const Profile = ()=>{

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
        console.log(`myJwt: ${jwt}`)
    })
    .catch(err => { setEmail(err); console.log("Errore2: " + err); });

    Auth.currentAuthenticatedUser()
    .then(user => {
        setEmail(user.attributes.email);
        console.log(user);
    })
    .catch(err => { setEmail(err); console.log("Errore1: " + err); });

    return (
        <Layout>
        <div className="div-card">
            <div className="loginCard">
        <Form>
            <div>
                <div>
                    <strong>Profilo utente: {email}</strong>
                </div>
            </div>
            <br></br>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="examplePassword" className="mr-sm-2">Old Password</Label>
                <Input type="password" onChange={(e)=>{
                    changeOld(e);
                }} name="password" id="examplePassword" placeholder="Old Password" />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="examplePassword" className="mr-sm-2">New Password</Label>
                <Input type="password" onChange={(e)=>{
                    changeNew(e);
                }} name="password" id="examplePassword" placeholder="New Password" />
            </FormGroup>
            <div className="div-button-login" style={{marginTop: "20px"}}>
                <Button color="primary" onClick={changePassword}>Change Password</Button>
            </div>  
        </Form>
        </div>
        </div>
        </Layout>
    );

}

export default Profile;

/*var emailUtente = "";
var vecchia, nuova;

Auth.currentAuthenticatedUser()
    .then(user => {
        emailUtente = user.attributes.email;
        console.log(user);
    })
    .catch(err => { emailUtente = err; console.log("Errore1: " + err); });

function cambiaPassword() {
    Auth.currentAuthenticatedUser()
        .then(user => {
            return Auth.changePassword(user, vecchia, nuova);
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

Auth.currentSession()
    .then(res => {
        let accessToken = res.getAccessToken()
        let jwt = accessToken.getJwtToken()
        console.log(`myJwt: ${jwt}`)
    })
    .catch(err => { emailUtente = err; console.log("Errore2: " + err); });

const render = () => {
    return (
        <Layout>
            <label id="informazioni-utente">Profilo: {emailUtente}</label> <br />

            vecchia password: <input type="password" onChange={e => { vecchia = e.target.value; }} /><br />
            nuova password: <input type="password" onChange={e => { nuova = e.target.value; }} /><br />
            <label id="err-registrazione"></label><br />
            <button onClick={cambiaPassword}>Cambia password</button><br /><br />
        </Layout>

    );
}

export default render;*/