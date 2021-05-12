import React from 'react';
import { Button } from 'reactstrap';
import { useAuth } from 'context'
import styles from 'components/ui/LogoutButton/LogoutButton.module.css'
import { useRouter } from 'next/router';

const LogoutButton: React.FC = () => {
    const { logout } = useAuth();
    
    const router = useRouter();

    const signOut = async () => {
        try {
            await logout();
            router.push('/')
        }
        catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <>
            <Button className={styles.button} size="lg" onClick={() => { signOut(); }}>Logout</Button>
        </>
    );
};

export default LogoutButton;