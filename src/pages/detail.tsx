import React, { useRouter } from 'next/router';
import { Button, Container } from 'components/ui';
import styles from 'styles/Detail.module.css';
import { Product } from 'types';
import { ProductQuantity } from 'components/products';

interface Props {
    product: Product;
}

const Detail: React.FC<Props> = ({product}) => {
    product = {
        _id : "ProductId",
        name: "Awesome product",
        imageURL: "https://dress-shop.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdjlbfjouc%2Fimage%2Fupload%2Fv1581158056%2Fdqtdtglewxjvig4x7rlk.jpg&w=640&q=75",
        category: "Categories",
        description: "This is a default description",
        price: 1234,
      };  
    let qty = 1;

    const router = useRouter();
    return (
        <Container>
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
                    <ProductQuantity
                        value={qty}
                    />
                    <Button
                        type="button"
                        variant="primary"
                        title="Add to Cart"
                        className={styles.btnAddCart}
                    />
                    </div>
                </div>
            </div>
            {/*<Heading className={styles.heading}> Related Products </Heading>
            <ProductList products={relatedProducts} />*/}
        </Container>
    )
}

export default Detail;