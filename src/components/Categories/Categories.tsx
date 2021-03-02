import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import styles from './Categories.module.css';

const Categories = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" expand="md">
        <NavbarText className={styles.categories}>Categorie</NavbarText>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="">Categoria 1</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="">Categoria 2</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Categories;