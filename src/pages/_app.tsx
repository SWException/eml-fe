import React from 'react';
import { AppProps, AppContext } from 'next/app';
import { User } from 'types';
import 'styles/globals.css';
import { StoreProvider } from 'context/store';

interface MyAppProps extends AppProps {
    currentUser: User | null;
}

const MyApp = ({ Component, pageProps, currentUser, router }: MyAppProps): JSX.Element => {

    return (
        <StoreProvider currentUser={currentUser}>
            <Component {...pageProps} />
        </StoreProvider>
    );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
    let currentUser: User | null = null;

    return { currentUser };
};

export default MyApp

//getInitialProps

/*
Se utente è autenticato allora carico il suo Context,
se non è autenticato allora parto tutto da 0
*/