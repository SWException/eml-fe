import { DetailOrderProductCard } from 'components/orderdetails'
import { Address, OrderProducts, Product } from 'types'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Button } from 'reactstrap';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import styles from "styles/Order.module.css";
import { OrdersService } from 'services';
import { Order, Products, Cart } from '../types';
import { GetServerSideProps } from 'next';
import { CartService } from 'services';
interface Props {
  order: Order,
  id: any
}

const OrderDetails: React.FC<Props> = ({ id }) => { //IN VERITA' E' :React.FC<Props>
  console.log(id);
  //Inserire Fetch

  const router = useRouter();

  const [dateShow, setDateShow] = useState('')

  const getDate = (timestamp): string => {
    var date = new Date(+timestamp);
    // Hours part from the timestamp
    return (date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}

  const [order, setOrder]: [Order, React.Dispatch<Order>] = useState({
    orderid: "",
    timestamp: "",
    orderStatus: "",
    cart: {
      total: 0
    },
    shippingAddress:{
      description: ""
    },
    billingAddress:{
      description: ""
    }
  } as Order);
  const [products, setProducts]: [OrderProducts, React.Dispatch<OrderProducts>] = useState([]);

  useEffect(() => {
    reloadOrder();
    setDateShow(getDate("0"));
  }, []);
  
  const reloadOrder = async() => {
    console.log('Start reloadOrder');
    const { order } = await OrdersService.fetchOrder(id);
    setOrder(order);
    console.log(order);
    console.log('Done reloadOrder');

    console.log('Start reloadProducts');
    console.log(order.cart);
    console.log(order.cart.products);
    setProducts(order.cart.products);
    setDateShow(getDate(order.timestamp));
    console.log('Done reloadProducts');
  }

  return (
    <CustomerLayout header footer>
      <div>
        <div>
          <h1>Order Summary</h1>
        </div>
        <div className={styles.detailsorder}>
          <div className={styles.div}><strong>ORDER ID:</strong>  {order.orderid}</div>
          <div className={styles.div}><strong>Date:</strong>  {dateShow}</div>
          <div style={{ padding: 10 }}><strong>State:</strong>  {order.orderStatus}</div>
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
        <div className={styles.info}><strong>Total: {" € "}{order.cart.total} </strong></div>
        <div className={styles.info}><strong>Shipping address:</strong> {`${order.shippingAddress.description} - ${order.shippingAddress.city}, ${order.shippingAddress.address}, ${order.shippingAddress.code}, ${order.shippingAddress.district}`}</div>
        <div className={styles.info}><strong>Billing address: </strong> {`${order.billingAddress.description} - ${order.billingAddress.city}, ${order.billingAddress.address}, ${order.billingAddress.code}, ${order.billingAddress.district}`}</div>
        <div>
          <div className={styles.button}>
            <p>Do you need assistance?</p>
            <a href="mailto:farmaciapadovana@gmail.com?subject=Assistance%20Required&body=This%20is%20an%20example"><Button color="primary" size="lg" style={{ marginLeft: 20 }}>Assistance</Button></a>
          </div>
          <div className={styles.button}>
            <p>Do you want to ask for a return?</p>
            <a href="mailto:farmaciapadovana@gmail.com?subject=Return%20request&body=This%20is%20an%20example"><Button color="primary" size="lg" style={{ marginLeft: 20 }}>Request Return</Button></a>
          </div>
          <div className={styles.button}>
            <p>Do you want cancel your order? </p>
            <a href="mailto:farmaciapadovana@gmail.com?subject=Cancel%20Request&body=This%20is%20an%20example"><Button color="primary" size="lg" style={{ marginLeft: 20 }}>Cancel Order</Button></a>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};
/*{products.map((product) => (
            <DetailOrderProductCard
              primaryPhoto={product.primaryPhoto}
              id={product.id}
              name={product.name}
              price={product.price}
              quantity={10}
            />
          ))} */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query?.id as string;

  try {
    let { order } = await OrdersService.fetchOrder(id);
    if(!order)
      order=null;
    console.log(order);
    return {
      props: { order, id },
    };
  } catch (error) {
    console.error("EEEEHIIII ", error);
    return {
      props: {
        id,
        order: null,
        error: 'Error in getting order',
      },
    };
  }
};
export default OrderDetails;
