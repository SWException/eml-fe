import { Container } from 'components/ui';
import { ProductList } from 'components/products';
import React from 'react';
import styles from 'styles/Home.module.css'
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import { GetServerSideProps } from 'next';
import { ProductService } from 'services';
import { Products } from 'types';

interface Props {
    products: Products;
}

const Index: React.FC<Props> = ({products}) => {
    return (
        <CustomerLayout header categories footer>
            <div className={styles.title}>
                <h1>BEST PRODUCTS</h1>
            </div>
            <Container className={styles.container}>
                <ProductList products={products}/>
            </Container>
        </CustomerLayout>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
    const products = await ProductService.fetchProducts();
    try {
        return {
            props: { products },
        };
    }
    catch (error) {
        return {
            props: {
                products: null
            },
        };
    }
};