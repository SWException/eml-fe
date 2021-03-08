import React from 'react'
import { useRouter } from 'next/router';

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
        <>
            <input type="text" placeholder="New tax name..."/>
            <input type="number" placeholder="Percentage"/>
            <button type="button">CREATE TAX</button>
            <table>
                <th>
                    ID
                </th>
                <th>
                    NAME
                </th>
                <th>
                    VALUE %
                </th>
                <th>
                    EDIT
                </th>
                <th>
                    REMOVE
                </th>
                {taxes2.tax.map((product)=>(
                    <tr>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.value}</td>
                        <td><button type="button">EDIT</button></td>
                        <td><button type="button">REMOVE</button></td>
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

export default TaxManagement;