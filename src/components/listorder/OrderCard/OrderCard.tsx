import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import styles from 'components/listorder/OrderCard/OrderCard.module.css';

interface Props {
    id: string,
    date: string,
    total: number,
    totart: number,
    state: string,    
}

const OrderCard: React.FC<Props> = ({id, date, total, totart, state}) => {
    const router = useRouter();

    const orderSummary = () => {
        router.push('/order');
    }

    return (
        <table className={styles.orders}>
            <tr>
                <td>{id}</td>
                <td>{date}</td>
                <td>€ {total}</td>
                <td>{totart}</td>
                <td>{state}</td>
                <div>   </div>
                <button type="button" onClick={orderSummary}>Order Summary</button>
            </tr>
        </table>
    );
};

export default OrderCard;
