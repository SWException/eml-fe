import React, { useEffect, useState, Dispatch } from "react";
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from "styles/Order.module.css";
import { AdminDetailOrderProductCard } from 'components/orderdetails'
import { CustomerService, OrdersService } from 'services';
import { Customer, Order, OrderProduct } from 'types'
import { GetServerSideProps } from 'next';

interface Props {
    id: string,
}

const OrderDetailsAdmin: React.FC<Props> = ({ id }) => {
    const [order, setOrder]: [Order, Dispatch<Order>] = useState<Order>();
    const [customer, setCustomer]: [Customer, Dispatch<Customer>] = useState<Customer>();

    useEffect(() => {
        reloadOrder()
    }, []);


    const getDate = (timestamp: string): string => {
        const date = new Date(+timestamp);
        // Hours part from the timestamp
        return (date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    }

    const reloadOrder = async (): Promise<void> => {
        const order = await OrdersService.fetchOrder(id);
        setOrder(order);
        console.log(order);
        const customer = await CustomerService.fetchCustomer(order.userid);
        setCustomer(customer);
        console.log(customer);
    }

    return (
        <AdminLayout header>
            <div>
                <div>
                    <h1>Order Summary</h1>
                </div>
                {order ? (<>
                    <div className={styles.detailsorder}>
                        <div className={styles.div}><strong>User ID:</strong> {order.userid}</div>
                        <div className={styles.div}><strong>Order ID:</strong>  {order.orderid}</div>
                        <div className={styles.div}><strong>Date:</strong>  {getDate(order.timestamp)}</div>
                        <div style={{ padding: 10 }}><strong>State:</strong>  {order.orderStatus}</div>
                    </div>
                    <div className={styles.info}><strong>Customer: <a href={"mailto:" + customer?.email}>{customer?.email}</a> - {customer?.name} {customer?.surname} </strong></div>
                    <div className={styles.itemlayout}>
                        <h2>Products</h2>
                        <table>
                            {order.cart.products?.map((product: OrderProduct) => (
                                <tr>
                                    <AdminDetailOrderProductCard
                                        primaryPhoto={product.primaryPhoto}
                                        id={product.id}
                                        name={product.name}
                                        price={product.price}
                                        tax={product.tax}
                                        quantity={product.quantity}
                                        total={product.total}
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
                </>
                ) : (
                    <div>
                        LOADING SPINNER FIGHISSIMO!
                    </div>
                )
                }
            </div>
        </AdminLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query?.id as string;
    
    return {
        props: { id },
    };
    
};

export default OrderDetailsAdmin;