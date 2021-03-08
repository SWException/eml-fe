import { OrderCard } from 'components/listorder';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { ClientLayout } from 'components/layouts/client-layout';


/*interface Props {
    cartItems: string, //ASSOLUTAMENTE DA CONTROLLARE
}*/

const OrdersList = ({listorder}) => { //IN VERITA' E' :React.FC<Props>
    console.log(listorder);
    //Inserire Fetch
 
    const router = useRouter();
    
    let orders = [];
    for(var i = 0; i < 20; i++){
      var order= {
        id : "ID" + i,
        date: "19/01",
        total: 10 + i,
        totart: "2",
        state: "pending",
      };  
      orders[i] = order;
    }

    const orderSummary = () => {
        router.push('/order');
    }

    return (
        <ClientLayout header>
            <div className="items">
                <div className="title-main">
                    <h1>List of orders</h1>
                </div>
                <div className="listorder-item-layout">
                {orders.map((order) => (
                    <>
                        <OrderCard 
                        id={order.id} 
                        date = {order.date}
                        total={order.total}
                        totart={order.totart}
                        state={order.state}
                        /> 
                        <button type="button" onClick={orderSummary}>Order Summary</button>
                    </>
                ))}
                </div>
            </div>

        </ClientLayout>
    );
};
export default OrdersList;