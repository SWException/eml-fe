import React from 'react'
import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';

interface Props{
    categories: any, //DA MODIFICARE NON APPENA E' PRONTO
}

const CategoryManagement: React.FC<Props> = ({categories}) => {
    
    const router = useRouter();

    let categories2 = {
        "categories": [
          {
            "id": 1,
            "name": "giochi"
          },
          {
            "id": 2,
            "name": "cucina"
          }
        ]
      };

    return (
        <AdminLayout header>
            <input type="text" placeholder="New category name...."/>
            <button type="button">Add category</button>
            <br/>      
            
            <table>
                <th>
                    CATEGORY
                </th>
                <th>
                    EDIT
                </th>
                <th>
                    REMOVE
                </th>
                {categories2.categories.map((category)=>(
                    <tr>
                        <td>{category.name}</td>
                        <td><button type="button">EDIT</button></td>
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

export default CategoryManagement;