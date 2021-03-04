import { Container } from 'components/ui';
import { ProductList } from 'components/products';
import { useRouter } from 'next/router';
import React from 'react';
import { Product } from 'types';
import styles from 'styles/Home.module.css'

const Index: React.FC = () => {
    const router = useRouter()

    let products = [];
    for(var i = 0; i < 8; i++){
      var prodotto: Product = {
        _id : "ID" + i,
        name: "TEST",
        imageURL: "https://dress-shop.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdjlbfjouc%2Fimage%2Fupload%2Fv1581158056%2Fdqtdtglewxjvig4x7rlk.jpg&w=640&q=75",
        category: "CAT",
        description: "DESCR",
        price: 1234,
      };  
      products[i] = prodotto;
    }
    
    return (
      <>
        <div className="title-main">
          <h1>PRODOTTI IN RISALTO PER HOMEPAGE</h1>
        </div>
        <Container className={styles.container}>
          <ProductList products={products}/>
        </Container>
      </>
    );
};

export default Index;