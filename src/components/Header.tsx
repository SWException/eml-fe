import { useState, Fragment } from 'react';
import Link from 'next/link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export default function Header () {
  const [isOpen, setIsOpen] = useState(false);

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
            </Fragment>
          </Nav>
        </Collapse>
      </Navbar>
    </Fragment>
  );
}