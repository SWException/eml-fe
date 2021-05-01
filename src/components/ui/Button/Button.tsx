import React from 'react';
import styles from './Button.module.css';

const Button: React.FC = () => {
    return (
        <>
            <button type="button" className={styles.button}>Add to Cart</button>
        </>
    );
};

export default Button;