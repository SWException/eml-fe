export type Product = {
    id: string;
    name: string;
    description: string;
    photo?: string;
    secondary: string;
    categories: string;
    price: number;
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
    relatedProducts: Product[];
  }
  
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
  
  