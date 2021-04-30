import { Container } from 'components/ui';
import { ProductList } from 'components/products';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useShop } from '../context/shop';
import styles from 'styles/Home.module.css'
import { CustomerLayout } from 'components/layouts/CustomerLayout';

const Index: React.FC = () => {
    const router = useRouter();
  
    const { loadProducts, products } = useShop();

    useEffect(()=>{
      products.length === 0 && loadProducts();
    }, [])
    
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