import React from 'react';
import styles from './DetailOrderProductCard.module.css';

//CLIENT DETAIL ORDER

interface Props {   //DA RIVEDERE ASSOLUTAMENTE
    id?: string,
    name?: string,
    price?: number,
    total?: number,
    tax?: number,
    quantity?: number,
    primaryPhoto?: string,
}


const DetailOrderProductCard: React.FC<Props> = ({ id, name, price, quantity, primaryPhoto, total, tax }) => {
    return (
        <div className="">
            <div className={styles.item}>
                <table className={styles.order}>
                    <tr>
                    <div className={styles.container}>
                        <div className={styles.item}><img src={primaryPhoto} height="100" width="100" alt="..." /></div>
                        <div className={styles.item}><strong>ID:</strong><div>{id}</div></div>
                        <div className={styles.item}><strong>NAME:</strong><div>{name.toUpperCase()}</div></div>
                        <div className={styles.item}><strong>PRICE:</strong><div>€ {price}</div></div>
                        <div className={styles.item}><strong>TAX:</strong><div>{tax}%</div></div>
                        <div className={styles.item}><strong>QUANTITY:</strong><div>{quantity}</div></div>
                        <div className={styles.item}><strong>SUBTOTAL:</strong><div>€ {total}</div></div>
                    </div>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default DetailOrderProductCard;
