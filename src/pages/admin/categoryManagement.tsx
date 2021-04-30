import React, { useEffect, useState } from 'react';
//import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/ProductMagagement.module.css';
import {Button} from 'reactstrap';
import AddNewCategory from 'components/admin/AddNewCategory';
import EditCategory from 'components/admin/EditCategory';
import { CategoriesService } from 'services';
import { Category } from 'types';


const CategoryManagement: React.FC = () => {
    
    //const router = useRouter();

    const [categories, setCategories] = useState<Category[]>();

    useEffect(()=>{
      getAllCategories();
    }, [])

    const getAllCategories = async() => {
      try {
        const { categories } = await CategoriesService.fetchAllCategories();
        setCategories(categories);
      } catch(err) {
        console.log(err);
      }
    }

    const deleteCategory = async(id: string) =>
    {
      try {
        const { status, message } = await CategoriesService.deleteCategory(id);
        //STATUS HANDLING
      } catch(err) {
        console.log(err)
      }
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
            {categories ? (
              <table className={styles.products}>
                <tbody>
                  {categories.map((category)=>(
                    <tr key={category.id}>
                      <td>{category.name}</td>
                      <td><EditCategory category={category}/></td>
                      <td><Button color="primary" size="lg" onClick={() => deleteCategory(category.id)}>REMOVE</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>
                No categories 
              </div>
            )}
            
        </AdminLayout>
    );
};


export default CategoryManagement;