import Layout from '../../components/Layout';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import SetNewPassword from '../../components/SetNewPassword';
Amplify.configure(awsconfig);

var email = null, password = null, codice = null;

// Salva in automatico i cookie per ricordare il il login è stato fatto

const Login = () => {

    //mostrare messaggi info e error
    //Refresh pagina se login ok

    const [email, setEmail] = useState('');
    const [emailRec, setEmailRec] = useState('');
    const [codice, setCodice] = useState('');
    const [newPass, setNewPass] = useState('');
    const [remember, setRemember] = useState(false);
    const [emailSend, setEmailSend] = useState(false);
    const [password, setPassword] = useState('');

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
                getJwt();
            })
            .catch(error => {
                console.log('error signing in', error);
                document.getElementById('err-registrazione').innerHTML = "Errore: " + error.message;
            });
    };
    
    function inviaCodiceRecupero() {
        Auth.forgotPassword(emailRec)
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }
    function recuperaPassword() {
        Auth.forgotPasswordSubmit(email, codice, password)
            .then(data => console.log(data))
            .catch(err => console.log(err));
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
                    <Button className="button-sign" onClick={()=>{setRemember(true)}} color="primary">Recupero</Button>
                    <Button className="button-sign" color="primary" onClick={signIn}>Login</Button>
                </div>
                </Form>
            </div>
    </div>)}
            
            
        </Layout>
    );
};

export default Login;