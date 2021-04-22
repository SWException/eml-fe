import React, {useEffect, useState} from 'react';
import styles from './DetailOrderProductCard.module.css';

//ADMIN DETAIL ORDER


interface Props {   //DA RIVEDERE ASSOLUTAMENTE
    id?: number,
    name?: string,
    price?: number,
    quantity?: number,
}


const DetailOrderProductCard: React.FC<Props> = ({id, name, price, quantity}) => {
    
    const totart=price*quantity;

    return (
        <div className="">
            <div className={styles.item}>
                <span className={styles.information}><strong>ID: </strong>{id}</span>
                <span className={styles.information}><strong>NAME: </strong>{name.toUpperCase()}</span>
                <span className={styles.information}><strong>PRICE: €</strong>{price}</span>
                <span className={styles.information}><strong>QUANTITY: </strong>{quantity}</span>
                <span className={styles.information}><strong>SUBTOTAL: € {totart} </strong></span>
            </div>    
        </div>
    );
};

export default DetailOrderProductCard;
