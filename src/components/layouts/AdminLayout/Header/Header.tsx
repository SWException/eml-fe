import React, { useState, useEffect, Fragment } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import Link from 'next/link';
import styles from './Header.module.css';
import { LogoutButton } from 'components/ui'; 



const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

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
        <Link href="/admin/dashboard">
          <NavLink className={styles.siteTitle}>Dashboard</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <Fragment>
              {isAuth ? (
                <Fragment>
                  <NavItem className="">
                    <LogoutButton/>
                  </NavItem>
                </Fragment>
              ) : (
                <Fragment>
                  <NavItem className="">
                    <Link href="/account/signin"><NavLink>Login</NavLink></Link>
                  </NavItem>
                </Fragment>
              )}
            </Fragment>
          </Nav>
        </Collapse>
      </Navbar>    
    </Fragment>
  );
}

export default Header;