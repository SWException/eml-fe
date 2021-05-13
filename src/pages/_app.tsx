import React from 'react';
import { AppProps } from 'next/app';
import { User } from 'types';
import 'styles/globals.css';
import { StoreProvider } from 'context/store';

interface MyAppProps extends AppProps {
    currentUser: User | null;
}

const MyApp = ({ Component, pageProps, currentUser }: MyAppProps): JSX.Element => {
    return (
        <StoreProvider currentUser={currentUser}>
            <Component {...pageProps} />
        </StoreProvider>
    );
};

MyApp.getInitialProps = async () => {
    const currentUser: User | null = null;

    return { currentUser };
};

export default MyApp

/*
Se utente è autenticato allora carico il suo Context,
se non è autenticato allora parto tutto da 0
*/