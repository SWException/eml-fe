import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './OrderCard.module.css';
import { Button } from 'reactstrap'
import { Order } from 'types';

interface Props {
    order: Order
}

const OrderCard: React.FC<Props> = ({ order }) => {
    const router = useRouter();
    const { orderid, timestamp, orderStatus, total } = order;
    const orderSummary = () => {
        router.push('/order?id=' + orderid);
    }

    const [dateShow, setDateShow] = useState('')

    useEffect(() => {
        setDateShow(getDate(timestamp));
    }, [])

    const getDate = (timestamp: string): string => {
        const date = new Date(+timestamp);
        return (date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()).toString()
    }

    return (
        <>
            <td>{orderid}</td>
            <td>{dateShow}</td>
            <td>€ {total}</td>
            <td>{orderStatus}</td>
            <td><Button color="primary" onClick={orderSummary}>Order Summary</Button></td>
        </>
    );
};

export default OrderCard;
