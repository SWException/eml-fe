import { OrderCard } from 'components/listorder';
import React, { useEffect, useState } from "react";
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import styles from 'styles/Orders.module.css'


/*interface Props {
    cartItems: string, //ASSOLUTAMENTE DA CONTROLLARE
}*/

const OrdersList = ({listorder}) => { //IN VERITA' E' :React.FC<Props>
    console.log(listorder);
    //Inserire Fetch
    
    let orders = [];
    for(var i = 0; i < 20; i++){
      var order= {
        id : "ID" + i,
        date: "19/01/2021",
        total: 10 + i,
        totart: "2",
        state: "pending",
      };  
      orders[i] = order;
    }

    return (
        <CustomerLayout header footer>
            <div className={styles.div}>
                <div>
                    <h1>List of orders</h1>
                </div>
                <p/>
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
                        date = {order.date}
                        total={order.total}
                        totart={order.totart}
                        state={order.state}
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