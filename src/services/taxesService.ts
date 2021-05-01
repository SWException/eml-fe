import { EditTax, InsertTax, Taxes } from 'types';
import { sessionService } from './sessionService';

const fetchTaxes = async (): Promise<Taxes> => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const res = await fetch(`${process.env.AWS_ENDPOINT}/taxes`, requestOptions)
        .catch(() => { throw new Error('Error on fetching all taxes') });

    const taxesReturned = await res.json();

    if (taxesReturned.status == 'error')
        throw new Error(taxesReturned.message);

    const taxes: Taxes = taxesReturned.data;
    return taxes;
};

const fetchTaxesByDescription = async (description: string): Promise<Taxes> => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const res = await fetch(`${process.env.AWS_ENDPOINT}/taxes?search=${description}`, requestOptions)
        .catch(() => { throw new Error('Error on fetching all taxes') });

    const taxesReturned = await res.json();

    if (taxesReturned.status == 'error')
        throw new Error(taxesReturned.message);

    const taxes: Taxes = taxesReturned.data;
    return taxes;
};


const createTax = async (tax: InsertTax): Promise<boolean> => {
    const token = sessionService.getCookie('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tax),
    };

    const res = await fetch(`${process.env.AWS_ENDPOINT}/taxes`, requestOptions)
        .catch(() => { throw new Error('Error on creating new tax') });

    const response = await res.json();

    if (response.status == 'error')
        throw new Error(response.message);

    return true;
};

const deleteTax = async (id: string): Promise<boolean> => {
    const token = sessionService.getCookie('token');
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    };

    const res = await fetch(`${process.env.AWS_ENDPOINT}/taxes/${id}`, requestOptions)
        .catch(() => { throw new Error('Error on deleting new tax') });

    const response = await res.json();

    if (response.status == 'error')
        throw new Error(response.message);

    return true;
};

const modifyTax = async (id: string, tax: EditTax): Promise<boolean> => {
    const token = sessionService.getCookie('token');
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(tax),
    };

    const res = await fetch(`${process.env.AWS_ENDPOINT}/taxes/${id}`, requestOptions)
        .catch(() => { throw new Error('Error on editing tax') });

    const response = await res.json();

    if (response.status == 'error')
        throw new Error(response.message);

    return true;
}

export const TaxesService = {
    fetchTaxes,
    fetchTaxesByDescription,
    createTax,
    modifyTax,
    deleteTax
};
