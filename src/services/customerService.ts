import { sessionService } from './sessionService';
import { Customer } from 'types/customer';

interface CustomersData {
  status: string;
  data: Customer[];
}

/*interface Response {
  status: string;
  message: string;
}*/


const fetchAllCustomers = async (): Promise<CustomersData> => {
  const token = sessionService.getCookie('token');
  try {
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      }
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/users/customers`, requestOptions)
    const resOBJ: CustomersData = await res.json();
    return resOBJ;
  } catch (error) {
    console.log(error);
  }
};

const fetchCustomersByMail = async (mail: string): Promise<CustomersData> => {
  const token = sessionService.getCookie('token');
  try {
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      }
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/users/customers?search=${mail}`, requestOptions)
    const resOBJ: CustomersData = await res.json();
    return resOBJ;
  } catch (error) {
    console.log(error);
  }
};

export const CustomerService = {
  fetchAllCustomers,
  fetchCustomersByMail,
};