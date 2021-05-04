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
                <table className={styles.order}>
                    <tr>
                        <td><img src={primaryPhoto} height="100" width="100" alt="..." /></td>
                        <td> <div><strong>ID:</strong></div><div>{id}</div></td>
                        <td> <div><strong>NAME:</strong></div><div>{name.toUpperCase()}</div></td>
                        <td> <div><strong>PRICE:</strong></div><div> € {price}</div></td>
                        <td><div><strong>QUANTITY:</strong></div><div>{quantity}</div></td>
                        <td> <div><strong>SUBTOTAL:</strong></div><div>€ {totart}</div></td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default AdminDetailOrderProductCard;
