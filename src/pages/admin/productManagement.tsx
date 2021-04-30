import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/ProductMagagement.module.css';
import {Button} from 'reactstrap';
import { Product } from 'types';
import { useShop } from 'context';

const ProductManagement: React.FC = () => {
    
    const { loadProducts, products } = useShop();

    useEffect(()=>{
      products.length === 0 && loadProducts();
    }, [])
    
    const router = useRouter();

    const addNewProduct = () => {
        router.push('/admin/addNewProduct');
    }

    const editProduct = (id: string) => {
        router.push('/admin/editExistingProduct?id=' + id);
    }
    
    return (
        <AdminLayout header>
            <div className={styles.div}>
            <Button color="primary" size="lg" onClick={addNewProduct}>ADD NEW PRODUCT</Button>
            </div>
            <div className={styles.div}>
            <select className={styles.category}>
                <option>Choose a category</option>
                <option>CATEGORY 1</option>
                <option>CATEGORY 2</option>
                <option>CATEGORY 3</option>
                <option>CATEGORY 4</option>
                <option>CATEGORY 5</option>
                <option>CATEGORY 6</option>
            </select>
            </div>
            <div className={styles.div}>
            <input className={styles.input} type="text" placeholder="Search Product by name..."/>
            <Button type="submit" formAction="/products" style={{border: "2px solid #ccc", backgroundColor: "#ccc", borderRadius:"0"}}>
                <img src="/iconsearch.png" style={{width:"2.3rem", height:"2.3rem"}}/>
            </Button>
            </div>
            <table className={styles.products}>
                <th>
                    ID
                </th>
                <th>
                    NAME
                </th>
                <th>
                    NET PRICE
                </th>
                <th>
                    CATEGORY
                </th>
                <th>
                    TAX
                </th>
               
                {products.map((product)=>(
                    <tr>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>€ {product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.tax}</td>
                        <td><Button color="primary" size="lg" onClick={() => editProduct(product.id)}>EDIT</Button></td>
                        <td><Button color="primary" size="lg">REMOVE</Button></td>
                    </tr>
                ))}
            </table>
        </AdminLayout>
    );
};

export default ProductManagement;