import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { Button } from 'reactstrap';
import { ProductService } from 'services';
import { useRouter } from 'next/router'

const SearchBar: React.FC = () => {

    const router = useRouter()

    const [product, setProduct] = useState('');

    const researchProduct = async () => {
        const products = await ProductService.fetchProducts({search: product});
        if(products.length > 0){
            router.push('/')
            //setProducts on products on ProductContext
        }
    }

    return (
        <>
            <div className={styles.div}>
                <input className={styles.input} type="text" onChange={(e)=>{setProduct(e.target.value)}} placeholder="Search Product by name..." />
            </div>
        </>
    );
};

export default SearchBar;