import React, { useState, useEffect, Fragment } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink,  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, } from 'reactstrap';
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
            <img src="logo.png"  href="/" style={{width:120, height: 80}}/>
          <NavLink  href="/" className={styles.siteTitle}><a hover>COMPANY NAME</a></NavLink>
          <SearchBar/>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto"navbar>
            <Fragment>
              {isAuth ? (
                <Fragment>
              <NavItem>
              <UncontrolledDropdown isOpen={dropdownOpen} toggle={dropeffect}>
                <DropdownToggle caret class="navbar" color="--color-lightblue" size="lg" font-size="3rem" font-weight="600">
                <a hover> Profile </a>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem class="navbar" href="/profile"> <a hover>Account Settings</a></DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem class="navbar" href="/orders"> <a hover>My orders</a></DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              </NavItem>
              <NavItem>
                <LogoutButton />
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
                      <img src="iconcart2.png" style={{width:40, height: 40}}/>
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