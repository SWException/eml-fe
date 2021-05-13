import React, { useEffect, useState, Dispatch } from "react";
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from "styles/OrderAdmin.module.css";
import { AdminDetailOrderProductCard } from 'components/orderdetails'
import { OrdersService } from 'services';
import { Order, OrderProduct } from 'types'
import { GetServerSideProps } from 'next';
import { Button, Spinner } from "reactstrap";

interface Props {
    id: string,
}

const OrderDetailsAdmin: React.FC<Props> = ({ id }) => {
    const [order, setOrder]: [Order, Dispatch<Order>] = useState<Order>();

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
    }

    const changeStatus = async (newStatus: string): Promise<void> => {
        await OrdersService.updateOrder(order.orderid, newStatus);
        await reloadOrder();
    }

    const refundOrder = async () => {
        await OrdersService.refundOrder(order.orderid);
        await reloadOrder();
    }

    const renderChangeStatus = (): JSX.Element => {
        switch (order.orderStatus) {
        case "Paid":
            return (<><Button color="primary" size="lg" onClick={() => { changeStatus("Shipped"); }}>Ship</Button> <Button color="primary" size="lg" onClick={() => { refundOrder(); }}>Refund</Button></>);
        case "Shipped":
            return (<><Button color="primary" size="lg" onClick={() => { changeStatus("Delivered"); }}>Deliver</Button> <Button color="primary" size="lg" onClick={() => { refundOrder(); }}>Refund</Button></>);
        case "Delivered":
            return (<Button color="primary" size="lg" onClick={() => { refundOrder(); }}>Refund</Button>);
        case "Refund": 
        default:
            return (<div></div>);
        }
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
                        <div className={styles.status}><strong>State:</strong>  {order.orderStatus}</div>
                    </div>
                    <div className={styles.info}>
                        Change order status: {renderChangeStatus()}
                    </div>
                    <div className={styles.info}><strong>Customer: <a href={"mailto:" + order.customer?.email}>{order.customer?.email}</a> - {order.customer?.name} {order.customer?.surname}</strong></div>
                    <div className={styles.itemlayout}>
                        <h2>Products</h2>
                        <div>
                            {order.cart.products?.map((product: OrderProduct) => (
                                    <AdminDetailOrderProductCard
                                        primaryPhoto={product.primaryPhoto}
                                        id={product.id}
                                        name={product.name}
                                        price={product.price}
                                        tax={product.tax}
                                        quantity={product.quantity}
                                        total={product.total}
                                    />
                            ))}
                        </div>
                    </div>
                    <div className={styles.info}><strong>Total whitout shipping: {" € "}{order.cart.total} </strong></div>
                    <div className={styles.info}><strong>Taxes: {" € "}{order.cart.tax} </strong></div>
                    <div className={styles.info}><strong>Shipping: {" € "}{order.shippingFee} </strong></div>
                    <div className={styles.info}><strong>Total: {" € "}{order.total} </strong></div>
                    <div className={styles.info}><strong>Shipping address:</strong> {order.shippingAddress.recipientName} {order.shippingAddress.recipientSurname} - <a href={"https://maps.google.com/?q=" + order.shippingAddress.address + " " + order.shippingAddress.city + " " + order.shippingAddress.district + " " + order.shippingAddress.code }>{order.shippingAddress.city}, {order.shippingAddress.address}, {order.shippingAddress.code}, {order.shippingAddress.district}</a></div>
                    <div className={styles.info}><strong>Billing address: </strong> {order.billingAddress.recipientName} {order.billingAddress.recipientSurname} - <a href={"https://maps.google.com/?q=" + order.billingAddress.address + " " + order.billingAddress.city + " " + order.billingAddress.district + " " + order.billingAddress.code }>{order.billingAddress.city}, {order.billingAddress.address}, {order.billingAddress.code}, {order.billingAddress.district}</a></div>
                </>
                ) : (
                    <div className={styles.spinner}>
                        <Spinner/>
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