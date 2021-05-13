import React, { useState, useEffect, Fragment } from 'react';
import { Navbar, Nav, NavItem, NavLink, Collapse, NavbarToggler, NavbarBrand } from 'reactstrap';
import styles from './Header.module.css';
import { LogoutButton, SearchBar } from 'components/ui';
import ProfileButton from 'components/ProfileButton';
import { sessionService } from 'services'

/**
 * Context check isAuthenticated
 */

const Header: React.FC = () => {

    //const { isAuthenticated } = useAuth();
    const [auth, setAuth] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (sessionService.isAuth()) {
            setAuth(true)
        }
        else {
            setAuth(false)
        }
    })


    return (
        <Fragment>
            <Navbar className={styles.navbar} expand="md">
                <NavbarBrand href="/">
                    <img src="/logoemp.png" width={170} height={60} />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} className={styles.navtoggler}>Menu</NavbarToggler>
                <Collapse isOpen={isOpen} navbar>
                    <SearchBar />
                    <Nav className="ml-auto" navbar>
                        <Fragment>
                            {auth ? (
                                <Fragment>
                                    <NavItem>
                                        <ProfileButton />
                                    </NavItem>
                                    <NavItem>
                                        <LogoutButton />
                                    </NavItem>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <NavItem>
                                        <NavLink className="navbar" href="/account/signin">Login</NavLink>
                                    </NavItem>
                                </Fragment>
                            )}
                            <NavItem>
                                <NavLink className="navbar" href="/cart">
                                    <img src="/iconcart.png" width={40} height={40} />
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