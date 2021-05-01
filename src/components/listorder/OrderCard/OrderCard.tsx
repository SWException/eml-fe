import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './OrderCard.module.css';
import { Button } from 'reactstrap'

interface Props {
    id: string,
    date: string,
    total: number,
    totart: number,
    state: string,
}

const OrderCard: React.FC<Props> = ({ id, date, total, totart, state }) => {
    const router = useRouter();

    const orderSummary = () => {
        router.push('/order?id=' + id);
    }

    const [dateShow, setDateShow] = useState('')

    useEffect(() => {
        setDateShow(getDate(date))
    }, [])

    const getDate = (timestamp): string => {
        var date = new Date(+timestamp);

        return (date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()).toString()
    }

    return (
        <table className={styles.orders}>
            <tr>
                <td>{id}</td>
                <td>{dateShow}</td>
                <td>€ {total}</td>
                <td>{totart}</td>
                <td>{state}</td>
                <td><Button color="primary" size="lg" onClick={orderSummary}>Order Summary</Button></td>
            </tr>
        </table>
    );
};

export default OrderCard;
