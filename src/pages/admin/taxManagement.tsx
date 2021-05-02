import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import styles from 'styles/ProductManagement.module.css';
import { Button } from 'reactstrap';
import { AdminLayout } from 'components/layouts/AdminLayout';
import { AddNewTax, EditExistingTax } from 'components/admin';
import { Taxes } from 'types';
import { sessionService, TaxesService } from 'services';

const TaxManagement: React.FC = () => {

    const router = useRouter();

    const [taxes, setTaxes] = useState<Taxes>()

    useEffect(() => {
        getAllTaxes()
        const user = sessionService.getLocalStorage();
        if(sessionService.isAuth() && user.role=='user'){
            router.push('/');
        } else if (!sessionService.isAuth()){
            router.push('/')
        }
    }, [])


    const getAllTaxes = async () => {
        try {
            const taxes: Taxes = await TaxesService.fetchTaxes();
            setTaxes(taxes);
        } catch (err) {
            //HANDLING ERROR
            console.log(err)
        }
    }

    const getTaxesByDescription = async (description: string) => {
        try {
            const taxes: Taxes = await TaxesService.fetchTaxesByDescription(description);
            setTaxes(taxes);
        } catch (err) {
            //HANDLING ERROR
            console.log(err);
        }
    }

    const deleteTax = async (id: string) => {
        try {
            const result: boolean = await TaxesService.deleteTax(id);
            console.log(result);
        } catch (err) {
            //HANDLING ERROR
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        if (value == '') {
            getAllTaxes();
        } else {
            getTaxesByDescription(value);
        }
    }

    return (
        <AdminLayout header>
            <h1>Management Taxes</h1>
            <div className={styles.div}>
                <AddNewTax />
            </div>
            <div className={styles.div}>
                <input className={styles.input} type="text" placeholder="Search tax by name..." onChange={(e) => { handleChange(e) }} />
                <Button type="submit" formAction="/products" style={{ border: "2px solid #ccc", backgroundColor: "#ccc", borderRadius: "0" }}>
                    <img src="/iconsearch.png" style={{ width: "2.3rem", height: "2.3rem" }} />
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
                        {taxes.map((tax) => (
                            <tr key={tax.id}>
                                <td>{tax.id}</td>
                                <td>{tax.description}</td>
                                <td>{tax.value}</td>
                                <td><EditExistingTax tax={tax} /></td>
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