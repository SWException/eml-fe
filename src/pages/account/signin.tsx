import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'aws-exports';
import React, { useEffect, useState } from 'react'
import { Spinner, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { SetNewPassword} from 'components/auth';
import { useRouter } from 'next/router';
import { CustomerLayout } from 'components/layouts/CustomerLayout';

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
                window.localStorage.setItem('mex', `Benvenuto ${email}, trova il prodotto adatto a te!`);
                //window.location.reload();
                setError('');
                redirectToHomePage();
            })
            .catch(error => {
                console.log('error signing in', error);
                setLoading(false);
                setError(`Errore nell'inserimento dei dati! Controllare password e/o email e riprovare`);
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
        <CustomerLayout header>
            {remember ? (
            <SetNewPassword />
            ) : (
            <div className="" style={{width: "80%", marginLeft: "10%"}}>
                <div className="">
                    <h1>Login</h1>
                    <Form>
                    <FormGroup className="">
                        <Label for="exampleEmail" className="">Email</Label>
                        <Input type="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} id="exampleEmail" placeholder="something@idk.cool" />
                    </FormGroup>
                    <FormGroup className="">
                        <Label for="examplePassword" className="">Password</Label>
                        <Input type="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} id="examplePassword" placeholder="sUpErStrong1!" />
                    </FormGroup>
                    <div className="">
                        {loading ? (
                            <Spinner color="primary" style={{marginTop: "20px"}}/>
                        ) : (
                        <div className="buttons-cont">
                            <Button className="" onClick={()=>{setRemember(true)}} color="primary">Recupero</Button>
                            <Button className="" color="primary" onClick={signIn}>Login</Button>
                        </div>
                        )}
                    </div>
                    <div>
                        <h1>Are you not registered? Do it now!</h1>
                    </div>
                    <div className="">
                    {loading ? (
                            <Spinner color="primary" style={{marginTop: "20px"}}/>
                        ) : (
                            <div className="">
                            <Button className="" onClick={signUp} color="primary">SignUp</Button>
                        </div>
                        )
                        }
                    </div>
                    </Form>
                    <div className="">
                        {displayErr()}
                        {displayInfo()}
                    </div>
                </div>
            </div>
            )}
        
        </CustomerLayout>

    );
};

export default Login;