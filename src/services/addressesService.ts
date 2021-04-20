import { Address } from 'types'

interface AddressData {
    addresses: Address[]
}

interface AddressResponse {
    status: string,
    message: string
}

const fetchAddresses = async (): Promise<AddressData> => {
    const token = window.localStorage.getItem('token');
    //Sistemare token con cookies
  try {
    const requestOptions = {
      method: 'GET',
      headers: { 
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Authorization": `${token}`
       }
    };
    const res = await fetch('https://virtserver.swaggerhub.com/swexception4/OpenAPI/0.4.0/addresses', requestOptions)
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

const createNewAddress = async (address:Address): Promise<AddressResponse> => {
    const token = window.localStorage.getItem('token');
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Authorization": `${token}`
       },
       body: JSON.stringify(address)       
    };
    const res = await fetch('https://virtserver.swaggerhub.com/swexception4/OpenAPI/0.4.0/addresses', requestOptions)
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
    const token = window.localStorage.getItem('token');
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: { 
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Authorization": `${token}`
       }      
    };
    const res = await fetch(`https://virtserver.swaggerhub.com/swexception4/OpenAPI/0.4.0/addresses/${id}`, requestOptions)
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