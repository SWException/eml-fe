import { OrderCard } from 'components/listorder';
import React, { useEffect, useState, Dispatch } from "react";
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import styles from 'styles/Orders.module.css';
import { OrdersService } from 'services';
import { Order, Orders } from 'types';


const OrdersList: React.FC = () => {
    useEffect(() => {
        reloadOrders();
    }, [])

    const [orders, setOrder]: [Orders, Dispatch<Orders>] = useState<Orders>();

    const reloadOrders = async () => {
        const orders = await OrdersService.fetchOrders();
        setOrder(orders);
        console.log('Orders', orders);
    }

    return (
        <CustomerLayout header footer>
            <div>
                <h1>List of orders</h1>
            </div>
            <div className={styles.div}>
                {orders ? (
                    <table className={styles.orders}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>STATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order: Order) => (
                                <tr>
                                    <OrderCard
                                        order={order}
                                    />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className={styles.div}>
                            No orders
                    </div>
                )}
            </div>
        </CustomerLayout>
    );
};
export default OrdersList;
