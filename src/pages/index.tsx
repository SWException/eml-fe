import { Container } from 'components/ui';
import { ProductList } from 'components/products';
import { useRouter } from 'next/router';
import React from 'react';
import { Product } from 'types';
import styles from 'styles/Home.module.css'
import { CustomerLayout } from 'components/layouts/CustomerLayout';

const Index: React.FC = () => {
    const router = useRouter();

    let products = [];
    for(var i = 0; i < 8; i++){
      var prodotto: Product = {
        _id : "ID " + i,
        name: "Product Name",
        imageURL: "/image.jpg",
        category: "Category",
        description: "DESCR",
        price: 1234,
      };  
      products[i] = prodotto;
    }
    
    return (
      <CustomerLayout header categories>
        <div className="title-main">
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