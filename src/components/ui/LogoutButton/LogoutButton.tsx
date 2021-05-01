import React from 'react';
import { Button } from 'reactstrap';
import { useAuth } from 'context'
import styles from 'components/ui/LogoutButton/LogoutButton.module.css'

const LogoutButton: React.FC = () => {
    const { logout } = useAuth()

    const signOut = async () => {
        try {
            logout();
            window.location.reload();
        } catch (error) {
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