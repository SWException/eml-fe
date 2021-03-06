import React from 'react'
import { useRouter } from 'next/router';

const OrderManagement: React.FC = ({orders}) => {
    
    const router = useRouter();

    let orders2 = {
        "orders": [
          {
            "id": 1,
            "emailcustomer": "test@somemail.com",
            "status": "pending",
            "date": "22/05/2057 at 15:22:13",
            "total": 2500,
          },
          {
            "id": 2,
            "emailcustomer": "tes2t@somemail.com",
            "status": "pending",
            "date": "22/11/2057 at 15:11:13",
            "total": 32,
          }
        ]
      };

    const addNewProduct = () => {
        router.push('/admin/addNewProduct');
    }

    return (
        <>
            <input type="text" placeholder="Search by ID..."/>
            <button type="button">SEARCH</button>
            <table>
                <th>
                    ID
                </th>
                <th>
                    CUSTOMER MAIL
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
                <th>
                    STAMPA BOLLA
                </th>
                <th>
                    OPEN ORDER DETAILS PAGE
                </th>
                {orders2.orders.map((order)=>(
                    <tr>
                        <td>{order.id}</td>
                        <td>{order.emailcustomer}</td>
                        <td>
                            <select>
                                <option>accettato</option>
                                <option>in elaborazione</option>
                                <option>spedito</option>
                                <option>consegnato</option>
                                <option>cancellato</option>
                            </select>
                        </td>
                        <td>{order.date}</td>
                        <td>{order.total}</td>
                        <td><button type="button">Stampa bolla</button></td>
                        <td><button type="button">OPEN ORDER DETAILS PAGE</button></td>
                    </tr>
                ))}
            </table>
        </>
    );
};

export async function getStaticProps() {
    const res = await fetch('https://virtserver.swaggerhub.com/swexception4/OpenAPI/0.0.1/getProducts');

    const products = await res.json();

    return {
        props: {
            products: products,
        }
    };    
}

export default OrderManagement;