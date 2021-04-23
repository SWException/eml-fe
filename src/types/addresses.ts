export interface Address {
    id?: string;
    description: string;
    recipientName: string;
    recipientSurname: string;
    address: string;
    city: string,
    code: string,
    district: string;
}

export interface Addresses {
    addresses: Address[]
}