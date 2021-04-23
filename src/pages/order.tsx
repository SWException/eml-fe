import { DetailOrderProductCard } from 'components/orderdetails'
import { Product } from 'types'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Button } from 'reactstrap';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import styles from "styles/Order.module.css";
import { OrdersService } from 'services';

/*interface Props {
    cartItems: string, //ASSOLUTAMENTE DA CONTROLLARE
}*/

const OrderDetails = ({orderdetails}) => { //IN VERITA' E' :React.FC<Props>
    console.log(orderdetails);
    //Inserire Fetch
 
    const router = useRouter();
    
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState(null);

    useEffect(()=>{
      reloadOrder();
      reloadProducts();
    }, []);
    
    const reloadOrder = async() => {
      const { order } = await OrdersService.fetchOrder(orderdetails);
      setOrder(order);
      console.log('Done');
    }

    const reloadProducts = async() => {
      const { product } = (await OrdersService.fetchOrder(orderdetails)).order.cart;
      setProducts(product);
      console.log('Done');
    }


    return (
        <CustomerLayout header footer>
            <div>
                <div>
                    <h1>Order Summary</h1>
                </div>
                <div className={styles.detailsorder}>
                  <div className={styles.div}><strong>ORDER ID:</strong>  {order.id}</div>
                  <div className={styles.div}><strong>Date:</strong>  {order.date}</div>
                  <div style={{padding: 10}}><strong>State:</strong>  {order.state}</div>
                </div>
                <div className={styles.itemlayout}>
                  <h2>Products</h2>
                  {products.map((product) => (
                      <DetailOrderProductCard 
                      primaryPhoto={product.primaryPhoto}
                      id={product.id}
                      name = {product.name}
                      price={product.price}
                      quantity={10}
                      /> 
                  ))}
                </div>
                <div className={styles.info}><strong>Total: {" € "}{order.total} </strong></div>
                <div className={styles.info}><strong>Shipping address: Address</strong></div>
                <div className={styles.info}><strong>Billing address: Address</strong></div>
                <div>
                  <div className={styles.button}>
                    <p>Do you need assistance?</p> 
                    <Button color="primary" size="lg" style={{marginLeft:20}}>Assistance</Button>
                  </div>
                  <div className={styles.button}>
                    <p>Do you want to ask for a return?</p> 
                    <Button color="primary" size="lg" style={{marginLeft:20}}>Request Return</Button>
                  </div>
                  <div className={styles.button}>
                    <p>Do you want cancel your order? </p> 
                    <Button color="primary" size="lg" style={{marginLeft:20}}>Cancel Order</Button>
                  </div>
                </div>
            </div> 
        </CustomerLayout>
    );
};
export default OrderDetails;