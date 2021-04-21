import React, { useState } from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import styles from 'components/ProfileButton/ProfileButton.module.css'

const ProfileButton: React.FC = () =>  {

    const [dropdownOpen, setOpen] = useState(false);

    const dropeffect = () =>{setOpen(!dropdownOpen);} 

  return (
    <>
        <Dropdown isOpen={dropdownOpen} toggle={dropeffect}>
            <DropdownToggle caret className={styles.profile} size="lg" >
                Profile
            </DropdownToggle>
            <DropdownMenu className={styles.dropmenu} >
                <DropdownItem href="/profile">Account Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/orders">My orders</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </>
  );
};

export default ProfileButton;