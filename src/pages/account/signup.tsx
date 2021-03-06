import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'aws-exports';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import { AuthService } from 'services';
import React, { useState } from 'react';
import { Spinner, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useRouter } from 'next/router';

Amplify.configure(awsconfig);
import styles from 'styles/Account.module.css';


const SignUp: React.FC = () => {
    const router = useRouter()

    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [name, setPrimaryName] = useState('')
    const [family, setFamilyName] = useState('')
    const [error, setError] = useState('');
    const [isCode, setIsCode] = useState(false);
    const [message, setMessage] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [confirm_email, setConfirmEmail] = useState('');


    const onVerifyPassword = () => {
        if (password !== confirm_password) {
            alert("Passwords don't match");
        }
    }
    const onVerifyEmail = () => {
        if (email !== confirm_email) {
            alert("Emails don't match");
        }
    }

    async function signUp () {
        if (!password || !email || !name || !family || (password !== confirm_password) || (email !== confirm_email)) {
            alert('Check your data and remember that Email, Password, Name and Surname are required fields.');
        }
        else {
            setLoading(true);
            try {
                const { confirmCode } = await AuthService.signUp(email, password, name, family)
                if (confirmCode == true) {
                    setMessage('Registration was successful! Confirm your email by entering the code received');
                    setError('');
                    displayInfo();
                    setIsCode(true);
                }
                else {
                    setError('Error in signUp. Check the fields and retry.')
                    setMessage('');
                    displayErr();
                }
            }
            catch (e) {
                console.log(e)
                setError('Something went wrong! Retry!')
                setMessage('');
                displayErr();
            }
        }
        setLoading(false)
    }

    async function confirmSignUp () {
        try {
            setLoading(true);
            await AuthService.confirmCode(email, code);
            setLoading(false);
            alert('Registration was successful')
            router.push('/account/signin');
        }
        catch (error) {
            console.log('error confirming sign up', error);
            setError('Confirmation error! Wrong code, try again or click "Resend Code"');
            setMessage('');
            displayErr();
        }
    }

    async function resendConfirmationCode (): Promise<void> {
        try {
            await Auth.resendSignUp(email);
            console.log('code resent successfully');
            setMessage('Code returned successfully. Enter and confirm your registration!');
            setError('');
            displayInfo();
        }
        catch (error) {
            console.log('error resending code: ', error);
            setError('Connection error, try again!');
            setMessage('');
            displayErr()
        }
    }

    const displayErr = () => {
        return (error ? <div className="alert alert-danger">{error}</div> : '');
    }

    const displayInfo = () => {
        return (message ? <div className="alert alert-info">{message}</div> : '');
    }

    return (
        <CustomerLayout header footer>
            {isCode ? (
                <div className={styles.div}>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail" className="">Email</Label>
                            <Input required type="email" name="email" onChange={(e) => { setEmail(e.target.value) }} id="exampleEmail" placeholder="something@idk.cool" value={email}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleCode" className="">Code</Label>
                            <Input required type="text" name="codice" onChange={(e) => { setCode(e.target.value) }} id="exampleCode" placeholder="1234" />
                        </FormGroup>
                        <div>
                            <Button size="lg" onClick={confirmSignUp} color="primary">Confirm registration</Button>
                            <Button size="lg" onClick={resendConfirmationCode} color="primary" style={{ marginLeft: "20px" }}>Resend code</Button>
                        </div>
                    </Form>
                    <div style={{ marginTop: "20px" }}>
                        {displayErr()}
                        {displayInfo()}
                    </div>
                </div>

            ) : (
                <div>
                    <div className={styles.div}>
                        <h1 style={{ marginTop: "5px" }}>Create account</h1>
                        <Form>
                            <FormGroup>
                                <Label for="email" className="">Email</Label>
                                <Input type="email" name="email" onChange={(e) => { setEmail(e.target.value) }} id="email" placeholder="something@idk.cool" required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="confirm_email" className="">Repeat Email</Label>
                                <Input type="email" name="confirm_email" onChange={(e) => { setConfirmEmail(e.target.value) }} onBlur={onVerifyEmail} id="confirm_email" placeholder="something@idk.cool" required />
                            </FormGroup>
                            <FormGroup >
                                <Label for="password" className="">Password</Label>
                                <Input type="password" name="password" onChange={(e) => { setPass(e.target.value) }} id="password" placeholder="sUpErStrong1!" required />
                            </FormGroup>
                            <FormGroup >
                                <Label for="confirm_password" className="">Repeat Password</Label>
                                <Input type="password" name="confirm_password" onChange={(e) => setConfirmPassword(e.target.value)} onBlur={onVerifyPassword} id="confirm_password" placeholder="sUpErStrong1!" required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name" className="">Name</Label>
                                <Input name="name" onChange={(e) => { setPrimaryName(e.target.value) }} id="name" placeholder="Mario" required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="surname" className="">Surname</Label>
                                <Input name="surname" onChange={(e) => { setFamilyName(e.target.value) }} id="surname" placeholder="Rossi" required />
                            </FormGroup>
                            <div>
                                {loading ? (
                                    <div style={{ justifyContent: "center", textAlign: "center" }}>
                                        <Spinner color="primary" style={{ marginTop: "20px" }} />
                                    </div>
                                ) : (
                                    <div style={{ justifyContent: "center", textAlign: "center" }}>
                                        <Button color="primary" size="lg" onClick={signUp}>Create your account</Button>
                                    </div>
                                )}
                            </div>
                            <a href="#" onClick={() => setIsCode(true)}>Do you have to confirm your account? Click here!</a>
                        </Form>
                        <div style={{ marginTop: "20px" }}>
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