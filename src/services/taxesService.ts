import { APIClass } from 'aws-amplify';
import { Products, ProductsData, ProductData, ProductToAdd } from '../types/product';
import { sessionService } from './sessionService';

type ProductPayload = { params: any };

interface TaxObject {
    id: string;
    value: number;
    description: string;
}

interface Response {
  status: string;
  data: TaxObject[]
}

interface ResponseNormal {
    status: string;
    message: string;
}

const getVATTaxes = async (payload?: ProductPayload): Promise<Response> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json'
       }
    };

    const res = await fetch(`${process.env.AWS_ENDPOINT}/taxes`, requestOptions);
    const taxesReturned = await res.json();

    const taxesData: Response = {
      status: taxesReturned.status,
      data: taxesReturned.data
    };

    return taxesData;

  } catch (error) {
    throw new Error('Error on fetching all taxes');
  }
};

const createTax = async (value: number, description: string): Promise<ResponseNormal> => {
    const bodySend = {
        value, 
        description
    }
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodySend)
      };
  
      const res = await fetch(`${process.env.AWS_ENDPOINT}/taxes`, requestOptions);
      const taxesReturned = await res.json();
  
      const taxesData: ResponseNormal = {
        status: taxesReturned.status,
        message: taxesReturned.message
      };
  
      return taxesData;
  
    } catch (error) {
      throw new Error('Error on create a new tax');
    }
};

const getSingleTax = async (id: string): Promise<Response> => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json'
         }
      };
  
      const res = await fetch(`${process.env.AWS_ENDPOINT}/taxes/${id}`, requestOptions);
      const taxesReturned = await res.json();
  
      const taxesData: Response = {
        status: taxesReturned.status,
        data: taxesReturned.data
      };
  
      return taxesData;
  
    } catch (error) {
      throw new Error('Error on fetching single tax');
    }
};

const modifyTax = async (value: number, id: string): Promise<ResponseNormal> => {
    const bodySend = {
        value, 
        id
    }
    const token = sessionService.getCookie('token');
    try {
      const requestOptions = {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify(bodySend)
      };
  
      const res = await fetch(`${process.env.AWS_ENDPOINT}/taxes/${id}`, requestOptions);
      const taxesReturned = await res.json();
  
      const taxesData: ResponseNormal = {
        status: taxesReturned.status,
        message: taxesReturned.message
      };
  
      return taxesData;
  
    } catch (error) {
      throw new Error('Error on create a new tax');
    }
};

const deleteTax = async (id: string): Promise<ResponseNormal> => {
    const token = sessionService.getCookie('token');
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      };
  
      const res = await fetch(`${process.env.AWS_ENDPOINT}/taxes/${id}`, requestOptions);
      const taxesReturned = await res.json();
  
      const taxesData: ResponseNormal = {
        status: taxesReturned.status,
        message: taxesReturned.message
      };
  
      return taxesData;
  
    } catch (error) {
      throw new Error('Error on create a new tax');
    }
};

export const ProductService = {
  getVATTaxes,
  createTax,
  getSingleTax,
  modifyTax,
  deleteTax
};
