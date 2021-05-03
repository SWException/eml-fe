import React, { useEffect, useState, Dispatch } from "react";
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from "styles/Order.module.css";
import { AdminDetailOrderProductCard } from 'components/orderdetails'
import { OrdersService } from 'services';
import { Order, OrderProducts } from 'types'
import { GetServerSideProps } from 'next';

interface Props {
    id: string,
}

const OrderDetailsAdmin: React.FC<Props> = ({ id }) => {
     console.log(id);

    const [dateShow, setDateShow] = useState('')

    const getDate = (timestamp): string => {
        const date = new Date(+timestamp);
        // Hours part from the timestamp
        return (date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    }

    const [order, setOrder]: [Order, Dispatch<Order>] = useState({
        orderid: "",
        userid: "",
        timestamp: "",
        orderStatus: "",
        cart: {
            total: 0
        },
        shippingAddress: {
            description: ""
        },
        billingAddress: {
            description: ""
        }
    } as Order);

    const [products, setProducts]: [OrderProducts, React.Dispatch<OrderProducts>] = useState([]);

    useEffect(() => {
        reloadOrder();
        setDateShow(getDate("0"));
    }, []);

    const reloadOrder = async () => {
        console.log('Start reloadOrder');
        const order = await OrdersService.fetchOrder(id);
        setOrder(order);
        console.log(order);
        console.log('Done reloadOrder');

        console.log('Start reloadProducts');
        console.log(order.cart);
        console.log(order.cart.products);
        setProducts(order.cart.products);
        setDateShow(getDate(order.timestamp));
        console.log('Done reloadProducts');
    }

    return (
        <AdminLayout header>
            <div>
                <div>
                    <h1>Order Summary</h1>
                </div>
                <div className={styles.detailsorder}>
                    <div className={styles.div}><strong>User ID:</strong> {order.userid}</div>
                    <div className={styles.div}><strong>Order ID:</strong>  {order.orderid}</div>
                    <div className={styles.div}><strong>Date:</strong>  {dateShow}</div>
                    <div style={{ padding: 10 }}><strong>State:</strong>  {order.orderStatus}</div>
                </div>
                <div className={styles.itemlayout}>
                    <h2>Products</h2>
                    <table>
                        {products?.map((product) => (
                            <tr>
                                <AdminDetailOrderProductCard
                                    primaryPhoto={product.primaryPhoto}
                                    id={product.productId}
                                    name={product.name}
                                    price={product.price}
                                    quantity={product.quantity}
                                />
                            </tr>
                        ))}
                    </table>
                </div>
                <div className={styles.info}><strong>Total: {" € "}{order.cart.total} </strong></div>
                <div className={styles.info}><strong>Shipping address:</strong> {`${order.shippingAddress.description} - ${order.shippingAddress.city}, ${order.shippingAddress.address}, ${order.shippingAddress.code}, ${order.shippingAddress.district}`}</div>
                <div className={styles.info}><strong>Billing address: </strong> {`${order.billingAddress.description} - ${order.billingAddress.city}, ${order.billingAddress.address}, ${order.billingAddress.code}, ${order.billingAddress.district}`}</div>
            </div>
        </AdminLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query?.id as string;
    try {
        console.log(id);
        return {
            props: { id },
        };
    }
    catch (error) {
        return {
            props: {
                id: null
            },
        };
    }
};

export default OrderDetailsAdmin;