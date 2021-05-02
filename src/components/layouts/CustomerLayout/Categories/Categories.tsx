import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { CategoriesService } from 'services';
import { Category } from 'types';
import styles from './Categories.module.css';
import { useRouter } from 'next/router';


const CategoriesToShow: React.FC = () => {
    const router = useRouter();

    const [categories, setCategories] = useState<Category[]>()

    useEffect(() => {
        getAllCategories()
    }, [])

    const getAllCategories = async () => {
        try {
            const categories = await CategoriesService.fetchAllCategories();
            setCategories(categories);
        } catch (err) {
            console.log(err)
        }
    }

    const categoryProducts = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        console.log(e.target);
        const T: any = e.target;
        await router.push('/products?category=' + T.name);
        // window.location.reload();
    }

    return (
        <div>
            <Navbar className={styles.bar} color="light" expand="md">
                <Nav navbar className={styles.container}>
                    {categories ? (
                        <div className={styles.container}>
                            {categories.map((category) => (
                                <NavItem>
                                    <NavLink onClick={(e) => { categoryProducts(e) }} name={category.id} >{`${category.name.toUpperCase()}`}</NavLink>
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