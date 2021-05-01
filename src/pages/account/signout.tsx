import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'aws-exports';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
Amplify.configure(awsconfig);

// Elimina i cookie e fa il logout

const Logout: React.FC = () => {

    // const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    useEffect(() => {
        signOut();
        let err = window.localStorage.getItem('err');
        if (err) {
            // setMessage(err);
            window.localStorage.removeItem('err');
        }
    }, [])

    async function signOut() {
        console.log("HOHOHO");
        try {
            await Auth.signOut();
            console.log("Logout");
            window.localStorage.removeItem('jwt');
            window.localStorage.clear();
            window.localStorage.setItem('err', 'Sei uscito da questo sito!');
            window.location.reload();
            setError('');
            redirectToHomePage();
        } catch (error) {
            console.log('error signing out: ', error);
            setError('Errore durante il logout, riprovare');
            // setMessage('');
            displayErr();
        }
    }

    const displayErr = () => {
        return (error ? <div className="alert alert-danger">{error}</div> : '');
    }


    const redirectToHomePage = () => {
        router.push('/');
    }

    return (
        <>
            <p>test</p>
        </>
    );

};

export default Logout;
