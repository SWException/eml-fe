export type Tax = {
    id: string;
    value: number;
    description: string;
};

export type Taxes = Tax[];

export type InsertTax = Omit<Tax, 'id'>;
export type EditTax = InsertTax;