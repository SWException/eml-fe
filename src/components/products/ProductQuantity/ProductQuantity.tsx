import React from 'react';
import styles from './ProductPhoto.module.css';


const ProductQuantity: React.FC = () => {

  return (
    <>
      <button type="button">-</button>
      <input type="text" value="1"/>
      <button type="button">+</button>
    </>
  );
};

export default ProductQuantity;