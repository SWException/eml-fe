import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { Button } from 'reactstrap';
import { ProductService } from 'services';
import { useRouter } from 'next/router'

const SearchBar: React.FC = () => {

    const router = useRouter()

    const [product, setProduct] = useState('');

    const researchProduct = async() => {
        try {
            const { products, total } = await ProductService.fetchProducts(
                {params:
                    {
                        search: product
                    }
                });
            if(products.length > 0){
                router.push('/')
                //setProducts on products on ProductContext
            }
        } catch(err) {

        }
        
    }

    return (
        <>
            <div className={styles.div}>
                <input className={styles.input} type="text" onChange={(e)=>{setProduct(e.target.value)}} placeholder="Search Product by name..." />
                <Button type="submit" formAction="/products" onClick={researchProduct} color="light" style={{ borderRadius: "0px 25px 25px 0px" }}>
                    <img src="/iconsearch.png" style={{ width: "2.1rem", height: "2.1rem" }} />
                </Button>
            </div>
        </>
    );
};

export default SearchBar;