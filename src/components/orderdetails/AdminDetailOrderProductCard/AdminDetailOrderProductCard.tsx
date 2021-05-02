import React from 'react';
import styles from './AdminDetailOrderProductCard.module.css';

//ADMIN DETAIL ORDER


interface Props {   
    id?: string,
    name?: string,
    price?: number,
    quantity?: number,
    primaryPhoto?: string,
}



const AdminDetailOrderProductCard: React.FC<Props> = ({ id, name, price, quantity, primaryPhoto }) => {

    const totart = price * quantity;

    return (
        <div className="">
            <div className={styles.item}>
                <img src={primaryPhoto} height="100" width="100" alt="product image"/>
                <span className={styles.information}><strong>ID: </strong>{id}</span>
                <span className={styles.information}><strong>NAME: </strong>{name.toUpperCase()}</span>
                <span className={styles.information}><strong>PRICE: €</strong>{price}</span>
                <span className={styles.information}><strong>QUANTITY: </strong>{quantity}</span>
                <span className={styles.information}><strong>SUBTOTAL: € {totart} </strong></span>
            </div>
        </div>
    );
};

export default AdminDetailOrderProductCard;
