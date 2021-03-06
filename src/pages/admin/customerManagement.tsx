import React, { ChangeEvent, useEffect, useState, Dispatch } from 'react';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/CustomerManagement.module.css';
import { useRouter } from 'next/router';
import { CustomerService, sessionService } from 'services';
import { Customers } from 'types';

const CustomerManagement: React.FC = () => {

    const router = useRouter();

    const [customers, setCustomers]: [Customers, Dispatch<Customers>] = useState<Customers>();

    useEffect(() => {
        getAllCustomer();
    }, [])

    const getCustomersByMail = async (mail: string): Promise<void> => {
        try {
            const customers = await CustomerService.fetchCustomersByMail(mail);
            setCustomers(customers);
            console.log(customers);
        }
        catch (err) {
            console.log(err);
        }
    }

    const getAllCustomer = async (): Promise<void> => {
        try {
            const customers = await CustomerService.fetchAllCustomers();
            setCustomers(customers);
            console.log(customers);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        if (value == '') {
            getAllCustomer();
        }
        else {
            getCustomersByMail(value);
        }
    }

    return (
        <AdminLayout header>
            <h1>Management Customers</h1>
            <div className={styles.tab}>
                <label><strong>Search:</strong></label>
                <input type="text" className={styles.input} placeholder="Search client by mail..." onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e) }} />
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
                                <tr key={customer.username}>
                                    <td>{customer.name}</td>
                                    <td>{customer.surname}</td>
                                    <td><a href={"mailto:" + customer.email + "?subject=Emporio%20Lambda&body=This%20is%20an%20example"}>{customer.email}</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className={styles.message}>
                    No user in the system
                </div>
            )}
        </AdminLayout>
    );
};

export default CustomerManagement;