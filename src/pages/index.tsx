import { Container } from 'components/ui';
import { ProductList } from 'components/products';
import React from 'react';
import styles from 'styles/Home.module.css'
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import { GetStaticProps } from 'next';
import { ProductService } from 'services';
import { Products } from 'types';

interface Props {
    products: Products;
}

const Index: React.FC<Props> = ({products}) => {
    return (
        <CustomerLayout header categories footer>
            
            <Container className={styles.container}>
                <div className={styles.imagehome}>
                    <img src="home.jpg" width= "100%" className={styles.image}/>
                </div>
                <div className={styles.title}>
                    <h1 style={{textDecoration:"underline"}}>BEST PRODUCTS</h1>
                </div>
                <ProductList products={products}/>
            </Container>
        </CustomerLayout>
    );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
    const products = await ProductService.fetchProducts().catch(() => null);
    return {
        props: { products },
        revalidate: 30,
    };
    
};