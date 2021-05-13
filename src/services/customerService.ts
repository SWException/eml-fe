import { AuthService } from 'services';
import { Customer, Customers } from 'types/customer';

const fetchAllCustomers = async (): Promise<Customers> => {
    const token = await AuthService.getTokenJwt();
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        }
    }

    const res = await fetch(`${process.env.AWS_ENDPOINT}/users/customers`, requestOptions)
        .catch(() => { throw new Error('Error on editing tax') });

    const customersReturned = await res.json();

    if (customersReturned.status == 'error')
        throw new Error(customersReturned.message);

    const customers: Customers = customersReturned.data;
    return customers;
};

const fetchCustomer = async (username: string): Promise<Customer> => {
    const token = await AuthService.getTokenJwt();
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        }
    }

    const res = await fetch(`${process.env.AWS_ENDPOINT}/users/customers/${username}`, requestOptions)
        .catch(() => { throw new Error('Error on editing tax') });

    const customerReturned = await res.json();

    if (customerReturned.status == 'error')
        throw new Error(customerReturned.message);

    const customer: Customer = customerReturned.data;
    return customer;
};

const fetchCustomersByMail = async (mail: string): Promise<Customers> => {
    const token = await AuthService.getTokenJwt();

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        }
    }

    const res = await fetch(`${process.env.AWS_ENDPOINT}/users/customers?search=${mail}`, requestOptions)
        .catch(() => { throw new Error('Error on editing tax') });

    const customersReturned = await res.json();

    if (customersReturned.status == 'error')
        throw new Error(customersReturned.message);

    const customers: Customers = customersReturned.data;
    return customers;
};

export const CustomerService = {
    fetchAllCustomers,
    fetchCustomer,
    fetchCustomersByMail,
};