import Layout from '../../components/Layout';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import { Button } from 'reactstrap';
import { useEffect, useState } from 'react';
Amplify.configure(awsconfig);

// Elimina i cookie e fa il logout

const Logout = () => {

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(()=>{
        let err = window.localStorage.getItem('err');
        if(err){
            setMessage(err);
            window.localStorage.removeItem('err');
        }
    }, [])

    async function signOut() {
        try {
            await Auth.signOut();
            console.log("Logout");
            window.localStorage.removeItem('jwt');
            window.localStorage.clear();
            window.localStorage.setItem('err', 'Sei uscito da questo sito!');
            window.location.reload();
            setError('');
            displayInfo();
        } catch (error) {
            console.log('error signing out: ', error);
            setError('Errore durante il logout, riprovare');
            setMessage('');
            displayErr();
        }
    }
    /*
    async function signOutGlobal() {
        try {
            await Auth.signOut({ global: true });
            console.log("Logout global");
            window.localStorage.removeItem('jwt');
            window.localStorage.clear();
            window.localStorage.setItem('err', 'Sei uscito da questo sito!');
            window.location.reload();
            setMessage('Sei uscito da tutti i dispositivi collegati a questo sito!');
            setError('');
            displayInfo();
        } catch (error) {
            console.log('error signing out: ', error);
            setError('Errore durante il logout, riprovare');
            setMessage('');
            displayErr();
        }
    };
*/
    const displayErr = () =>{
        return (error ? <div className="alert alert-danger">{error}</div> : '');
    }

    const displayInfo = () =>{
        return (message ? <div className="alert alert-info">{message}</div> : '');
    }

    return(
    <Layout>
        <div className="div-card">
            <div className="loginCard" style={{textAlign: "center"}}>
                <h1>Logout</h1>
                <div className="div-button-login" style={{marginTop: "20px"}}>
                    <Button color="primary" onClick={signOut}>Logout</Button>
                </div>  
                <div className="info-reg-err">
                    {displayErr()}
                    {displayInfo()}
                </div>              
            </div>
        </div>
    </Layout>
    );

};

export default Logout;