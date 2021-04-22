import { Address } from 'types'
import { sessionService } from './sessionService';
interface AddressData {
    addresses: Address[]
}

interface AddressResponse {
    status: string,
    message: string
}

const fetchAddresses = async (): Promise<AddressData> => {
  const token = await sessionService.getCookie('token');

  try {
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        "Authorization": `${token}`
       }
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/addresses`, requestOptions)
    const addressesReturn = await res.json();

    const addressesDataToReturn: AddressData = {
      addresses: addressesReturn.data
    };

    console.log(addressesDataToReturn);

    return addressesDataToReturn;
    
  } catch (error) {
    console.log(error);
  }
};

const createNewAddress = async (address: Address): Promise<AddressResponse> => {
  const token = await sessionService.getCookie('token');
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        "Authorization": `${token}`
       },
       body: JSON.stringify(address)       
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/addresses`, requestOptions)
    const response = await res.json();

    const addressCreateRespo: AddressResponse = {
      status: response.status,
      message: response.message
    };

    return addressCreateRespo;
    
  } catch (error) {
    console.log(error);
  }
};

const deleteAddress = async (id: number): Promise<AddressResponse> => {
  const token = await sessionService.getCookie('token');
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        "Authorization": `${token}`
       }      
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/addresses/${id}`, requestOptions)
    const response = await res.json();

    const addressDeleteResponse: AddressResponse = {
      status: response.status,
      message: response.message
    };

    console.log(addressDeleteResponse)

    return addressDeleteResponse;
    
  } catch (error) {
    console.log(error);
  }
};

export const AddressesService = {
  fetchAddresses,
  createNewAddress,
  deleteAddress
};