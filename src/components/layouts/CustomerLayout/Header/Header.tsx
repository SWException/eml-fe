import React, { useState, useEffect, Fragment } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import Link from 'next/link';
import styles from './Header.module.css';
import { SearchBar } from 'components/ui';
import { LogoutButton } from 'components/ui';
import { useAuth } from 'context';


const Header: React.FC = () => {

  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated } = useAuth()

  useEffect(()=>{
    //
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
              {isAuthenticated ? (
                <Fragment>
              <NavItem>
                <Link href="/profile">
                  <NavLink>Profile</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/orders">
                  <NavLink>My Orders</NavLink>
                </Link>
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
                  <NavItem>
                  <Link href="/account/signup"><NavLink>Signup</NavLink></Link>
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