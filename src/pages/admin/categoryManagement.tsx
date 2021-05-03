import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/CategoryManagement.module.css';
import { Button } from 'reactstrap';
import { AddNewCategory, EditExistingCategory } from 'components/admin/';
import { CategoriesService, sessionService } from 'services';
import { Categories } from 'types';
import { useRouter } from 'next/router';

const CategoryManagement: React.FC = () => {
    const router = useRouter();

    const [categories, setCategories]: [Categories, Dispatch<Categories>] = useState<Categories>();

    useEffect(() => {
        getAllCategories();
    }, [])

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
                    error={() => {
                        alert("Something went wrong, try again later ..");
                    }}
                    messageIn={() => { window.location.reload() }} />
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
                                                error={() => {
                                                    alert("Something went wrong, try again later ..");
                                                }}
                                                messageIn={() => { window.location.reload() }}
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