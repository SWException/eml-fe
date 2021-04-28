import React from 'react'
import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/ProductMagagement.module.css'
import {Button} from 'reactstrap';
import Image from 'next/image';


interface Props{
    products: any,  //DA MODIFICARE NON APPENA E' PRONTO
  }

const ProductManagement: React.FC<Props> = ({products}) => {
    console.log(products);
    const router = useRouter();


      let products2 = [];
    for(var i = 0; i < 6; i++){
      var product= {
        id : "ID" + i,
        name: "giochi",
        description:"descrizione del prodotto",
        photo: "/image2.jpg",
        secondary: "/image2.jpg",
        category: "giochi",
        netprice: 5.99,
        tax: 22
      };  
      products2[i] = product;
    }

    const addNewProduct = () => {
        router.push('/admin/addNewProduct');
    }

    const editProduct = () => {
        router.push('/admin/editExistingProduct');
    }
    
    return (
        <AdminLayout header>
            <div className={styles.div}>
            <Button color="primary" size="lg" onClick={addNewProduct}>ADD NEW PRODUCT</Button>
            </div>
            <div className={styles.div}>
            <select className={styles.category}>
                <option>Choose a category</option>
                <option>CATEGORY 1</option>
                <option>CATEGORY 2</option>
                <option>CATEGORY 3</option>
                <option>CATEGORY 4</option>
                <option>CATEGORY 5</option>
                <option>CATEGORY 6</option>
            </select>
            </div>
            <div className={styles.div}>
            <input className={styles.input} type="text" placeholder="Search Product by name..."/>
            <Button className={styles.searchButton} type="submit" formAction="/products" color="light">
                <img src="/iconsearch.png" width={20} height={20}/>
            </Button>
            </div>
            <table className={styles.products}>
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
                    TAX
                </th>
               
                {products2.map((product)=>(
                    <tr>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>€ {product.netprice}</td>
                        <td>{product.category}</td>
                        <td>{product.tax}</td>
                        <td><Button color="primary" size="lg" onClick={editProduct}>EDIT</Button></td>
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

export default ProductManagement;