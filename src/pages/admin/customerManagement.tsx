import React, { useEffect, useState } from 'react'
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/ProductMagagement.module.css';
import {Button} from 'reactstrap';
import { CustomerService } from 'services';
import { Customer } from 'types';

const CustomerManagment: React.FC = () => {
    
    const [customers, setCustomers] = useState<Customer[]>();

    useEffect(()=>{
        getAllCustomer();
    }, [])

    const getCustomersByMail = async(mail: string) => {
        try {
            const { status, data} = await CustomerService.fetchCustomersByMail(mail);
            setCustomers(data);
            console.log(data);
        } catch(err) {
            console.log(err);
        }
    }

    const getAllCustomer = async() => {
        try {
            const { status, data } = await CustomerService.fetchAllCustomers();
            setCustomers(data);
            console.log(data);
        } catch(err) {
            console.log(err);
        }
    }

    const handleChange = (e:React.FormEvent<HTMLInputElement>) :void => {
        const value = (e.target as HTMLTextAreaElement).value;
        if(value == ''){
            getAllCustomer();
        }else{
            getCustomersByMail(value);  
        }   
    }

    return (
        <AdminLayout header>
            <div className={styles.div}>
            <input type="text" className={styles.input} placeholder="Search client by mail..." onChange={(e) => {handleChange(e)}}/>
            <Button type="submit" formAction="/products" style={{border: "2px solid #ccc", backgroundColor: "#ccc", borderRadius:"0"}}>
                <img src="/iconsearch.png" style={{width:"2.3rem", height:"2.3rem"}}/>
            </Button>
            </div>
            
            {customers ? (
            <table className={styles.products}>
                <thead>
                    <tr>
                        <th>
                            NAME
                        </th>
                        <th>
                            SURNAME
                        </th>
                        <th>
                            EMAIL
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {customers?.map((customer)=> (
                    <tr key={customer.id}>
                        <td>{customer.name}</td>
                        <td>{customer.surname}</td>
                        <td><a href={"mailto:" + customer.email + "?subject=Emporio%20Lambda&body=This%20is%20an%20example"}>{customer.email}</a></td>
                    </tr>
                    ))}
                </tbody>
            </table>
            ):(
            <div>
                No user in the system
            </div>
            )}
        </AdminLayout>
    );
};

export default CustomerManagment;