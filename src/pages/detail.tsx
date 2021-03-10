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
        _id : "ProductId",
        name: "Awesome product",
        imageURL: "/image2.jpg",
        category: "Categories",
        description: "This is a default description",
        price: 1234,
      };  
    let qty = 1;

    const router = useRouter();
    return (
        <CustomerLayout header categories>
            <div className={styles.productContainer}>
                <div className={styles.main}>
                    <div className={styles.coverImg}>
                        <img className={styles.img} src={product.imageURL} alt={product.name}/>
                    </div>
                </div>
                <div className={styles.productInfo}>
                    <div className={styles.productName}>{product.name}</div>
                    <div className={styles.productPrice}>Price: €{product.price}</div>
                    <div className={styles.productDesc}>{product.description}</div>
                    <div className={styles.productAction}>
                    <ProductQuantity/>
                    <Button>Add to Cart</Button>
                    </div>
                </div>
            </div>
            {/*<Heading className={styles.heading}> Related Products </Heading>
            <ProductList products={relatedProducts} />*/}
        </CustomerLayout>
    )
}

export default Detail;