import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/ProductManagement.module.css';
import { Button } from 'reactstrap';
import { Category, Products } from 'types';
import { GetServerSideProps } from 'next';
import { CategoriesService, ProductService, sessionService } from 'services';

interface Props {
    defaultProducts: Products,
    categories: Category[]
}

const ProductManagement: React.FC<Props> = ({ defaultProducts, categories }) => {
    const router = useRouter();

    useEffect(()=>{
        const user = sessionService.getLocalStorage();
        if(sessionService.isAuth() && user.role=='user'){
            router.push('/');
        } else if (!sessionService.isAuth()){
            router.push('/')
        }
    });

    const [products, setProducts] = useState<Products>(defaultProducts);
    const [currentCategory, setCurrentCategory] = useState<string>("");

    const addNewProduct = () => {
        router.push('/admin/addNewProduct');
    }

    const editProduct = (id: string) => {
        router.push('/admin/editExistingProduct?id=' + id);
    }

    const handleCategoryChange = async (e: ChangeEvent<HTMLSelectElement>): Promise<void> => {
        const value = e.target.value;
        setCurrentCategory(value);
        setProducts((await ProductService.fetchProducts({params:{category:value}})).products);
    }
    
    const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
        const value = e.target.value;
        setProducts((await ProductService.fetchProducts({params:{category:currentCategory,search:value}})).products);
    }

    const renderCategoryCombobox = (): any => (
        <div className={styles.div}>
            <label>Category:</label>
            <select className={styles.select} onChange={(e) => handleCategoryChange(e)}>
                <option value="">-- Home products --</option>
                {categories?.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
        </div>
    )

    return (
        <AdminLayout header>
            <div className={styles.div}>
                <Button color="primary" size="lg" onClick={addNewProduct}>ADD NEW PRODUCT</Button>
            </div>
            {renderCategoryCombobox()}
            <div className={styles.div}>
                <input className={styles.input} type="text" placeholder="Search Product by name..." onChange={(e) => handleSearchChange(e)} />
                <Button type="submit" formAction="/products" style={{ border: "2px solid #ccc", backgroundColor: "#ccc", borderRadius: "0" }}>
                    <img src="/iconsearch.png" style={{ width: "2.3rem", height: "2.3rem" }} />
                </Button>
            </div>
            <table className={styles.products}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>NET PRICE</th>
                        <th>CATEGORY</th>
                        <th>TAX</th>
                        <th>EDIT</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>€ {product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.tax}</td>
                            <td><Button color="primary" size="lg" onClick={() => editProduct(product.id)}>EDIT</Button></td>
                            <td><Button color="primary" size="lg">REMOVE</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AdminLayout>
    );
};

export default ProductManagement;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query?.id as string;
    const category = context.query?.category as string;

    try {
        const defaultProducts = (await ProductService.fetchProducts()).products;
        const categories = await CategoriesService.fetchAllCategories();
        console.log(categories);

        return {
            props: { defaultProducts, categories },
        }
    } catch (err) {
        console.log(err);
    }
}