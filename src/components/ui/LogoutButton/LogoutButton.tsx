import React from 'react';
import { Button} from 'reactstrap';
import { useRouter } from 'next/router';
import { useAuth } from 'context'
import styles from 'components/ui/LogoutButton/LogoutButton.module.css'

const LogoutButton: React.FC = () =>  {

    const router = useRouter();

    const { logout } = useAuth()

    const signOut = async() => {
        console.log("HOHOHO");
        try {
            await logout();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

  return (
    <>
      <Button className={styles.button} size="lg" onClick={()=>{signOut();}}>Logout</Button>
    </>
  );
};

export default LogoutButton;