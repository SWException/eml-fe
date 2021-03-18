import React, { useState, useEffect, Fragment } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Link from 'next/link';
import styles from './Header.module.css';
import { SearchBar } from 'components/ui';
import { LogoutButton } from 'components/ui';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [dropdownOpen, setOpen] = useState(false);

  const dropeffect = () =>{setOpen(!dropdownOpen);} 


  useEffect(()=>{
    if(window.localStorage.getItem('jwt')){
      setIsAuth(true);
    }
  })

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <Navbar className={styles.navbar} expand="md">
        <Link href="/">
          <NavLink className={styles.siteTitle}>COMPANY NAME</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <NavItem>
                <SearchBar/>
            </NavItem>
            <Fragment>
              {isAuth ? (
                <Fragment>
              <NavItem>
              <ButtonDropdown isOpen={dropdownOpen} toggle={dropeffect}>
                <DropdownToggle caret color="--color-lightblue" size="lg" font-size="3rem" font-weight="600">
                  Profile
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="/profile">Account Settings</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="/orders">My orders</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              </NavItem>
              <NavItem>
                <LogoutButton />
              </NavItem>
                </Fragment>
              ) : (
                <Fragment>
                <NavItem>
                  <Link href="/account/signin"><NavLink>Login</NavLink></Link>
                </NavItem>
                </Fragment>
              )}
              <NavItem>
                <Link href="/cart">
                  <NavLink>Cart</NavLink>
                </Link>
              </NavItem>
            </Fragment>
          </Nav>
        </Collapse>
      </Navbar>    
    </Fragment>
  );
}

export default Header;