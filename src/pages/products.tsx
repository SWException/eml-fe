import { useRouter } from 'next/router';
import {Filters, Sort } from 'components/ui';
import { ProductList } from 'components/products';
import React, { useEffect } from 'react';
import styles from 'styles/PLP.module.css';
import { useShop } from '../context/shop';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import { GetServerSideProps } from 'next';

interface Props {
  id: string;
}

const Products: React.FC<Props> = ({id}) => {
    const router = useRouter();

    const { loadProducts, products } = useShop();

    useEffect(()=>{
      products.length === 0 && loadProducts(id);
    }, []);

    return (
        <CustomerLayout header categories footer>
          <div>
            <div className={styles.filter}>  Price:<Filters/> </div>
            <div className={styles.filter}>  Price Ordinament:<Sort/></div>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.query?.category as string;

  try {
      console.log(id);
      return {
          props: { id },
      };
  } catch (error) {
      return {
          props: {
              id: null
          },
      };
  }
};

export default Products;