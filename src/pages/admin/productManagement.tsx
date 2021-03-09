import React from 'react'
import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';

interface Props{
    products: any,  //DA MODIFICARE NON APPENA E' PRONTO
  }

const ProductManagement: React.FC<Props> = ({products}) => {
    
    const router = useRouter();

    let products2 = {
        "products": [
          {
            "id": 1,
            "name": "giochi",
            "description": "descrizione del prodotto",
            "photo": "/image2.jpg",
            "secondaryPhoto": "/image2.jpg",
            "category": "giochi",
            "netprice": 5.99,
            "tax": null
          },
          {
            "id": 2,
            "name": "cucina"
          }
        ]
      };

    const addNewProduct = () => {
        router.push('/admin/addNewProduct');
    }

    const editProduct = () => {
        router.push('/admin/editExistingProduct');
    }
    
    return (
        <AdminLayout header>
            <button type="button" onClick={addNewProduct}>ADD NEW PRODUCT</button>
            <select>
                <option>NO CATEGORY FILTER</option>
                <option>CATEGORY 1</option>
                <option>CATEGORY 2</option>
                <option>CATEGORY 3</option>
                <option>CATEGORY 4</option>
                <option>CATEGORY 5</option>
                <option>CATEGORY 6</option>
            </select>
            <input type="text" placeholder="Search by name..."/>
            <button type="button">SEARCH</button>
            <table>
                <th>
                    ID
                </th>
                <th>
                    NAME
                </th>
                <th>
                    NET PRICE
                </th>
                <th>
                    CATEGORY
                </th>
                <th>
                    EDIT
                </th>
                <th>
                    REMOVE
                </th>
                {products2.products.map((product)=>(
                    <tr>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.netprice}</td>
                        <td>{product.category}</td>
                        <td><button type="button" onClick={editProduct}>EDIT</button></td>
                        <td><button type="button">REMOVE</button></td>
                    </tr>
                ))}
            </table>
        </AdminLayout>
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

export default ProductManagement;