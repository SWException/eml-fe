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
            <DropdownMenu>
                <DropdownItem href="/profile" className={styles.item} >Account Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/orders" className={styles.item}>My orders</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </>
  );
};

export default ProfileButton;