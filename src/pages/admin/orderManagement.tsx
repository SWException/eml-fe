import React, { useState, useEffect, ChangeEvent } from 'react'
import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/OrdersManagement.module.css'
import { Button } from 'reactstrap'
import { Orders } from 'types'
import { OrdersService, sessionService } from 'services';

const OrderManagement: React.FC = () => {
    const router = useRouter();

    const [currentStatus, setCurrentStatus] = useState<string>('Paid');

    useEffect(() => {
        loadOrders(currentStatus);
        const user = sessionService.getLocalStorage();
        if (sessionService.isAuth() && user.role == 'user') {
            router.push('/');
        }
        else if (!sessionService.isAuth()) {
            router.push('/')
        }
    }, [])

    const [orders, setOrder] = useState<Orders>();

    const loadOrders = async (status: string) => {
        await OrdersService.fetchOrders(status)
            .then((orders: Orders) => {
                console.log("Orders: ", orders);
                setOrder(orders);
            })
            .catch((err: Error) => {
                console.log(err.message);
            });
    }

    const orderDetailsAdmin = () => {
        router.push('/admin/orderDetailsAdmin');
    }

    const handleStatusChange = async (e: ChangeEvent<HTMLSelectElement>): Promise<void> => {
        const value = e.target.value;
        setCurrentStatus(value);
        loadOrders(value);
    }
    

    const renderStatusCombobox = (): any => (
        <div className={styles.div}>
            <label>Status:</label>
            <select className={styles.select} onChange={(e) => handleStatusChange(e)}>
                <option value='Paid'>Paid</option>
                <option value='Pending'>Pending</option>
            </select>
        </div>
    )

    return (
        <AdminLayout header>
            <h1>Orders Management</h1>
            <div className={styles.div}>
                <label><strong>Search:</strong></label>
                <input className={styles.input} type="text" placeholder="Search Order by id..." />
            </div>
            <div className={styles.div}>
                {renderStatusCombobox()}
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
                                    <td>{order.userid}</td>
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