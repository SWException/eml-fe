import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/ProductManagement.module.css'
import { Button } from 'reactstrap'
import { Orders } from 'types'
import { OrdersService } from 'services';

const OrderManagement: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        loadOrders();
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
            <div className={styles.div}>
                <input className={styles.input} type="text" placeholder="Search Order by id..." />
                <Button type="submit" formAction="/products" style={{ border: "2px solid #ccc", backgroundColor: "#ccc", borderRadius: "0" }}>
                    <img src="/iconsearch.png" style={{ width: "2.3rem", height: "2.3rem" }} />
                </Button>
            </div>
            {orders ? (
                <table className={styles.products}>
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
            ) : (
                <div>
                    No Orders
                </div>
            )}
        </AdminLayout>
    );

};
export default OrderManagement;