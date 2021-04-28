import React from 'react'
import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/ProductMagagement.module.css'
import {Button} from 'reactstrap'

interface Props{
    orders: any,  //DA MODIFICARE NON APPENA E' PRONTO
  }
  

const OrderManagement: React.FC<Props> = ({orders}) => {
    console.log(orders);
    const router = useRouter();

    let orders2 = [];
    for(var i = 0; i < 6; i++){
      var order= {
        id : "ID" + i,
        emailcustomer: "test@gmail.com",
        status:"peding",
        date:"2021/12/12",
        total: 120+i,
      };  
      orders2[i] = order;
    }

    const orderDetailsAdmin = () => {
        router.push('/admin/orderDetailsAdmin');
    }
    

    return (
        <AdminLayout header>
             <div className={styles.div}>
            <input className={styles.input} type="text" placeholder="Search Order by id..."/>
            <Button type="submit" formAction="/products" style={{border: "2px solid #ccc", backgroundColor: "#ccc", borderRadius:"0"}}>
                <img src="/iconsearch.png" style={{width:"2.3rem", height:"2.3rem"}}/>
            </Button>
            </div>
            <table className={styles.products}>
                <th>
                    ID
                </th>
                <th>
                    CUSTOMER EMAIL
                </th>
                <th>
                    STATUS
                </th>
                <th>
                    DATE
                </th>
                <th>
                    TOTAL
                </th>
                {orders2.map((order)=>(
                    <tr>
                        <td>{order.id}</td>
                        <td>{order.emailcustomer}</td>
                        <td>{order.status}</td>
                        <td>{order.date}</td>
                        <td>€{order.total}</td>
                        <td><Button color="primary" size="lg">Print Shipping Note</Button></td>
                        <td><Button color="primary" size="lg"onClick={orderDetailsAdmin}>Order Summary</Button></td>
                    </tr>
                ))}
            </table>
        </AdminLayout>
    );
};



/*export async function getStaticProps() {
    const res = await fetch('https://virtserver.swaggerhub.com/swexception4/OpenAPI/0.0.1/getProducts');

    const products = await res.json();

    return {
        props: {
            products: products,
        }
    };    
}*/

export default OrderManagement;