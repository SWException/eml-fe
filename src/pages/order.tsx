import { DetailOrderProductCard } from 'components/orderdetails'
import React, { Dispatch, useEffect, useState } from "react";
import { Button, Spinner } from 'reactstrap';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import styles from "styles/Order.module.css";
import { OrdersService } from 'services';
import { Order, OrderProduct } from 'types';
import { GetServerSideProps } from 'next';

interface Props {
    id: string
}

const OrderDetails: React.FC<Props> = ({ id }) => {

    const [order, setOrder]: [Order, Dispatch<Order>] = useState<Order>();

    useEffect(() => {
        reloadOrder();
    }, []);

    const getDate = (timestamp: string): string => {
        const date = new Date(+timestamp);
        // Hours part from the timestamp
        return (date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    }

    const reloadOrder = async () => {
        const order = await OrdersService.fetchOrder(id);
        setOrder(order);
        console.log(order);
    }

    return (
        <CustomerLayout header footer>
            <div>
                <div>
                    <h1>Order Summary</h1>
                </div>
                {order ? (
                    <>
                        <div className={styles.detailsorder}>
                            <div className={styles.div}><strong>Order ID:</strong>  {order.orderid}</div>
                            <div className={styles.div}><strong>Date:</strong>  {getDate(order.timestamp)}</div>
                            <div className={styles.status}><strong>State:</strong>  {order.orderStatus}</div>
                        </div>
                        <div className={styles.itemlayout}>
                            <h2>Products</h2>
                            <table>
                                {order.cart.products?.map((product: OrderProduct) => (
                                    <tr>
                                        <DetailOrderProductCard
                                            primaryPhoto={product.primaryPhoto}
                                            id={product.id}
                                            name={product.name}
                                            price={product.price}
                                            quantity={product.quantity}
                                            total={product.total}
                                            tax={product.tax}
                                        />
                                    </tr>
                                ))}
                            </table>
                        </div>
                        <div className={styles.info}><strong>Total whitout shipping: {" € "}{order.cart.total} </strong></div>
                        <div className={styles.info}><strong>Taxes: {" € "}{order.cart.tax} </strong></div>
                        <div className={styles.info}><strong>Shipping: {" € "}{order.shippingFee} </strong></div>
                        <div className={styles.info}><strong>Total: {" € "}{order.total} </strong></div>
                        <div className={styles.info}><strong>Shipping address:</strong> {order.shippingAddress.recipientName} {order.shippingAddress.recipientSurname} - <a href={"https://maps.google.com/?q=" + order.shippingAddress.address + " " + order.shippingAddress.city + " " + order.shippingAddress.district + " " + order.shippingAddress.code }>{order.shippingAddress.city}, {order.shippingAddress.address}, {order.shippingAddress.code}, {order.shippingAddress.district}</a></div>
                        <div className={styles.info}><strong>Billing address: </strong> {order.billingAddress.recipientName} {order.billingAddress.recipientSurname} - <a href={"https://maps.google.com/?q=" + order.billingAddress.address + " " + order.billingAddress.city + " " + order.billingAddress.district + " " + order.billingAddress.code }>{order.billingAddress.city}, {order.billingAddress.address}, {order.billingAddress.code}, {order.billingAddress.district}</a></div>
                        <div>
                            <div className={styles.button}>
                                <p>Do you need assistance?</p>
                                <a href="mailto:swexception.outlook.com?subject=Assistance%20Required&body=This%20is%20an%20example"><Button color="primary" size="lg" style={{ marginLeft: 20 }}>Assistance</Button></a>
                            </div>
                            <div className={styles.button}>
                                <p>Do you want to ask for a return?</p>
                                <a href="mailto:swexception.outlook.com?subject=Return%20request&body=This%20is%20an%20example"><Button color="primary" size="lg" style={{ marginLeft: 20 }}>Request Return</Button></a>
                            </div>
                            <div className={styles.button}>
                                <p>Do you want cancel your order? </p>
                                <a href="mailto:swexception.outlook.com?subject=Cancel%20Request&body=This%20is%20an%20example"><Button color="primary" size="lg" style={{ marginLeft: 20 }}>Cancel Order</Button></a>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={styles.spinner}>
                        <Spinner/>
                    </div>
                )
                }

            </div>
        </CustomerLayout>
    );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query?.id as string;
    return {
        props: { id },
    };
};

export default OrderDetails;
