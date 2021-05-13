import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap';
import { CategoriesService } from 'services';
import { Category } from 'types';
import styles from './Categories.module.css';
import Link from 'next/link';


const CategoriesToShow: React.FC = () => {

    const [categories, setCategories] = useState<Category[]>()

    useEffect(() => {
        getAllCategories();
    }, [])

    const getAllCategories = async (): Promise<void> => {
        try {
            const categories = await CategoriesService.fetchAllCategories();
            setCategories(categories);
            console.log(categories)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Navbar className={styles.bar} color="light" expand="md">
                <Nav navbar className={styles.container}>
                    {categories ? (
                        <div className={styles.container}>
                            {categories.map((category) => (
                                <NavItem>
                                    <Link href={"/products/category/" + category.id} >{category.name.toUpperCase()}</Link>
                                </NavItem>
                            ))}
                        </div>
                    ): ( 
                        <>
                        </>
                    )}
                </Nav>
            </Navbar>
        </div>
    );
}

export default CategoriesToShow;