import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import React, { useState } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'aws-exports';
Amplify.configure(awsconfig);
import styles from 'styles/Account.module.css'

const SetNewPassword: React.FC = () =>{

    const [emailRec, setEmailRec] = useState('');
    const [codice, setCodice] = useState('');
    const [password, setPassword] = useState('');
    const [newPass, setNewPassword] = useState('');
    const [error, setError] = useState(''); // implementare show errori
    const [message, setMessage] = useState(''); // implementare showMEssaggi
    const [newComp, setNewComp] = useState(false);

    
    const onVerifyPassword = () => {
        if (password !== newPass) {
            alert("Passwords don't match");
        }
    } 
    
    function sendRecoveryCode () {
        Auth.forgotPassword(emailRec)
            .then(data => console.log("Send code "+data))
            .catch(err => console.log(err));
    }
    function recoverPassword () {
        Auth.forgotPasswordSubmit(emailRec, codice, password)
            .then(data => console.log("Recovered "+data))
            .catch(err => console.log(err));
    }

    return (
        <div>
            {newComp ? (
                <div className={styles.div}>
                    <h1>Recover password</h1>
                    <Form>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                            <Input type="email" name="email" id="exampleEmail" value={emailRec} onChange={()=>{setError('Do not edit email')}} required/>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="codiceExample" className="mr-sm-2">Recovery Code</Label>
                            <Input type="text" name="codice" onChange={(e)=>{setCodice(e.target.value)}} id="exampleEmail" placeholder="1234" required/>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="password" className="mr-sm-2">New Password</Label>
                            <Input type="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} id="exampleEmail" placeholder="sUpErStrong1!" required/>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleEmail" className="mr-sm-2">Repeat new Password</Label>
                            <Input type="password" name="rep-new-pass" onChange={(e)=>{setNewPassword(e.target.value)}} onBlur={onVerifyPassword} id="rep-new-pass" placeholder="sUpErStrong1!" required/>
                        </FormGroup>
                    </Form>
                    <div className="div-button-login">
                        <Button className="button-rec" color="primary" size="lg" style={{marginTop:10}} onClick={()=>{recoverPassword();}}>Save new password</Button>
                    </div>
                </div>
            ) : (
                <div className={styles.div}>
                    <h1>Send recovery code</h1>
                    <Form>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                            <Input type="email" name="email" onChange={(e)=>{setEmailRec(e.target.value)}} id="exampleEmail" placeholder="something@idk.cool" required/>
                        </FormGroup>
                        <div className="div-button-login">
                            <Button className="button-rec" onClick={()=>{
                                if(!emailRec){
                                    alert('Email is required field')
                                }
                                else{
                                    sendRecoveryCode();
                                    setNewComp(true);
                                }
                            }} color="primary" size="lg" style={{marginTop:10}}>Send code</Button>
                        </div>
                    </Form>
                </div>
            )}
        </div>
    )

}

export default SetNewPassword;