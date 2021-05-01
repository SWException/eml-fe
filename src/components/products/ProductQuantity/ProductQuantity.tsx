import React from 'react';
import styles from './ProductQuantity.module.css';

const ProductQuantity: React.FC = () => {

    return (
        <div className={styles.quantity}>
            <button className={styles.plus} type="button" name="button">
                -
      </button>
            <input type="text" name="name" value="1"></input>
            <button className={styles.minus} type="button" name="button">
                +
      </button>
        </div>
    );
};

export default ProductQuantity;