import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/OrdersManagement.module.css'
import { Button } from 'reactstrap'
import { Orders } from 'types'
import { OrdersService, sessionService } from 'services';

const OrderManagement: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        loadOrders();
        const user = sessionService.getLocalStorage();
        if(sessionService.isAuth() && user.role=='user'){
            router.push('/');
        } else if (!sessionService.isAuth()){
            router.push('/')
        }
    }, [])

    const [orders, setOrder] = useState<Orders>();

    const loadOrders = async () => {
        console.log("Start loadOrders");

        const { orders } = await OrdersService.fetchOrders();
        setOrder(orders);
        console.log('Done', orders);
    }

    const orderDetailsAdmin = () => {
        router.push('/admin/orderDetailsAdmin');
    }

    return (
        <AdminLayout header>
            <h1>Orders Management</h1>
            <div className={styles.div}>
                <label><strong>Search:</strong></label>
                <input className={styles.input} type="text" placeholder="Search Order by id..." />
            </div>
            {orders ? (
                <div className={styles.div}>
                    <table className={styles.orders}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>CUSTOMER EMAIL</th>
                                <th>STATUS</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map((order) => ( // Sarà da sistemare i nomi dei campi di orders. Ivan prima o poi modificherà il BE così da rispettare quanto definito nelle OpenApi
                                <tr key={order.orderid}>
                                    <td>{order.orderid}</td>
                                    <td>{/*order.emailcustomer*/}</td>
                                    <td>{order.orderStatus}</td>
                                    <td>{order.timestamp}</td>
                                    <td>€{order.cart.total}</td>
                                    <td><Button color="primary" size="lg">Print Shipping Note</Button></td>
                                    <td><Button color="primary" size="lg" onClick={orderDetailsAdmin}>Order Summary</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className={styles.div}>
                    No Orders
                </div>
            )}
        </AdminLayout>
    );

};
export default OrderManagement;