import { AdminDetailOrderProductCard } from 'components/orderdetails'
import { Product } from 'types'
import React from "react";
import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';


interface Props{
  orderdetails: any,  //DA MODIFICARE NON APPENA E' PRONTO
}

const OrderDetailsAdmin: React.FC<Props> = ({orderdetails}) => { //IN VERITA' E' :React.FC<Props>
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
        id : "ID" + i,
        name: "TEST",
        primaryPhoto: "/image2.jpg",
        categories: ['CAT'],
        description: "DESCR",
        price: 50 + i,
        show: true,
        showHome: false,
        stock: 20,
        tax: 10,
      };  
      products[i] = prodotto;
    }


    return (
        <AdminLayout header>
            <div className="">
                <div className="">
                    <h1>Order Summary</h1>
                </div>
                <div className="">
                  <p><strong>ORDER ID:</strong>  {order.id}</p>
                  <p><strong>Date:</strong>  {order.date}</p>
                  <p><strong>State:</strong>  {order.state}</p>
                </div>
                <div className="">
                  <h2>Products</h2>
                  {products.map((product) => (
                      <AdminDetailOrderProductCard 
                      id={product._id}
                      name = {product.name}
                      price={product.price}
                      quantity={10}
                      /> 
                  ))}
                </div>
                <div><strong>Total: {order.total}{" €"} </strong></div>
                <div><strong>Shipping address: Address</strong></div>
                <div><strong>Billing address: Address</strong></div>
            </div>

      </AdminLayout>
    );
};
export default OrderDetailsAdmin;