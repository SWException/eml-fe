import { useRouter } from 'next/router';
import { Container, Filters, Sort } from 'components/ui';
import { ProductList } from 'components/products';
import React from 'react';
import styles from 'styles/PLP.module.css';
import { Product } from 'types';
import { CustomerLayout } from 'components/layouts/CustomerLayout';

const Products: React.FC = () => {
    const router = useRouter()

    let products = [];
    for(var i = 0; i < 20; i++){
      var prodotto: Product = {
        id : "ID" + i,
        name: "TEST",
        primaryPhoto: "/image2.jpg",
        categories: ['CAT'],
        description: "DESCR",
        price: 50 + i,
        show: true,
        showHome: false,
        stock: 20,
        tax: 10,
      }; 
      products[i] = prodotto;
    }

    return (
        <CustomerLayout header categories footer>
          <div>
            <div className={styles.div}>  Price:<Filters/> </div>
            <div className={styles.div}>  Price Ordinament:<Sort/></div>
            <div>
            {products.length > 0 ? (
            <ProductList products={products} />
            ) : (
            <div className={styles.message}>
                No products found. Try searching for other keyword.
            </div>
            )}
            </div>
          </div>
        </CustomerLayout>
    );
};


export default Products;