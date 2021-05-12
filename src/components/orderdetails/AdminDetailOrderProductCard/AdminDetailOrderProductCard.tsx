import React from 'react';
import styles from './AdminDetailOrderProductCard.module.css';

//ADMIN DETAIL ORDER


interface Props {   
    id?: string,
    name?: string,
    price?: number,
    total?: number,
    tax?: number,
    quantity?: number,
    primaryPhoto?: string,
}


const AdminDetailOrderProductCard: React.FC<Props> = ({ id, name, price, tax, quantity, primaryPhoto, total }) => {
    return (
        <div className="">
            <div className={styles.container}>
                <div className={styles.item}><img src={primaryPhoto} height="100" width="100" alt="..." /></div>
                <div className={styles.item}><strong>ID:</strong><div>{id}</div></div>
                <div className={styles.item}><strong>NAME:</strong><div>{name.toUpperCase()}</div></div>
                <div className={styles.item}><strong>PRICE:</strong><div>€ {price}</div></div>
                <div className={styles.item}><strong>TAX:</strong><div>{tax}%</div></div>
                <div className={styles.item}><strong>QUANTITY:</strong><div>{quantity}</div></div>
                <div className={styles.item}><strong>SUBTOTAL:</strong><div>€ {total}</div></div>
            </div>
        </div>
    );
};

export default AdminDetailOrderProductCard;
