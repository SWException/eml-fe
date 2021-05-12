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
                        <td><img src={primaryPhoto} height="100" width="100" alt="..." /></td>
                        <td> <div><strong>ID:</strong></div><div>{id}</div></td>
                        <td> <div><strong>NAME:</strong></div><div>{name.toUpperCase()}</div></td>
                        <td> <div><strong>PRICE:</strong></div><div>€ {price}</div></td>
                        <td> <div><strong>TAX:</strong></div><div>{tax}%</div></td>
                        <td><div><strong>QUANTITY:</strong></div><div>{quantity}</div></td>
                        <td> <div><strong>SUBTOTAL:</strong></div><div>€ {total}</div></td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default DetailOrderProductCard;
