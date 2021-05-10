import Link from 'next/link';
import { Product, Products } from 'types';
import React from 'react';
import styles from './ProductList.module.css';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

interface Props {
    products: Products;
}

const ProductList: React.FC<Props> = ({ products }) => {
    return (
        <>  
            <div className={styles.productGrid}>
                {products?.map((product: Product) => (
                    <Link href={`/products/${product.id}`} key={product.id}>
                        <a>
                            <div>
                                <div className={styles.productImgWrapper}>
                                    <Card className={styles.card}>
                                        <CardImg top width="100%" 
                                            src={product.primaryPhoto}
                                            alt={product.name + " image"}
                                            style={{ width:"25rem", height: "25rem", objectFit: "contain", backgroundColor: "white"}} />
                                        <CardBody>
                                            <CardTitle>€{product.price}</CardTitle>
                                            <CardSubtitle className="mb-2 text-muted">{product.name}</CardSubtitle>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default ProductList;