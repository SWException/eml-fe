export type Address = {
    id?: string;
    user: string;
    description: string;
    recipientName: string;
    recipientSurname: string;
    address: string;
    city: string,
    code: string,
    district: string;
}

export type Addresses = Address[]; 

export type InsertAddress = Omit<Address, 'id' >;
export type EditAddress = InsertAddress;