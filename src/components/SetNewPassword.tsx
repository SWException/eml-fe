import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useState } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

const SetNewPassword = () =>{

    const [emailRec, setEmailRec] = useState('');
    const [codice, setCodice] = useState('');
    const [password, setPassword] = useState('');
    const [newPAss, setNewPassword] = useState('');
    const [error, setError] = useState(''); //implemetare show errori
    const [message, setMessage] = useState(''); //implementare showMEssaggi
    const [newComp, setNewComp] = useState(false);

    
    
    function inviaCodiceRecupero() {
        Auth.forgotPassword(emailRec)
            .then(data => console.log("invio codice "+data))
            .catch(err => console.log(err));
    }
    function recuperaPassword() {
        Auth.forgotPasswordSubmit(emailRec, codice, password)
            .then(data => console.log("recuperato "+data))
            .catch(err => console.log(err));
    }

    return (
        <div>
            {newComp ? (
                <div className="div-card">
                <div className="loginCard">
                    <h1>Recupera password</h1>
                    <Form>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" value={emailRec} onChange={()=>{setError('Non modificare email')}} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="codiceExample" className="mr-sm-2">Codice di Recupero</Label>
                        <Input type="text" name="codice" onChange={(e)=>{setCodice(e.target.value)}} id="exampleEmail" placeholder="1234" />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="password" className="mr-sm-2">Nuova Password</Label>
                        <Input type="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} id="exampleEmail" placeholder="sUpErStrong1!" />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="exampleEmail" className="mr-sm-2">Ripeti nuova Password</Label>
                        <Input type="password" name="rep-new-pass" onChange={(e)=>{setNewPassword(e.target.value)}} id="rep-new-pass" placeholder="sUpErStrong1!" />
                    </FormGroup>
                    </Form>
                    <div className="div-button-login">
                        <Button className="button-rec" color="primary" onClick={()=>{recuperaPassword();}}>Recupera password</Button>
                    </div>
                </div>
            </div>
            ) : (
                <div className="div-card">
                <div className="loginCard">
                <h1>Invia codice di recupero</h1>
                <Form>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                        <Input type="email" name="email" onChange={(e)=>{setEmailRec(e.target.value)}} id="exampleEmail" placeholder="something@idk.cool" />
                    </FormGroup>
                    <div className="div-button-login">
                        <Button className="button-rec" onClick={()=>{
                            inviaCodiceRecupero();
                            setNewComp(true);
                        }} color="primary">Invia codice</Button>
                    </div>
                </Form>
                </div>
            </div>
            )}
        </div>
    )

}

export default SetNewPassword;