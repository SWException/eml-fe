import { Address, Addresses, EditAddress, InsertAddress } from 'types'
import { sessionService } from './sessionService';

const fetchAddresses = async (): Promise<Addresses> => {
    const token = sessionService.getCookie('token');

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
        }
    };

    const res = await fetch(`${process.env.AWS_ENDPOINT}/addresses`, requestOptions)
        .catch(() => { throw new Error('Error on fetching addresses') });
    const addressesReturn = await res.json();

    if (addressesReturn.status == 'error')
        throw new Error(addressesReturn.message);

    const addresses: Addresses = addressesReturn.data;
    return addresses;
};

const createNewAddress = async (address: InsertAddress): Promise<boolean> => {
    const token = sessionService.getCookie('token');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
        },
        body: JSON.stringify(address)
    };

    const res = await fetch(`${process.env.AWS_ENDPOINT}/addresses`, requestOptions)
        .catch(() => { throw new Error('Error on creating an address') });
    const response = await res.json();

    if (response.status == 'error')
        throw new Error(response.message);

    return true;
};

const deleteAddress = async (id: string): Promise<boolean> => {
    const token = sessionService.getCookie('token');
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
        }
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/addresses/${id}`, requestOptions)
        .catch(() => { throw new Error("Error deleting address"); })

    const response = await res.json();
    if (response.status == "error") {
        throw new Error(response.message);
    }

    return true;
};

//UNUSED
const fetchSingleAddress = async (id: string): Promise<Address> => {
    const token = sessionService.getCookie('token');
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
        }
    };

    const res = await fetch(`${process.env.AWS_ENDPOINT}/addresses/${id}`, requestOptions)
        .catch(() => { throw new Error('Error on fetching addresses') });
    const addressReturn = await res.json();

    if (addressReturn.status == 'error')
        throw new Error(addressReturn.message);

    const address: Address = addressReturn.data;
    return address;
};

//UNUSED
const updateAddress = async (id: string, address: EditAddress): Promise<boolean> => {
    const token = sessionService.getCookie('token');
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
        },
        body: JSON.stringify(address),
    };

    const res = await fetch(`${process.env.AWS_ENDPOINT}/addresses/${id}`, requestOptions)
        .catch(() => { throw new Error('Error on creating an address') });
    const response = await res.json();

    if (response.status == 'error')
        throw new Error(response.message);

    return true;
};

export const AddressesService = {
    fetchAddresses,
    fetchSingleAddress,
    createNewAddress,
    deleteAddress,
    updateAddress,
};