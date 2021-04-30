export interface Customer {
    id?: string;
    name: string;
    surname: string;
    email: string;
}

export interface Customers {
    customers: Customer[];
}