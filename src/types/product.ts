export type Product = {
    id: string;
    name: string;
    description: string;
    primaryPhoto: string;
    secondaryPhotos: string[];
    categoryId: string;
    category: string;
    price: number;
    netPrice: number;
    taxId: string;
    tax: number;
    show: boolean;
    showHome: boolean;
    stock: number;
};

export type Products = Product[];

export type InsertProduct = Omit<Product, 'tax' | 'id' | 'categoryId' | 'price' | 'taxId'> & { tax: string };
export type EditProduct = InsertProduct;

export type ProductsData = {
    products: Products;
    total: number;
}

export type ProductData = {
    product: Product;
}

export type ProductCart = {
    productId: string;
    name: string;
    primaryPhoto: string;
    price: number;
    quantity: number;
}

export type ProductAdmin = {
    productId: string;
    name: string;
    price: number;
    tax: number;
    categories: string[];
}
