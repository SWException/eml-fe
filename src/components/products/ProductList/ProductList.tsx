import Link from 'next/link';
import { Products } from 'types';
import React from 'react';
import Image from 'next/image';
import styles from './ProductList.module.css';

interface Props {
  products: Products;
}

const ProductList: React.FC<Props> = ({products}) => {
  const mock = 'XYZ123';
  //cambiare mock con product.id quando le api saranno pronte
  return (
    <>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <Link href={`/detail?id=${mock}`} key={product.id}>
            <a>
              <div>
                <div className={styles.productImgWrapper}>
                  <Image
                    src={product.primaryPhoto}
                    alt="Picture of the author"
                    width={500}
                    height={500}
                  />
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.productName}>{product.name}</div>
                  <div className={styles.productPrice}>Price: €{product.price}</div>
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