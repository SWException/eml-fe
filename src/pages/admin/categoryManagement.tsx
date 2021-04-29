import React from 'react';
import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/ProductMagagement.module.css';
import {Button} from 'reactstrap';
import AddNewCategory from 'components/admin/AddNewCategory';
import EditCategory from 'components/admin/EditCategory';

interface Props{
    categories: any, //DA MODIFICARE NON APPENA E' PRONTO
}

const CategoryManagement: React.FC<Props> = ({categories}) => {
    
    const router = useRouter();

      let categories2 = [];
    for(var i = 0; i < 6; i++){
      var category= {
        name : "category" + i
      };  
      categories2[i] = category;
    }

    return (
        <AdminLayout header>
            <div className={styles.div}>
            <AddNewCategory/>
            </div>
            <div className={styles.div}>
            <input className={styles.input} type="text" placeholder="Search category by name..."/>
            <Button type="submit" formAction="/products" style={{border: "2px solid #ccc", backgroundColor: "#ccc", borderRadius:"0"}}>
                <img src="/iconsearch.png" style={{width:"2.3rem", height:"2.3rem"}}/>
            </Button>
            </div>
            <table className={styles.products}>
                <th>
                    NAME
                </th>
                {categories2.map((category)=>(
                    <tr>
                        <td>{category.name}</td>
                        <td><EditCategory/></td>
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

export default CategoryManagement;