import React, { useState, useEffect, Fragment } from 'react';
import { Navbar, Nav, NavItem, NavLink, Collapse, NavbarToggler, NavbarBrand } from 'reactstrap';
import styles from './Header.module.css';
import { SearchBar } from 'components/ui';
import { LogoutButton } from 'components/ui';
import  ProfileButton  from 'components/ProfileButton';
import { useAuth } from 'context';
import Image from 'next/image';
import { sessionService } from 'services'

/**
 * Context check isAuthenticated
 */

const Header: React.FC = () => {

  //const { isAuthenticated } = useAuth();
  const [auth, setAuth] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(()=>{
    if(sessionService.isAuth()){
      setAuth(true)
    } else {
      setAuth(false)
    }
  })

  
  return (
    <Fragment>
      <Navbar className={styles.navbar} expand="md">
          <NavbarBrand href="/">
            <Image src="/logo.png" width={120} height={80}/>
            </NavbarBrand>
          <NavbarBrand  href="/" className={styles.siteTitle}><a>COMPANY NAME</a></NavbarBrand>
          <NavbarToggler onClick={toggle}  className={styles.navtoggler}>Menu</NavbarToggler>
          <Collapse isOpen={isOpen} navbar>
          <SearchBar/>
          <Nav className="ml-auto" navbar>
            <Fragment>
              {auth ? (
                <Fragment>
              <NavItem>
              <ProfileButton/>
              </NavItem>
              <NavItem>
                <LogoutButton/>
              </NavItem>
                </Fragment>
              ) : (
                <Fragment>
                <NavItem>
                  <NavLink className="navbar" href="/account/signin"><a>Login</a></NavLink>
                </NavItem>
                </Fragment>
              )}
              <NavItem>
              <NavLink className="navbar" href="/cart">
                    <a>
                      <Image src="/iconcart2.png" width={40} height={40}/>
                    </a>
                  </NavLink>
              </NavItem>
            </Fragment>
          </Nav>
          </Collapse>
      </Navbar>    
    </Fragment>
  );
}

export default Header;