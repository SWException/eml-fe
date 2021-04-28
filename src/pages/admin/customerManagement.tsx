import React from 'react'
import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/ProductMagagement.module.css';
import {Button} from 'reactstrap';

interface Props{
    customers: any,  //DA MODIFICARE NON APPENA E' PRONTO
}

const OrderManagement: React.FC<Props> = ({customers}) => {
    
    const router = useRouter();

    let customers2 = {
        "customers": [
          {
            "id": 1,
            "name": "Auricchio",
            "surname": "Lampredotto",
            "email": "test@somemail.com",
          },
          {
            "id": 2,
            "name": "Matteo",
            "surname": "Belmonte",
            "email": "test2@somemail.com",
          }
        ]
      };

    const addNewProduct = () => {
        router.push('/admin/addNewProduct');
    }

    return (
        <AdminLayout header>
            <div className={styles.div}>
            <input type="text" placeholder="Search by Name..."/>
            <Button color="primary" size="lg">SEARCH</Button>
            </div>
            <table className={styles.products}>
                <th>
                    NAME
                </th>
                <th>
                    SURNAME
                </th>
                <th>
                    EMAIL
                </th>
                {customers2.customers.map((customer)=>(
                    <tr>
                        <td>{customer.name}</td>
                        <td>{customer.surname}</td>
                        <td>{customer.email}</td>
                        <td><Button color="primary" size="lg">DELETE</Button></td>
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