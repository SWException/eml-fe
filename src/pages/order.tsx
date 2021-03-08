import { DetailOrderProductCard } from 'components/orderdetails'
import { Product } from 'types'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Button } from 'reactstrap';
import { ClientLayout } from 'components/layouts/client-layout';


/*interface Props {
    cartItems: string, //ASSOLUTAMENTE DA CONTROLLARE
}*/

const OrderDetails = ({orderdetails}) => { //IN VERITA' E' :React.FC<Props>
    console.log(orderdetails);
    //Inserire Fetch
 
    const router = useRouter();
    
    let orders = [];
    for(var i = 0; i < 1; i++){
      var order= {
        id : "ID" + i,
        date: "19/01/2021",
        total: 10 + i,
        totart: "2",
        state: "pending",
      };  
      orders[i] = order;
    }
    
    let products = [];
    for(var i = 0; i < 2; i++){
      var prodotto: Product = {
        _id : "ID" + i,
        name: "TEST",
        imageURL: "/image2.jpg",
        category: "CAT",
        description: "DESCR",
        price: 50 + i,
      };  
      products[i] = prodotto;
    }


    return (
        <ClientLayout header>
            <div className="items">
                <div className="title-main">
                    <h1>Order Summary</h1>
                </div>
                <div className="detailsorder-layout">
                  <p><strong>ORDER ID:</strong>  {order.id}</p>
                  <p><strong>Date:</strong>  {order.date}</p>
                  <p><strong>State:</strong>  {order.state}</p>
                </div>
                <div className="item-layout">
                  <h2>Products</h2>
                  {products.map((product) => (
                      <DetailOrderProductCard 
                      idp={product._id}
                      name = {product.name}
                      price={product.price}
                      quantity={10}
                      /> 
                  ))}
                </div>
                <div><strong>Total: {order.total}{" €"} </strong></div>
                <div><strong>Shipping address: Address</strong></div>
                <div><strong>Billing address: Address</strong></div>
                <div> 
                  <Button color="primary">Assistenza</Button>{'    '}
                  <Button color="primary">Richiedi Reso</Button>{'   '}
                  <Button color="primary">Annulla ordine</Button>
                </div>
            </div> 
        </ClientLayout>
    );
};
export default OrderDetails;