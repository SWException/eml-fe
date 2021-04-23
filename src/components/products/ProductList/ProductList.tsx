import Link from 'next/link';
import { Product, Products } from 'types';
import React from 'react';
import Image from 'next/image';
import styles from './ProductList.module.css';

interface Props {
  products: Products;
}

const ProductList: React.FC<Props> = ({products}) => {
  

  
  return (
    <>
      <div className={styles.productGrid}>
        {products.map((product: Product) => (
          <Link href={`/detail?id=${product.id}`} key={product.id}>

            <a>
              <div>
                <div className={styles.productImgWrapper}>
                  <img
                    src={product.primaryPhoto}
                    alt="Picture of the author"
                    width={150}
                    height={150}
                  />
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.productPrice}>€{product.price}</div>
                  <div className={styles.productName}>{product.name}</div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductList;