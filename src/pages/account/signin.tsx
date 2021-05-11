import Amplify from 'aws-amplify';
import awsconfig from 'aws-exports';
import React, { useEffect, useState } from 'react'
import { Spinner, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { SetNewPassword } from 'components/auth';
import { useRouter } from 'next/router';
import { useAuth } from 'context';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import styles from 'styles/Account.module.css'
import { AuthService, CartService } from 'services';

Amplify.configure(awsconfig);
// Salva in automatico i cookie per ricordare il il login è stato fatto

const Login: React.FC = () => {

    const router = useRouter();

    const { login } = useAuth();

    useEffect(() => {
        const mex = window.localStorage.getItem('mex');
        if (mex) {
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

    const signIn = async () => {
        setLoading(true);
        try {
            await login(email, password)
            const user = JSON.parse(window.localStorage.getItem('user'))
            console.log(user)
            const {role} = await AuthService.getCurrentUserData();
            if (role === "Admin") {
                router.push('/admin/dashboard');
            }
            else {
                await loadTheCart();
                router.push('/');
            }
        }
        catch (e) {
            setLoading(false);
            setError('Something went wrong! Retry!');
            displayErr();
        }
    }

    const loadTheCart = async () => {
        console.log("loadTheCart");
        const id_cart: string = window.localStorage.getItem('id_cart');
        console.log(id_cart);
        
        const res = await CartService.authenticateCart(id_cart).catch(()=>false);
        if(!res){
            throw new Error('Issue on loading the Cart')
        }
        else {
            window.localStorage.removeItem('id_cart');
        }
    }

    const displayErr = () => {
        return (error ? <div className="alert alert-danger">{error}</div> : '');
    }

    const displayInfo = () => {
        return (message ? <div className="alert alert-info">{message}</div> : '');
    }

    const signUp = () => {
        router.push('/account/signup');
    }

    return (
        <CustomerLayout header footer>
            {remember ? (
                <SetNewPassword />
            ) : (
                <div className={styles.div}>
                    <h1 style={{ marginTop: "5px" }}>Login</h1>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail" className="">Email</Label>
                            <Input type="email" name="email" onChange={(e) => { setEmail(e.target.value) }} id="exampleEmail" placeholder="something@idk.cool" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword" className="">Password</Label>
                            <Input type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} id="examplePassword" placeholder="sUpErStrong1!" />
                        </FormGroup>
                        <div>
                            {loading ? (
                                <div style={{ justifyContent: "center", textAlign: "center" }}>
                                    <Spinner color="primary" style={{ marginTop: "20px" }} />
                                </div>
                            ) : (
                                <div>
                                    <div style={{ justifyContent: "center", textAlign: "center" }}>
                                        <Button color="primary" size="lg" onClick={signIn}>Login</Button>
                                    </div>
                                    <div>
                                        <p className={styles.p}>Forgot your password?</p>
                                        <button className={styles.recoverButton} onClick={() => { setRemember(true) }}>Recover</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div style={{ marginTop: "60px" }}>
                            <h1 style={{ fontSize: "20px" }}>Are you not registered? Do it now!</h1>
                        </div>
                        <div>
                            {loading ? (
                                <div style={{ justifyContent: "center", textAlign: "center" }}>
                                    <Spinner color="primary" style={{ marginTop: "20px" }} />
                                </div>
                            ) : (
                                <div style={{ justifyContent: "center", textAlign: "center" }}>
                                    <Button onClick={signUp} color="primary" size="lg">SignUp</Button>
                                </div>
                            )
                            }
                        </div>
                    </Form>
                    <div style={{ marginTop: "20px" }}>
                        {displayErr()}
                        {displayInfo()}
                    </div>
                </div>
            )}

        </CustomerLayout>

    );
};

export default Login;