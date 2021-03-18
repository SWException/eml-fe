import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'aws-exports';
import React, { useEffect, useState } from 'react'
import { Spinner, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { SetNewPassword} from 'components/auth';
import { useRouter } from 'next/router';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import styles from 'styles/Account.module.css'

Amplify.configure(awsconfig);

var email = null, password = null, codice = null;

// Salva in automatico i cookie per ricordare il il login è stato fatto

const Login: React.FC = () => {

    const router = useRouter();

    useEffect(()=>{
        let mex = window.localStorage.getItem('mex');
        if(mex){
            setMessage(mex);
            window.localStorage.removeItem('mex');
        }
    }, [])

    const [email, setEmail] = useState('');
    const [remember, setRemember] = useState(false);
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const getJwt = () =>{
        Auth.currentSession()
    .then(res => {
        let accessToken = res.getAccessToken()
        let jwt = accessToken.getJwtToken()
        window.localStorage.setItem('jwt', jwt);
        console.log(`myJwt: ${jwt}`)
    })
    .catch(err => {console.log("Errore2: " + err); });
    }

    async function signIn() {
        setLoading(true);
        Auth.signIn(email, password)
            .then(user => {
                if (user.challengeName === 'NEW_PASSWORD_REQUIRED') { // Non dovrebbe essere necessario credo se la password non ha scadenza. Da capire meglio
                    var newPassword = password + "new";
                    const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
                    Auth.completeNewPassword(
                        user,               // the Cognito User Object
                        newPassword       // the new password
                    )
                        .then(user => {
                            // at this time the user is logged in if no MFA required
                            console.log(user);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                } else {
                    console.log(user);
                }
                setLoading(false);
                getJwt();
                window.localStorage.setItem('mex', `Welcome ${email}, find the right product for you!`);
                //window.location.reload();
                setError('');
                redirectToHomePage();
            })
            .catch(error => {
                console.log('error signing in', error);
                setLoading(false);
                setError(`Error in entering data! Check your password and / or email and try again`);
                setMessage('');
                displayErr();
            });
    };

    const displayErr = () =>{
        return (error ? <div className="alert alert-danger">{error}</div> : '');
    }

    const displayInfo = () =>{
        return (message ? <div className="alert alert-info">{message}</div> : '');
    }

    const signUp = () =>{
        router.push('/account/signup');
    }

    const redirectToHomePage = () =>{
        router.push('/');
    }

    return (
        <CustomerLayout header footer>
            {remember ? (
            <SetNewPassword />
            ) : (
                <div className={styles.div}>
                    <h1 style={{marginTop: "5px"}}>Login</h1>
                    <Form>
                    <FormGroup>
                        <Label for="exampleEmail" className="">Email</Label>
                        <Input type="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} id="exampleEmail" placeholder="something@idk.cool" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword" className="">Password</Label>
                        <Input type="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} id="examplePassword" placeholder="sUpErStrong1!" />
                    </FormGroup>
                    <div>
                        {loading ? (
                            <Spinner color="primary" style={{marginTop: "20px"}}/>
                        ) : (
                        <div>
                            <Button color="primary" size="lg" onClick={signIn}>Login</Button> 
                            <div>
                                <p className={styles.p}>Forgot your password?</p>
                                <Button onClick={()=>{setRemember(true)}} color="primary" size="lg" style={{marginLeft: "10px"}}>Recover</Button>
                            </div>
                        </div>
                        )}
                    </div>
                    <div style={{marginTop: "60px"}}>
                        <h1 style={{fontSize: "20px"}}>Are you not registered? Do it now!</h1>
                    </div>
                    <div className="">
                    {loading ? (
                            <Spinner color="primary"  style={{marginTop: "20px"}}/>
                        ) : (
                            <div className="">
                            <Button onClick={signUp} color="primary" size="lg" style={{marginLeft:"40%"}} >SignUp</Button>
                        </div>
                        )
                        }
                    </div>
                    </Form>
                    <div  style={{marginTop: "20px"}}>
                        {displayErr()}
                        {displayInfo()}
                    </div>
                </div>
            )}
        
        </CustomerLayout>

    );
};

export default Login;