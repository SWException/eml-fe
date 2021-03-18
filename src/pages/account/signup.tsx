import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'aws-exports';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import React, { useState } from 'react';
import { Spinner, Button, Form, FormGroup, Label, Input } from 'reactstrap';
Amplify.configure(awsconfig);
import styles from 'styles/Account.module.css'

// Non fa in automatico anche il login, perché comunque bisogna verificare l'email

const SignUp: React.FC = () => {

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
                setMessage('Registration was successful! Confirm your email by entering the code received');
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
                setError('Password too short! Minimum length: 6 characters');
            } else {
                setError('The two passwords do not match! Check and try again!');
            }
            setMessage('');
            displayErr();
        }
    }
    
    async function confirmSignUp() {
        try {
            await Auth.confirmSignUp(emailRec, code);
            console.log("Codice confermato");
            setMessage('Customer number confirmed! Welcome to Emporio Lambda!');
            setError('');
            displayInfo();
        } catch (error) {
            console.log('error confirming sign up', error);
            setError('Confirmation error! Wrong code, try again or click "Resend Code"');
            setMessage('');
            displayErr();
        }
    }
    
    async function resendConfirmationCode() {
        try {
            await Auth.resendSignUp(emailRec);
            console.log('code resent successfully');
            setMessage('Code returned successfully. Enter and confirm your registration!');
            setError('');
            displayInfo();
        } catch (error) {
            console.log('error resending code: ', error);
            setError('Connection error, try again!');
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
    }

    return (
        <CustomerLayout header footer>
            {isCode ? (
                    <div className={styles.div}>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail" className="">Email</Label>
                                <Input type="email" name="email" onChange={(e)=>{setEmailRec(e.target.value)}} id="exampleEmail" placeholder="something@idk.cool" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="codiceExample" className="">Codice di Recupero</Label>
                                <Input type="text" name="codice" onChange={(e)=>{setCode(e.target.value)}} id="exampleEmail" placeholder="1234" />
                            </FormGroup>
                            <div>
                                <Button size="lg" onClick={confirmSignUp} color="primary">Conferma registrazione</Button>
                                <Button size="lg" onClick={resendConfirmationCode} color="primary" style={{marginLeft:"20px"}}>Rinvia codice</Button>
                            </div>
                        </Form>
                        <div style={{marginTop: "20px"}}>
                            {displayErr()}
                            {displayInfo()}
                        </div>
                    </div>

            ) : (
                <div className={styles.div}>
                    <h1 style={{marginTop: "5px"}}>Create account</h1>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail" className="">Email</Label>
                            <Input type="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} id="exampleEmail" placeholder="something@idk.cool" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail" className="">Ripeti Email</Label>
                            <Input type="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} id="exampleEmail" placeholder="something@idk.cool" />
                        </FormGroup>
                        <FormGroup >
                            <Label for="examplePassword" className="">Password</Label>
                            <Input type="password" name="password" onChange={(e)=>{setPass(e.target.value)}} id="examplePassword" placeholder="sUpErStrong1!" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword" className="">Ripeti Password</Label>
                            <Input type="password" name="password" onChange={(e)=>{isSamePassword(e)}} id="examplePassword" placeholder="sUpErStrong1!" />
                        </FormGroup>
                        <div>
                            {loading ? (
                                <Spinner color="primary" style={{marginTop: "20px"}}/>
                            ) : (
                                <Button color="primary" size="lg" onClick={signUp} style={{marginLeft:"30%"}}>Create your account</Button>
                            )}                    
                        </div>
                    </Form>
                    <div style={{marginTop: "20px"}}>
                        {displayErr()}
                        {displayInfo()}
                    </div>
                </div>
            )}
        </CustomerLayout>
    );
}

export default SignUp;