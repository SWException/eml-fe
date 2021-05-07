import React from 'react';
import styles from './ProductQuantity.module.css';

const ProductQuantity: React.FC = () => {

    return (
        <div className={styles.quantity}>
            <button className={styles.plus} type="button" name="button">
                <img src="meno.png" style={{width:25, height: 25}}/>    
            </button>
            <input type="text" name="name" value="1"></input>
            <button className={styles.minus} type="button" name="button">
                <img src="plus.png" style={{width:25, height: 25}}/>
            </button>
        </div>
    );
};

export default ProductQuantity;