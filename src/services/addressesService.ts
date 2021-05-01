import { Address } from 'types'
import { sessionService } from './sessionService';

interface AddressData {
    addresses: Address[]
}

interface AddressResponse {
    status: string,
    message: string
}

interface GetAddressResponse {
    status: string;
    data: Address;
}

const fetchAddresses = async (): Promise<AddressData> => {
    const token = sessionService.getCookie('token');

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
    const token = sessionService.getCookie('token');
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

        const addressCreateResponse: AddressResponse = {
            status: response.status,
            message: response.message
        };

        return addressCreateResponse;

    } catch (error) {
        console.log(error);
    }
};

const getSingleAddress = async (id: string): Promise<GetAddressResponse> => {
    const token = sessionService.getCookie('token');
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${token}`
            }
        };
        const res = await fetch(`${process.env.AWS_ENDPOINT}/addresses/${id}`, requestOptions)
        const response = await res.json();

        const addressDeleteResponse: GetAddressResponse = {
            status: response.status,
            data: response.data
        };

        return addressDeleteResponse;

    } catch (error) {
        console.log(error);
    }
};

const updateAddress = async (id: string, description: string): Promise<AddressResponse> => {
    const token = sessionService.getCookie('token');
    const update = {
        id,
        description
    }
    try {
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${token}`
            },
            body: JSON.stringify(update)
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

const deleteAddress = async (id: string): Promise<AddressResponse> => {
    const token = sessionService.getCookie('token');
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
    deleteAddress,
    updateAddress,
    getSingleAddress
};