import { Container } from 'components/ui';
import { ProductList } from 'components/products';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useShop } from '../context/shop';
import { Product } from 'types';
import styles from 'styles/Home.module.css'
import { CustomerLayout } from 'components/layouts/CustomerLayout';

const Index: React.FC = () => {
    const router = useRouter();

    const { loadProducts, products } = useShop();

    useEffect(()=>{
      products.length === 0 && loadProducts();
      console.log(products);
    }, [])

    /*let products = [];
    for(var i = 0; i < 8; i++){
      var prodotto: Product = {
        id : "ID " + i,
        name: "Product Name",
        photo: "/image.jpg",
        secondaryPhoto: '',
        category: "Category",
        description: "DESCR",
        tax: 1,
        netprice: 1234,
      };  
      products[i] = prodotto;
    }*/
    
    return (
      <CustomerLayout header categories>
        <div className={styles.title}>
          <h1>BEST PRODUCTS</h1>
        </div>
        <Container className={styles.container}>
          <ProductList products={products}/>
        </Container>
        <div>
          <h1>partita iva, indirizzo, ragione sociale, numero di telefono, email</h1>
        </div>
      </CustomerLayout>
    );
};

export default Index;