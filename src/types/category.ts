export type Category = {
    id: string;
    name: string;
};

export type Categories = Category[];

export type EditCategory = Omit<Category, 'id' >;
