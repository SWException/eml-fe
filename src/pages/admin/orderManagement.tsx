import React, { useState, useEffect, ChangeEvent, Dispatch } from 'react'
import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/OrdersManagement.module.css'
import { Button } from 'reactstrap'
import { Order, Orders } from 'types'
import { OrdersService } from 'services';

const OrderManagement: React.FC = () => {
    const router = useRouter();

    const [currentStatus, setCurrentStatus]: [string, Dispatch<string>] = useState<string>('Paid');
    const [orders, setOrders]: [Orders, Dispatch<Orders>] = useState<Orders>();

    useEffect(() => {
        loadOrders(currentStatus);
    }, [])

    const getDate = (timestamp: string): string => {
        const date = new Date(+timestamp);
        // Hours part from the timestamp
        return (date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    }

    const loadOrders = async (status: string): Promise<void> => {
        await OrdersService.fetchOrders(status)
            .then((orders: Orders) => {
                console.log("Orders: ", orders);
                setOrders(orders);
            })
            .catch((err: Error) => {
                console.log(err.message);
            });
    }


    const handleStatusChange = async (e: ChangeEvent<HTMLSelectElement>): Promise<void> => {
        const value = e.target.value;
        setCurrentStatus(value);
        loadOrders(value);
    }


    const renderStatusCombobox = (): JSX.Element => (
        <div className={styles.div}>
            <label>Status:</label>
            <select className={styles.select} onChange={(e) => handleStatusChange(e)}>
                <option value='Paid'>Paid</option>
                <option value='Pending'>Pending</option>
            </select>
        </div>
    )

    const getOrdersbyId = async (id: string): Promise<void> => {
        try {
            const orders = await OrdersService.fetchOrders(currentStatus, id);
            setOrders(orders);
            console.log(orders);
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        if (value == '') {
            loadOrders(currentStatus);
        }
        else {
            getOrdersbyId(value);
        }
    }


    return (
        <AdminLayout header>
            <h1>Orders Management</h1>
            <div className={styles.div}>
                <label><strong>Search:</strong></label>
                <input className={styles.input} onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e) }} type="text" placeholder="Search Order by id..." />
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
                            {orders.map((order: Order) => ( // Sarà da sistemare i nomi dei campi di orders. Ivan prima o poi modificherà il BE così da rispettare quanto definito nelle OpenApi
                                <tr key={order.orderid}>
                                    <td>{order.orderid}</td>
                                    <td>{order.customer.email}</td>
                                    <td>{order.orderStatus}</td>
                                    <td>{getDate(order.timestamp)}</td>
                                    <td>€ {order.cart.total}</td>
                                    <td><Button color="primary" size="lg" onClick={() => { router.push(`/admin/orderDetailsAdmin?id=${order.orderid}`) }}>Order Summary</Button></td>
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