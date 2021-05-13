import React, { ChangeEvent, useEffect, useState, Dispatch } from 'react';
import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/ProductManagement.module.css';
import { Button } from 'reactstrap';
import { Categories, Category, Product, Products } from 'types';
import { GetStaticProps } from 'next';
import { CategoriesService, ProductService, sessionService } from 'services';

interface Props {
    defaultProducts: Products,
    categories: Category[]
}

const ProductManagement: React.FC<Props> = ({ defaultProducts, categories }) => {
    const router = useRouter();

    const [products, setProducts]: [Products, Dispatch<Products>] = useState<Products>(defaultProducts);
    const [currentCategory, setCurrentCategory]: [string, Dispatch<string>] = useState<string>("");

    useEffect(() => {
        const user = sessionService.getLocalStorage();
        updateProducts();
    }, []);

    const updateProducts = async (): Promise<void> => {
        const newProducts = await ProductService.fetchProducts({category: currentCategory});
        setProducts(newProducts);
    }

    const addNewProduct = (): void => {
        router.push('/admin/addNewProduct');
    }

    const editProduct = (id: string): void => {
        router.push('/admin/productManagement/' + id);
    }

    const removeProduct = async (id: string): Promise<void> => {
        try {
            const result: boolean = await ProductService.deleteProduct(id);
            console.log(result);
            alert("Product successfully removed!");
            window.location.reload();
        }
        catch (err) {
            alert("Something went wrong, please try again later!")
        }
    }

    const handleCategoryChange = async (e: ChangeEvent<HTMLSelectElement>): Promise<void> => {
        const value = e.target.value;
        setCurrentCategory(value);
        setProducts((await ProductService.fetchProducts({ category: value })));
    }

    const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
        const value = e.target.value;
        setProducts((await ProductService.fetchProducts({ category: currentCategory, search: value })));
    }

    const clearId = (id:string):string => {
        const idCut:string = id.slice(0, 4) + '...' + id.slice(32, 36);
        console.log(idCut)
        return idCut;
    }

    const renderCategoryCombobox = (): JSX.Element => (
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
            <h1>Products Management</h1>
            <div className={styles.div}>
                <Button color="primary" size="lg" onClick={addNewProduct}>ADD NEW PRODUCT</Button>
            </div>
            {renderCategoryCombobox()}
            <div className={styles.div}>
                <label><strong>Search:</strong></label>
                <input className={styles.input} type="text" placeholder="Search Product by name..." onChange={(e) => handleSearchChange(e)} />
            </div>
            <div className={styles.div}>
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
                        {products?.map((product: Product) => (
                            <tr key={product.id}>
                                <td>{clearId(product.id)}</td>
                                <td>{product.name}</td>
                                <td>€ {product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.tax}</td>
                                <td><Button color="primary" size="lg" onClick={() => editProduct(product.id)}>EDIT</Button></td>
                                <td><Button color="primary" size="lg" onClick={() => removeProduct(product.id)}>X</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default ProductManagement;

export const getStaticProps: GetStaticProps = async () => {
    const defaultProducts: Products = await ProductService.fetchProducts().catch(() => null);
    const categories: Categories = await CategoriesService.fetchAllCategories().catch(() => null);
    console.log(categories);

    return {
        props: { defaultProducts, categories },
        revalidate: 30
    }
}
