import Layout from '../../components/Layout';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import { useEffect, useState } from 'react'
import { Spinner, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import SetNewPassword from '../../components/SetNewPassword';
Amplify.configure(awsconfig);

var email = null, password = null, codice = null;

// Salva in automatico i cookie per ricordare il il login è stato fatto

const Login = () => {

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
                window.location.reload();
                setError('');
                displayInfo();
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

    return (
        <Layout>{remember ? (
                <SetNewPassword />
            ) : (<div className="div-card">
            <div className="loginCard">
                <h1>Login</h1>
                <Form>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                    <Input type="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} id="exampleEmail" placeholder="something@idk.cool" />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">Password</Label>
                    <Input type="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} id="examplePassword" placeholder="sUpErStrong1!" />
                </FormGroup>
                <div className="div-button-login">
                    {loading ? (
                        <Spinner color="primary" style={{marginTop: "20px"}}/>
                    ) : (
                    <div className="buttons-cont">
                        <Button className="button-normal" onClick={()=>{setRemember(true)}} color="primary">Recupero</Button>
                        <Button className="button-normal" color="primary" onClick={signIn}>Login</Button>
                    </div>
                    )}
                </div>
                </Form>
                <div className="info-reg-err">
                    {displayErr()}
                    {displayInfo()}
                </div>
            </div>
    </div>)}
            
            
        </Layout>
    );
};

export default Login;