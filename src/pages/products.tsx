import { useRouter } from 'next/router';
import { Container, Filters, Sort } from 'components/ui';
import { ProductList } from 'components/products';
import React from 'react';
import styles from 'styles/PLP.module.css';
import { Product } from 'types';
import { ClientLayout } from 'components/layouts/client-layout';

const Products: React.FC = () => {
    const router = useRouter()

    let products = [];
    for(var i = 0; i < 20; i++){
      var prodotto: Product = {
        _id : "ID" + i,
        name: "TEST",
        imageURL: "/image2.jpg",
        category: "CAT",
        description: "DESCR",
        price: 50 + i,
      };  
      products[i] = prodotto;
    }

    return (
        <ClientLayout header categories>
            <Filters/>
            <Sort/>
            {products.length > 0 ? (
            <ProductList products={products} />
            ) : (
            <div className={styles.message}>
                No products found. Try searching for other keyword.
            </div>
            )}
        </ClientLayout>
    );
};

export default Products;