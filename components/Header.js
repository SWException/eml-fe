import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  DropdownButton,
  InputGroupButtonDropdown
} from 'reactstrap';
import Popper from 'popper.js';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold">EMPORIO LAMBDA</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <React.Fragment>
              <NavItem>
                <Link href="/">
                  <NavLink>Home</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/profile">
                  <NavLink>Profile</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/account/signin"><NavLink>Login</NavLink></Link>
              </NavItem>
              <NavItem>
                <Link href="/account/signout"><NavLink>Logout</NavLink></Link>
              </NavItem>
              <NavItem>
                <Link href="/account/signup"><NavLink>SignUp</NavLink></Link>
              </NavItem>
              <NavItem>
                <Link href="/cart">
                  <NavLink>Cart</NavLink>
                </Link>
              </NavItem>
            </React.Fragment>
          </Nav>
        </Collapse>
      </Navbar>
    </React.Fragment>
  );
};

export default Header;