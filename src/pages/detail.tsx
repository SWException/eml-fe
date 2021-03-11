import React, { useRouter } from 'next/router';
import { Button } from 'components/ui';
import styles from 'styles/Detail.module.css';
import { ProductService } from 'services/productService';
import { ProductQuantity } from 'components/products';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import { Product } from '../types/product'
import { GetServerSideProps } from 'next';

interface Props {
    product: Product;
}

const Detail: React.FC<Props> = ({product}) => {

    const router = useRouter();

    const { name, description, primaryPhoto, price } = product;
    
    return (
        <CustomerLayout header categories>
            <div className={styles.productContainer}>
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
            </div>
        </CustomerLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.id as string;

    try {
        const { product } = await ProductService.fetchProduct(id);
        return {
            props: { product },
        };
    } catch (error) {
        return {
            props: {
                product: null,
                relatedProducts: [],
                error: 'Error in getting product',
            },
        };
    }
};

export default Detail;

