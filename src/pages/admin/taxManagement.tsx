import React from 'react';
import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/ProductMagagement.module.css';
import {Button} from 'reactstrap';

interface Props{
    tax: any,  //DA MODIFICARE NON APPENA E' PRONTO
  }

const TaxManagement: React.FC<Props> = ({tax}) => {
    
    const router = useRouter();

    let taxes2 = {
        "tax": [
            {
            "id": 1,
            "name": "IVA 22",
            "value": 22,
            },
            {
            "id": 2,
            "name": "Alimentari",
            "value": 10
            }
        ]
    };

    return (
        <AdminLayout header>
            <div className={styles.div}>
            <Button color="primary" size="lg">Add New Tax</Button>
            </div>
            <div className={styles.div}>
            <input type="text" placeholder="Search by Name..."/>
            <Button color="primary" size="lg">SEARCH</Button>
            </div>
            <table className={styles.products}>
                <th>
                    ID
                </th>
                <th>
                    NAME
                </th>
                <th>
                    VALUE %
                </th>
                {taxes2.tax.map((tax)=>(
                    <tr>
                        <td>{tax.id}</td>
                        <td>{tax.name}</td>
                        <td>{tax.value}</td>
                        <td><Button color="primary" size="lg">EDIT</Button></td>
                        <td><Button color="primary" size="lg">REMOVE</Button></td>
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

export default TaxManagement;