import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/CategoryManagement.module.css';
import { Button } from 'reactstrap';
import { AddNewCategory, EditExistingCategory } from 'components/admin/';
import { CategoriesService } from 'services';
import { Categories } from 'types';
import { GetStaticProps } from 'next';

type Props = {
    initialCategories: Categories
}

const CategoryManagement: React.FC<Props> = ({initialCategories}) => {

    const [categories, setCategories]: [Categories, Dispatch<Categories>] = useState<Categories>(initialCategories);

    useEffect(() => {
        setCategories(initialCategories);
    }, [initialCategories])

    const getCategoriesByName = async (name: string): Promise<void> => {
        console.log(name);
        try {
            const categories: Categories = await CategoriesService.fetchCategoriesByName(name);
            setCategories(categories);
        }
        catch (err) {
            console.log(err);
        }
    }

    const getAllCategories = async (): Promise<void> => {
        try {
            const categories = await CategoriesService.fetchAllCategories();
            setCategories(categories);
            console.log(categories);
        }
        catch (err) {
            console.log(err);
        }
    }

    const deleteCategory = async (id: string): Promise<void> => {
        try {
            const response: boolean = await CategoriesService.deleteCategory(id);
            console.log(response);
            if (response) {
                getAllCategories();
                confirm("Category deleted successfully!");
            }
            else {
                alert("Something went wrong, try again later ..");
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        if (value == '') {
            getAllCategories();
        }
        else {
            getCategoriesByName(value);
        }
    }

    return (
        <AdminLayout header>
            <h1>Management Categories</h1>
            <div className={styles.tab}>
                <AddNewCategory
                    loadCategories={() => { getAllCategories() }}
                />
            </div>
            <div className={styles.tab}>
                <label><strong>Search:</strong></label>
                <input className={styles.input} type="text" placeholder="Search category by name..." onChange={(e) => { handleChange(e) }} />
            </div>
            {categories ? (
                <div>
                    <div className={styles.tab}>
                        <table className={styles.categories}>
                            <thead>
                                <tr>
                                    <th>NAME</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category.id}>
                                        <td>{category.name}</td>
                                        <td>
                                            <EditExistingCategory
                                                category={category}
                                                loadCategories={() => { getAllCategories() }}
                                            /></td>
                                        <td><Button color="primary" size="lg" onClick={() => deleteCategory(category.id)}>REMOVE</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div>
                    No categories
                </div>
            )}

        </AdminLayout>
    );
};

export default CategoryManagement;

export const getStaticProps: GetStaticProps = async () => {
    
    const initialCategories = await CategoriesService.fetchAllCategories().catch(() => null);
    return {
        props: { initialCategories },
        revalidate: 30
    }
}