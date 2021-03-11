import React, { useRouter } from 'next/router';
import { Button, Container } from 'components/ui';
import styles from 'styles/Detail.module.css';
import { Product } from 'types';
import { ProductQuantity } from 'components/products';
import { CustomerLayout } from 'components/layouts/CustomerLayout';

interface Props {
    product: Product;
}

const Detail: React.FC<Props> = ({product}) => {
    
    product = {
        id : "ID",
        name: "TEST",
        primaryPhoto: "/image2.jpg",
        categories: ['CAT'],
        description: "DESCR",
        price: 50,
        show: true,
        showHome: false,
        stock: 20,
        tax: 10,
    };

    const router = useRouter();
    return (
        <CustomerLayout header categories>
            <div className={styles.productContainer}>
                <div className={styles.main}>
                    <div className={styles.coverImg}>
                        <img className={styles.img} src={product.primaryPhoto} alt={product.name}/>
                    </div>
                </div>
                <div className={styles.productInfo}>
                    <div className={styles.productName}>{product.name}</div>
                    <div className={styles.productPrice}>Price: €{product.price}</div>
                    <div className={styles.productDesc}>{product.description}</div>
                    <div className={styles.productAction}>
                    <ProductQuantity/>
                    <Button/>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    )
}

export default Detail;