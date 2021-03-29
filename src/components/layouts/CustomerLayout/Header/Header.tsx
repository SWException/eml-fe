import React, { useState, useEffect, Fragment } from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import styles from './Header.module.css';
import { SearchBar } from 'components/ui';
import { LogoutButton } from 'components/ui';
import  ProfileButton  from 'components/ProfileButton';
import { useAuth } from 'context';
import Image from 'next/image'

const Header: React.FC = () => {

  const { isAuthenticated } = useAuth()

  useEffect(()=>{
    //
  })

  
  return (
    <Fragment>
      <Navbar className={styles.navbar} expand="md">
        <NavLink>
            <Image src="/logo.png"  href="/" width={120} height={80}/>
            </NavLink>
          <NavLink  href="/" className={styles.siteTitle}><a hover>COMPANY NAME</a></NavLink>
          <SearchBar/>
          <Nav className="ml-auto" navbar>
            <Fragment>
              {isAuthenticated ? (
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
                  <NavLink class="navbar" href="/account/signin"><a hover>Login</a></NavLink>
                </NavItem>
                </Fragment>
              )}
              <NavItem>
              <NavLink class="navbar" href="/cart">
                    <a hover>
                      <Image src="/iconcart2.png" width={40} height={40}/>
                    </a>
                  </NavLink>
              </NavItem>
            </Fragment>
          </Nav>
      </Navbar>    
    </Fragment>
  );
}

export default Header;