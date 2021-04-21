import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { CategoriesService } from 'services';
import { Categories, Category } from 'types';
import styles from './Categories.module.css';

/**
 * Sistemare display orizzontale di tutte le categorie trovate?
 */

const CategoriesToShow: React.FC = () => {

    const [categories, setCategories] = useState<Category[]>()

    useEffect(()=>{
      getAllCategories()
    }, [])

    const getAllCategories = async() => {
      try {
        const { categories } = await CategoriesService.fetchAllCategories();
        setCategories(categories);
      } catch(err) {
        console.log(err)
      }
    }

    return (
      <div>
        <Navbar className={styles.bar} color="light" expand="md">
          <Nav navbar className={styles.container}>
            {categories ? (
              <div className={styles.container}>
                {categories.map((category)=>(
                  <NavItem>
                    <NavLink href='/products'>{`${category.name.toUpperCase()}`}</NavLink>
                  </NavItem>
                ))}
              </div>
            ) : (
              <div className={styles.container}>
                <NavItem>
                  <NavLink href="/products">CATEGORY 1</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/products">CATEGORY 2</NavLink>
                </NavItem>
              </div>
            )}
          </Nav>
        </Navbar>
      </div>
    );
}

export default CategoriesToShow;