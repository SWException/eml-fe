import React, { ChangeEvent, useEffect, useState } from 'react';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/CategoryManagement.module.css';
import { Button } from 'reactstrap';
import { AddNewCategory, EditExistingCategory } from 'components/admin/';
import { CategoriesService, sessionService } from 'services';
import { Categories } from 'types';
import { useRouter } from 'next/router';

const CategoryManagement: React.FC = () => {

    const router = useRouter();
    
    const [categories, setCategories] = useState<Categories>();

    useEffect(() => {
        getAllCategories();
        const user = sessionService.getLocalStorage();
        if(sessionService.isAuth() && user.role=='user'){
            router.push('/');
        } else if (!sessionService.isAuth()){
            router.push('/')
        }
    }, [])

    const getCategoriesByName = async (name: string) => {
        console.log(name);
        try {
            const { categories } = await CategoriesService.fetchCategoriesByName(name);
            setCategories(categories);
        } catch (err) {
            console.log(err);
        }
    }

    const getAllCategories = async () => {
        try {
            const categories = await CategoriesService.fetchAllCategories();
            setCategories(categories);
        } catch (err) {
            console.log(err);
        }
    }

    const deleteCategory = async (id: string) => {
        try {
            const { status, message } = await CategoriesService.deleteCategory(id);
            //STATUS HANDLING
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        if (value == '') {
            getAllCategories();
        } else {
            getCategoriesByName(value);
        }
    }

    return (
        <AdminLayout header>
            <h1>Management Categories</h1>
            <div className={styles.tab}>
                <AddNewCategory />
            </div>
            <div className={styles.tab}>
                <label><strong>Search:</strong></label>
                <input className={styles.input} type="text" placeholder="Search category by name..." onChange={(e) => { handleChange(e) }} />
            </div>
            {categories ? (
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
                                    <td><EditExistingCategory category={category} /></td>
                                    <td><Button color="primary" size="lg" onClick={() => deleteCategory(category.id)}>REMOVE</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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