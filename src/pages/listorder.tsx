import { OrderCard } from 'components/listorder';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';


/*interface Props {
    cartItems: string, //ASSOLUTAMENTE DA CONTROLLARE
}*/

const Listorder = ({listorder}) => { //IN VERITA' E' :React.FC<Props>
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
        state: "boh",
      };  
      orders[i] = order;
    }


    return (
        <>
            <div className="items">
                <div className="title-main">
                    <h1>List of orders</h1>
                </div>
                <div className="listorder-item-layout">
                {orders.map((order) => (
                    <OrderCard 
                    id={order.id} 
                    date = {order.date}
                    total={order.total}
                    totart={order.totart}
                    state={order.state}
                    /> 
                ))}
                </div>
            </div>

        </>
    );
};
export default Listorder;