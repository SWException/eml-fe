export type Product = {
    id?: string;
    name: string;
    description: string;
    primaryPhoto?: string;
    secondaryPhotos?: string[];
    categoryId?: string;
    category: string;
    price?: number;
    netPrice: number;
    taxId?: string;
    tax: number;
    show: boolean;
    showHome: boolean;
    stock: number;
};

export type Products = Product[];
 
export interface ProductsData {
    products: Product[];
    total: number;
}

export interface ProductData {
    product: Product;
}

export interface ProductCart {
    productId: string;
    name: string;
    primaryPhoto: string;
    price: number;
    quantity: number;
}


export interface ProductAdmin{
    productId: string;
    name: string;
    price: number;
    tax: number;
    categories: string[];
}

  
/*
export interface AddProduct {
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
}
  
export interface AddProductData {
    product: Product;
} 

*/
  
  