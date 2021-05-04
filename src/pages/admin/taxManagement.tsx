import React, { useState, useEffect, ChangeEvent, Dispatch } from 'react';
import { useRouter } from 'next/router';
import styles from 'styles/TaxesManagement.module.css';
import { Button } from 'reactstrap';
import { AdminLayout } from 'components/layouts/AdminLayout';
import { AddNewTax, EditExistingTax } from 'components/admin';
import { Taxes } from 'types';
import { sessionService, TaxesService } from 'services';

const TaxManagement: React.FC = () => {

    const [taxes, setTaxes]: [Taxes, Dispatch<Taxes>] = useState<Taxes>()

    useEffect(() => {
        getAllTaxes();
    }, [])


    const getAllTaxes = async (): Promise<void> => {
        try {
            const taxes: Taxes = await TaxesService.fetchTaxes();
            setTaxes(taxes);
        }
        catch (err) {
            //HANDLING ERROR
            console.log(err)
        }
    }

    const getTaxesByDescription = async (description: string): Promise<void> => {
        try {
            const taxes: Taxes = await TaxesService.fetchTaxesByDescription(description);
            setTaxes(taxes);
        }
        catch (err) {
            alert("Something went wrong, try again later ..");
            console.log(err);
        }
    }

    const deleteTax = async (id: string): Promise<void> => {
        try {
            const result: boolean = await TaxesService.deleteTax(id);
            console.log(result);
            if(result){
                getAllTaxes();
                alert("Tax deleted successfully!");
            }
        }
        catch (err) {
            alert("Something went wrong, try again later ..");
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        if (value == '') {
            getAllTaxes();
        }
        else {
            getTaxesByDescription(value);
        }
    }

    return (
        <AdminLayout header>
            <h1>Management Taxes</h1>
            <div className={styles.tab}>
                <AddNewTax  loadTaxes={() => { getAllTaxes() }}/>
            </div>
            <div className={styles.tab}>
                <label><strong>Search:</strong></label>
                <input className={styles.input} type="text" placeholder="Search tax by name..." onChange={(e) => { handleChange(e) }} />
            </div>
            {taxes ? (
                <div className={styles.tab}>
                    <table className={styles.taxes}>
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
                                    <td><EditExistingTax tax={tax} loadTaxes={() => { getAllTaxes() }}/></td>
                                    <td><Button color="primary" size="lg" onClick={() => deleteTax(tax.id)}>REMOVE</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    No Taxes
                </div>
            )}
        </AdminLayout>
    );
};

export default TaxManagement;