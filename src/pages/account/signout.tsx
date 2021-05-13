import Amplify, { Auth } from 'aws-amplify';
import awsconfig from 'aws-exports';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
Amplify.configure(awsconfig);

// Elimina i cookie e fa il logout

const Logout: React.FC = () => {

    // const [message, setMessage] = useState('');

    const router = useRouter();

    useEffect(() => {
        signOut();
        const err = window.localStorage.getItem('err');
        if (err) {
            // setMessage(err);
            window.localStorage.removeItem('err');
        }
    }, [])

    async function signOut () {
        console.log("HOHOHO");
        try {
            await Auth.signOut();
            console.log("Logout");
            window.localStorage.removeItem('jwt');
            window.localStorage.clear();
            router.push('/');
        }
        catch (error) {
            console.log('error signing out: ', error);
            router.push('/account/signin');
        }
    }

    return (
        <>
        </>
    );

};

export default Logout;
