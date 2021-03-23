import React, { useState } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import styles from './Button.module.css';
import { Button, Spinner, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { useRouter } from 'next/router';
import { useAuth } from 'context'

const LogoutButton: React.FC = () =>  {

    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const { logout } = useAuth()

    const signOut = async() => {
        console.log("HOHOHO");
        try {
            await logout();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

  const toggle = () => setIsOpen(prevState => !prevState);

  return (
    <>
      <Dropdown isOpen={isOpen} toggle={toggle}>
        <DropdownToggle>
            Logout
        </DropdownToggle>
        <DropdownMenu
            modifiers={{
            setMaxHeight: {
                enabled: true,
                order: 890,
                fn: (data) => {
                return {
                    ...data,
                    styles: {
                    ...data.styles,
                    overflow: 'auto',
                    maxHeight: '200px',
                    },
                };
                },
            },
            }}
            >
            <DropdownItem><Button onClick={()=>{
                signOut();
            }}>Logout</Button></DropdownItem>
            <DropdownItem><Button>Logout all devices</Button></DropdownItem>
        </DropdownMenu>
        </Dropdown>
    </>
  );
};

export default LogoutButton;