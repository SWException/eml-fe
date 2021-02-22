import Layout from '../../components/Layout';
import React from 'react'
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import { useState } from 'react';
import { Alert, Spinner, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { setGlobalCssModule } from 'reactstrap/es/utils';
Amplify.configure(awsconfig);

// Non fa in automatico anche il login, perché comunque bisogna verificare l'email

const SignUp = () => {

    //Lavorare su state configurato meglio stile Reducer
    const [email, setEmail] = useState('');
    const [emailRec, setEmailRec] = useState('');
    const [password, setPass] = useState('');
    const [pasRes, setPassRes] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [same, setSame] = useState(true);
    const [error, setError] = useState('');
    const [isCode, setIsCode] = useState(false);
    const [message, setMessage] = useState('');
    
    async function signUp() {
        setLoading(true);
        try {
            if(same){
                console.log(email);
                const { user } = await Auth.signUp({
                    username: email, password
                });
                console.log("Registrazione effettuata");
                setMessage('Registrazione avvenuta con successo! Conferma la tua mail inserendo il codice ricevuto');
                setError('')
                displayInfo();
                console.log(user);
                setLoading(false);
                setIsCode(true);
            }
        } catch (error) {
            setLoading(false);
            if(same){
                console.log('error signing up:', error);
                setError('Password troppo corta! Lunghezza minima: 6 caratteri');
            } else {
                setError('Le due password non combaciano! Controlla e riprova!');
            }
            setMessage('');
            displayErr();
        }
    }
    
    async function confirmSignUp() {
        try {
            await Auth.confirmSignUp(emailRec, code);
            console.log("Codice confermato");
            setMessage('Codice cliente confermato! Benvenuto su Emporio Lambda!');
            setError('');
            displayInfo();
        } catch (error) {
            console.log('error confirming sign up', error);
            setError('Errore di conferma! Codice errato, riprovare o slicca Rinvia Codice');
            setMessage('');
            displayErr();
        }
    }
    
    async function resendConfirmationCode() {
        try {
            await Auth.resendSignUp(emailRec);
            console.log('code resent successfully');
            setMessage('Codice rinviato con successo. Inserisci e conferma la registrazione!');
            setError('');
            displayInfo();
        } catch (error) {
            console.log('error resending code: ', error);
            setError('Errore di connessione, riprovare!');
            setMessage('');
            displayErr()
        }
    }    

    const displayErr = () =>{
        return (error ? <div className="alert alert-danger">{error}</div> : '');
    }

    const displayInfo = () =>{
        return (message ? <div className="alert alert-info">{message}</div> : '');
    }

    const isSamePassword = (e) => {
        console.log(e.target.value.length)
        /*
        setPassRes(`${e.target.value}`);
        console.log(pasRes != password);

        console.log('PASSWORD')
        console.log(password.length);
        console.log(password)
        console.log('----------------')*/

        //Sistemare meglio gestione conferma password
        /*if(e.target.value.length === password.length && e.target.value != password){
            setSame(false);
        } else if(e.target.value.length < password.length){
            setSame(true);
        } else if (e.target.value.length > password.length){
            setSame(false);
        }*/
    }

    return (
        <React.Fragment>
        <Layout>
        {isCode ? (
            <div className="div-card">
                <div className="signup-card">
                <Form>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                        <Input type="email" name="email" onChange={(e)=>{setEmailRec(e.target.value)}} id="exampleEmail" placeholder="something@idk.cool" />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="codiceExample" className="mr-sm-2">Codice di Recupero</Label>
                        <Input type="text" name="codice" onChange={(e)=>{setCode(e.target.value)}} id="exampleEmail" placeholder="1234" />
                    </FormGroup>
                    <div className="div-button-login">
                        <Button className="button-rec" onClick={confirmSignUp} color="primary">Conferma registrazione</Button>
                        <Button className="button-rec" onClick={resendConfirmationCode} color="primary">Rinvia codice</Button>
                    </div>
                </Form>
                <div className="info-reg-err">
                    {displayErr()}
                    {displayInfo()}
                </div>
                </div>
            </div>
        ) : (
        <div className="div-card">
            <div className="signup-card">
            <h1>Registrazione</h1>
            <Form>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                    <Input type="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} id="exampleEmail" placeholder="something@idk.cool" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">Password</Label>
                    <Input type="password" name="password" onChange={(e)=>{setPass(e.target.value)}} id="examplePassword" placeholder="sUpErStrong1!" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">Ripeti Password</Label>
                    <Input type="password" name="password" onChange={(e)=>{isSamePassword(e)}} id="examplePassword" placeholder="sUpErStrong1!" />
                </FormGroup>
                <div className="div-button-login">
                    {loading ? (
                        <Spinner color="primary" style={{marginTop: "20px"}}/>
                    ) : (
                        <Button className="button-sign" color="primary" onClick={signUp}>Registrati</Button>
                    )}                    
                </div>
            </Form>
            <div className="info-reg-err">
                {displayErr()}
                {displayInfo()}
            </div>
            </div>
        </div>
        )}
        </Layout>
        </React.Fragment>
    );
}

export default SignUp;