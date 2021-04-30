import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/ProductMagagement.module.css';
import {Button} from 'reactstrap';
import AddNewTax from 'components/admin/AddNewTax';
import EditTax from 'components/admin/EditTax';
import { Taxes, Tax } from 'types';
import { TaxesService } from 'services'; 

const TaxManagement: React.FC = () => {
    
    const router = useRouter();
    
    const [taxes, setTaxes] = useState<Taxes[]>()

    useEffect(()=>{
      getAllTaxes()
    }, [])

    const getAllTaxes = async() => {
      try {
            const { data } = await TaxesService.getVATTaxes();
            setTaxes(data);
      } catch(err) {
            console.log(err)
      }
    }

    const deleteTax = async(id: string) =>
    {
      try {
          console.log(id)
            const { status, message } = await TaxesService.deleteTax(id);
      } catch(err) {
            console.log(err)
      }
    }

    return (
        <AdminLayout header>
            <h1>Management Taxes</h1>
            <div className={styles.div}>
            <AddNewTax/>
            </div>
            <div className={styles.div}>
            <input className={styles.input} type="text" placeholder="Search tax by name..."/>
            <Button type="submit" formAction="/products" style={{border: "2px solid #ccc", backgroundColor: "#ccc", borderRadius:"0"}}>
                <img src="/iconsearch.png" style={{width:"2.3rem", height:"2.3rem"}}/>
            </Button>
            </div>
            {taxes ? (
                <table className={styles.products}>
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                DESCRIPTION
                            </th>
                            <th>
                                VALUE %
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {taxes.map((tax)=>(
                            <tr key={tax.id}>
                                <td>{tax.id}</td>
                                <td>{tax.description}</td>
                                <td>{tax.value}</td>
                                <td><EditTax tax={tax}/></td>
                                <td><Button color="primary" size="lg" onClick={() => deleteTax(tax.id)}>REMOVE</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              ) : (
                <div>
                  No Taxes 
                </div>
              )}  
        </AdminLayout>
    );
};

export default TaxManagement;