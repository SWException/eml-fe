import { OrderCard } from 'components/listorder';
import React, { useEffect, useState } from "react";
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import styles from 'styles/Orders.module.css';
import { OrdersService } from 'services';
import { Order, Orders } from 'types';

/*interface Props {
    cartItems: string, //ASSOLUTAMENTE DA CONTROLLARE
}*/

interface Props {
    ord: Orders;
}

const OrdersList: React.FC<Props> = ({ ord }) => { //IN VERITA' E' :React.FC<Props>
    console.log(ord);
    //Inserire Fetch


    useEffect(() => {
        reloadOrders();
    }, [])

    const [orders, setOrder] = useState([]);

    const reloadOrders = async () => {
        console.log("Start reloadOrders");

        const { orders } = await OrdersService.fetchOrders();
        setOrder(orders);/*
        setOrderShow({
            id:orders.orderid,
            orderStatus: string;
            cart: Cart;
            billingaddress: Address;
            shippingAddress: Address;
        });*/
        console.log('Done', orders);

    }


    return (
        <CustomerLayout header footer>
            <div className={styles.div}>
                <div>
                    <h1>List of orders</h1>
                </div>
                <p />
                <div className="orders-item-layout">
                    <table className={styles.orders}>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>ARTICLES</th>
                            <th>STATE</th>
                        </tr>
                    </table>
                    <table className={styles.orders}>
                        {orders.map((order) => (
                            <>
                                <tr>
                                    <OrderCard
                                        id={order.orderid}
                                        date={order.timestamp}
                                        total={order.cart.total}
                                        totart={order.cart.itemCount}
                                        state={order.orderStatus}
                                    />
                                </tr>
                            </>
                        ))}
                    </table>
                </div>
            </div>

        </CustomerLayout>
    );
};
export default OrdersList;

/*
<div className="orders-item-layout">
                    <table className={styles.orders}>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>ARTICLES</th>
                            <th>STATE</th>
                        </tr>
                    </table>
                    <table className={styles.orders}>
                        {orders.map((order) => (
                            <>
                                <tr>
                                    <OrderCard
                                        id={order.id}
                                        date={order.date}
                                        total={order.total}
                                        totart={order.totart}
                                        state={order.state}
                                    />
                                </tr>
                            </>
                        ))}
                    </table>
                </div>

                */