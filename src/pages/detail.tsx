import React, { useRouter } from 'next/router';
import { Button, Container } from 'components/ui';
import styles from 'styles/Detail.module.css';
import { ProductService } from 'services/productService';
import { ProductQuantity } from 'components/products';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import { useEffect, useState } from 'react';
import { Product } from '../types/product'
import { Spinner } from 'reactstrap';

interface Props {
    id_product: string
}

const Detail: React.FC<Props> = ({id_product}) => {

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [productData, setProductData] = useState<Product>({
        id: id_product,
        name: '',
        description: '',
        primaryPhoto: '',
        secondaryPhotos: [],
        categories: [],
        price: 0,
        tax: 0,
        show: true,
        showHome: true,
        stock: 0
    });

    const { id, name, description, primaryPhoto, secondaryPhotos,
         categories, price, tax, show, showHome, stock } = productData;
    
    useEffect(()=>{
        loadProduct(id_product);
    }, [])

    const loadProduct = async(id_product) =>{
        setLoading(true);
        const { product } = await ProductService.fetchProduct(id_product);
        setProductData({
            ...productData,
            id: product.id,
            name: product.name,
            description: product.description,
            primaryPhoto: product.primaryPhoto,
            secondaryPhotos: product.secondaryPhotos,
            categories: product.categories,
            price: product.price,
            tax: product.tax,
            show: product.show,
            showHome: product.showHome,
            stock: product.stock
        });
        setLoading(false);
    }
    
    return (
        <CustomerLayout header categories>
            <div className={styles.productContainer}>
                {loading ? (
                    < Spinner />
                ) : (
                <div>
                    <div className={styles.main}>
                        <div className={styles.coverImg}>
                            <img className={styles.img} src={primaryPhoto} alt={name}/>
                        </div>
                    </div>
                    <div className={styles.productInfo}>
                        <div className={styles.productName}>{name}</div>
                        <div className={styles.productPrice}>Price: €{price}</div>
                        <div className={styles.productDesc}>{description}</div>
                        <div className={styles.productAction}>
                        <ProductQuantity/>
                        <Button/>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </CustomerLayout>
    )
}

export default Detail;