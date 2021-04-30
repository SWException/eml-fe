
import { sessionService } from './sessionService';

interface TaxObject {
    id: string;
    value: number;
    description: string;
}

interface TaxData {
  status: string;
  data: TaxObject[]
}

interface Response {
    status: string;
    message: string;
}

const getVATTaxes = async (): Promise<TaxData> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json'
       }
    };

    const res = await fetch(`${process.env.AWS_ENDPOINT}/taxes`, requestOptions);
    const taxesReturned = await res.json();

    const taxesData: TaxData = {
      status: taxesReturned.status,
      data: taxesReturned.data
    };

    return taxesData;

  } catch (error) {
    throw new Error('Error on fetching all taxes');
  }
};

const createTax = async (value: number, description: string): Promise<Response> => {
    const bodySend = {
        value, 
        description
    }
    const token = sessionService.getCookie('token');
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodySend)
      };
  
      const res = await fetch(`${process.env.AWS_ENDPOINT}/taxes`, requestOptions);
      const taxesReturned = await res.json();
  
      const taxesData: Response = {
        status: taxesReturned.status,
        message: taxesReturned.message
      };
  
      return taxesData;
  
    } catch (error) {
      throw new Error('Error on create a new tax');
    }
};

const getSingleTax = async (id: string): Promise<TaxData> => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json'
         }
      };
  
      const res = await fetch(`${process.env.AWS_ENDPOINT}/taxes/${id}`, requestOptions);
      const taxesReturned = await res.json();
  
      const taxesData: TaxData = {
        status: taxesReturned.status,
        data: taxesReturned.data
      };
  
      return taxesData;
  
    } catch (error) {
      throw new Error('Error on fetching single tax');
    }
};

const modifyTax = async (id: string, value: number, description:string): Promise<Response> => {
    const bodySend = {
        id,
        value,
        description,
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
  
      const taxesData: Response = {
        status: taxesReturned.status,
        message: taxesReturned.message
      };
  
      return taxesData;
  
    } catch (error) {
      throw new Error('Error on create a new tax');
    }
};

const deleteTax = async (id: string): Promise<Response> => {
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
  
      const taxesData: Response = {
        status: taxesReturned.status,
        message: taxesReturned.message
      };
  
      return taxesData;
  
    } catch (error) {
      throw new Error('Error on create a new tax');
    }
};

export const TaxesService = {
  getVATTaxes,
  createTax,
  getSingleTax,
  modifyTax,
  deleteTax
};
