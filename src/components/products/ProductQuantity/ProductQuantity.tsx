import React from 'react';
import styles from './ProductQuantity.module.css';


const ProductQuantity: React.FC = () => {

  return (
    <>
      <button type="button">-</button>
      <input type="text" text-align="center" value="1"/>
      <button type="button">+</button>
    </>
  );
};

export default ProductQuantity;