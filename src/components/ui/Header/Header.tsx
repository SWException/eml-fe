import React, { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import { Categories } from 'components/ui';

interface Props {
  isVisible: string;
}

const Header: React.FC<Props> = ({isVisible}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isCategoryListAvailable, setIsCategoryListAvailable] = useState(false);

  useEffect(()=>{
    if(window.localStorage.getItem('jwt')){
      setIsAuth(true);
    }
  })

  useEffect(()=>{
    if(isVisible == "true"){
      setIsCategoryListAvailable(true);
    }else{
      setIsCategoryListAvailable(false);
    }
  })

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold">EMPORIO LAMBDA</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <Fragment>
              {isAuth ? (
                <Fragment>
              <NavItem className="pointer">
                <Link href="/profile">
                  <NavLink>Profile</NavLink>
                </Link>
              </NavItem>
              <NavItem className="pointer">
                <Link href="/account/signout"><NavLink>Logout</NavLink></Link>
              </NavItem>
                </Fragment>
              ) : (
                <Fragment>
                <NavItem className="pointer">
                <Link href="/account/signin"><NavLink>Login</NavLink></Link>
                </NavItem>
                <NavItem className="pointer">
                <Link href="/account/signup"><NavLink>SignUp</NavLink></Link>
                </NavItem>
                </Fragment>
              )}
              <NavItem className="pointer">
                <Link href="/cart">
                  <NavLink>Cart</NavLink>
                </Link>
              </NavItem>
            </Fragment>
          </Nav>
        </Collapse>
      </Navbar>
      { isCategoryListAvailable &&  (
      <Categories/>
      )}    
    </Fragment>
  );
}

export default Header;