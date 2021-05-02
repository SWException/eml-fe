import React, { ChangeEvent, useEffect, useState } from 'react';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/CustomerManagement.module.css';
import { Button } from 'reactstrap';
import { useRouter } from 'next/router';
import { CustomerService, sessionService } from 'services';
import { Customer } from 'types';

const CustomerManagement: React.FC = () => {

    const router = useRouter();

    const [customers, setCustomers] = useState<Customer[]>();

    useEffect(() => {
        getAllCustomer();
        const user = sessionService.getLocalStorage();
        if(sessionService.isAuth() && user.role=='user'){
            router.push('/');
        } else if (!sessionService.isAuth()){
            router.push('/')
        }
    }, [])

    const getCustomersByMail = async (mail: string) => {
        try {
            const { status, data } = await CustomerService.fetchCustomersByMail(mail);
            setCustomers(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    const getAllCustomer = async () => {
        try {
            const { status, data } = await CustomerService.fetchAllCustomers();
            setCustomers(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        if (value == '') {
            getAllCustomer();
        } else {
            getCustomersByMail(value);
        }
    }

    return (
        <AdminLayout header>
            <h1>Management Customers</h1>
            <div className={styles.tab}>
                <label><strong>Search:</strong></label>
                <input type="text" className={styles.input} placeholder="Search client by mail..." onChange={(e) => { handleChange(e) }} />
            </div>

            {customers ? (
                <div className={styles.tab}>
                    <table className={styles.customers}>
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>SURNAME</th>
                                <th>EMAIL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers?.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.name}</td>
                                    <td>{customer.surname}</td>
                                    <td><a href={"mailto:" + customer.email + "?subject=Emporio%20Lambda&body=This%20is%20an%20example"}>{customer.email}</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    No user in the system
                </div>
            )}
        </AdminLayout>
    );
};

export default CustomerManagement;