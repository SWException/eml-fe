import React from 'react';
import { Navbar, Nav, NavItem, NavLink, NavbarText } from 'reactstrap';
import styles from './Categories.module.css';

const Categories: React.FC = () => {
    return (
        <div>
            <Navbar className={styles.bar} color="light" expand="md">
                <NavbarText className={styles.categories}>CATEGORIES</NavbarText>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/products">CATEGORY 1</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/products">CATEGORY 2</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
}

export default Categories;