import React from 'react';
import { Navbar, Nav, NavItem, NavLink, NavbarText } from 'reactstrap';
import styles from './Categories.module.css';

const Categories: React.FC = () => {
  return (
    <div>
      <Navbar className={styles.bar} color="light" expand="md">
        <NavbarText className={styles.categories}>Categorie</NavbarText>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/plp">Categoria 1</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/plp">Categoria 2</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Categories;