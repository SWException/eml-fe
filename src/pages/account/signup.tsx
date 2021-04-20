import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'aws-exports';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import { AuthService } from 'services'
import React, { useState } from 'react';
import { Spinner, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useRouter } from 'next/router';
Amplify.configure(awsconfig);
import styles from 'styles/Account.module.css'


/**
 * TODO: 
 * controllare per bene errori ritornati
 * Fare check client side delle informazioni inserite (es email e confirmEmail sono uguali, stessa cosa password)
 * Aggiungere ripeti password piuttosto che ripeti email
 */

const SignUp: React.FC = () => {

    const router = useRouter()

    //Lavorare su state configurato meglio stile Reducer
    const [email, setEmail] = useState('');
    const [emailRec, setEmailRec] = useState('');
    const [password, setPass] = useState('');
    const [pasRes, setPassRes] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [same, setSame] = useState(true);
    const [name, setPrimaryName] = useState('')
    const [family, setFamilyName] = useState('')
    const [error, setError] = useState('');
    const [isCode, setIsCode] = useState(false);
    const [message, setMessage] = useState('');
    
    async function signUp() {
        setLoading(true);
        try {
            const { confirmCode } = await AuthService.signUp(email, password, name, family)
            setMessage('Registration was successful! Confirm your email by entering the code received');
            setError('');
            displayInfo();
            setIsCode(confirmCode);
        } catch (e) {
            console.log(e)
            setError('Something went wrong! Retry!')
            setMessage('');
            displayErr();
        }
        setLoading(false)
    }
    
    async function confirmSignUp() {
        try {
            setLoading(true);
            await AuthService.confirmCode(emailRec, code);
            setLoading(false);
            router.push('/');
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
                            <Label for="codiceExample" className="">Recovery Code</Label>
                            <Input type="text" name="codice" onChange={(e)=>{setCode(e.target.value)}} id="exampleEmail" placeholder="1234" />
                        </FormGroup>
                        <div>
                            <Button size="lg" onClick={confirmSignUp} color="primary">Confirm registration</Button>
                            <Button size="lg" onClick={resendConfirmationCode} color="primary" style={{marginLeft:"20px"}}>Resend code</Button>
                        </div>
                    </Form>
                    <div style={{marginTop: "20px"}}>
                        {displayErr()}
                        {displayInfo()}
                    </div>
                </div>

            ) : (
                <div>
                <div className={styles.div}>
                    <h1 style={{marginTop: "5px"}}>Create account</h1>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail" className="">Email</Label>
                            <Input type="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} id="exampleEmail" placeholder="something@idk.cool" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail" className="">Repeat Email</Label>
                            <Input type="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} id="exampleEmail" placeholder="something@idk.cool" />
                        </FormGroup>
                        <FormGroup >
                            <Label for="examplePassword" className="">Password</Label>
                            <Input type="password" name="password" onChange={(e)=>{setPass(e.target.value)}} id="examplePassword" placeholder="sUpErStrong1!" />
                        </FormGroup>
                        <FormGroup >
                            <Label for="examplePassword" className="">Repeat Password</Label>
                            <Input type="password" name="password" onChange={(e)=>{setPass(e.target.value)}} id="examplePassword" placeholder="sUpErStrong1!" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword" className="">Name</Label>
                            <Input name="name" onChange={(e)=>{setPrimaryName(e.target.value)}} id="exampleName" placeholder="Mario" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword" className="">Surname</Label>
                            <Input name="surname" onChange={(e)=>{setFamilyName(e.target.value)}} id="exampleSurname" placeholder="Rossi" />
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
                </div>
            )}
        </CustomerLayout>
    );
}

export default SignUp;