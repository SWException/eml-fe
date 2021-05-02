import { Product } from 'types'
import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from "styles/Order.module.css";
import { DetailOrderProductCard } from 'components/orderdetails'
import { sessionService } from 'services';

interface Props {
    orderdetails: any,  //DA MODIFICARE NON APPENA E' PRONTO
}

const OrderDetailsAdmin: React.FC<Props> = ({ orderdetails }) => { //IN VERITA' E' :React.FC<Props>
    console.log(orderdetails);
    //Inserire Fetch

    const router = useRouter();

    useEffect(()=>{
        const user = sessionService.getLocalStorage();
        if(sessionService.isAuth() && user.role=='user'){
            router.push('/');
        } else if (!sessionService.isAuth()){
            router.push('/')
        }
    });

    let orders = [];
    for (var i = 0; i < 1; i++) {
        var order = {
            id: "ID" + i,
            date: "19/01/2021",
            total: 10 + i,
            totart: "2",
            state: "pending",
            billingaddress: "Via Paolotti, 9 Padova",
            shippingaddress: "Via Paolotti, 9 Padova",
            emailcustomer: "test@gmail.com"
        };
        orders[i] = order;
    }

    let products = [];
    for (var i = 0; i < 2; i++) {
        var prodotto: Product = {
            id: "ID" + i,
            name: "TEST",
            primaryPhoto: "/image2.jpg",
            secondaryPhotos: ["/image2.jpg"],
            categoryId: '10',
            category: 'CAT',
            description: "DESC",
            price: 50 + i,
            netPrice: 40 + i,
            show: true,
            showHome: false,
            stock: 20,
            taxId: "10",
            tax: 10,
        };
        products[i] = prodotto;
    }

    return (
        <AdminLayout header>
            <div>
                <div>
                    <h1>Order Summary</h1>
                </div>
                <div className={styles.detailsorder}>
                    <div className={styles.div}><strong>CUSTOMER EMAIL:</strong>{order.emailcustomer}</div>
                    <div className={styles.div}><strong>ORDER ID:</strong>  {order.id}</div>
                    <div className={styles.div}><strong>Date:</strong>  {order.date}</div>
                    <div style={{ padding: 10 }}><strong>State:</strong>  {order.state}</div>
                </div>
                <div className={styles.itemlayout}>
                    <h2>Products</h2>
                    {products?.map((product) => (
                        <DetailOrderProductCard
                            primaryPhoto={product.primaryPhoto}
                            id={product.productId}
                            name={product.name}
                            price={product.price}
                            quantity={product.quantity}
                        />
                    ))}
                </div>
                <div className={styles.info}><strong>Total: {" € "}{order.total} </strong></div>
                <div className={styles.info}><strong>Shipping address:</strong> {order.shippingaddress}</div>
                <div className={styles.info}><strong>Billing address: </strong> {order.billingaddress}</div>
                <div>
                </div>
            </div>
        </AdminLayout>
    );
};
export default OrderDetailsAdmin;